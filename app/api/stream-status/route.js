import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const KICK_TOKEN_URL = "https://id.kick.com/oauth/token";

const KICK_CHANNEL_URL =
  "https://api.kick.com/public/v1/channels";

async function getKickAppToken() {
  const clientId = process.env.KICK_CLIENT_ID;
  const clientSecret = process.env.KICK_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Kick API credentials have not been configured."
    );
  }

  const body = new URLSearchParams();

  body.set("grant_type", "client_credentials");
  body.set("client_id", clientId);
  body.set("client_secret", clientSecret);

  const response = await fetch(KICK_TOKEN_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body,

    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "Kick token request failed:",
      response.status,
      errorText
    );

    throw new Error("Could not authenticate with Kick.");
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error(
      "Kick did not return an access token."
    );
  }

  return data.access_token;
}

async function getKickChannel(token) {
  const slug =
    process.env.KICK_CHANNEL_SLUG || "lettotv";

  const url = new URL(KICK_CHANNEL_URL);

  url.searchParams.append("slug", slug);

  const response = await fetch(url, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },

    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      "Kick channel request failed:",
      response.status,
      errorText
    );

    throw new Error(
      "Could not retrieve the Kick channel."
    );
  }

  const result = await response.json();

  const channel = result?.data?.[0];

  if (!channel) {
    throw new Error(
      `Kick channel "${slug}" was not found.`
    );
  }

  return channel;
}

export async function GET() {
  try {
    const token = await getKickAppToken();

    const channel = await getKickChannel(token);

    const stream = channel.stream;

    const isLive = Boolean(stream?.is_live);

    return NextResponse.json(
      {
        success: true,

        isLive,

        channel: {
          slug: channel.slug,

          description:
            channel.channel_description || "",

          title:
            channel.stream_title || "",
        },

        stream: isLive
          ? {
              title:
                channel.stream_title || "Letto TV Live",

              category:
                channel.category?.name || "Gaming",

              viewers:
                stream?.viewer_count || 0,

              thumbnail:
                stream?.thumbnail || null,

              startedAt:
                stream?.start_time || null,
            }
          : null,

        checkedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error(
      "Kick status API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        isLive: false,

        stream: null,

        error:
          "Live status is currently unavailable.",

        checkedAt: new Date().toISOString(),
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  }
}