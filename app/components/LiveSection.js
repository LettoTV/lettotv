"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  SiKick,
  SiTwitch,
} from "react-icons/si";

const REFRESH_INTERVAL = 60_000;

export default function LiveSection() {
  const [status, setStatus] = useState({
    loading: true,
    anyLive: false,
    livePlatforms: [],
    platforms: {
      kick: {
        isLive: false,
      },

      twitch: {
        isLive: false,
      },
    },
    error: null,
  });

  const checkStatus = useCallback(async () => {
    try {
      const response = await fetch(
        "/api/stream-status",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Stream status request failed."
        );
      }

      const data = await response.json();

      setStatus({
        loading: false,
        anyLive: Boolean(data.anyLive),
        livePlatforms:
          data.livePlatforms || [],
        platforms: data.platforms || {
          kick: {
            isLive: false,
          },

          twitch: {
            isLive: false,
          },
        },
        error: null,
      });
    } catch (error) {
      console.error(
        "Could not load stream status:",
        error
      );

      setStatus((currentStatus) => ({
        ...currentStatus,
        loading: false,
        error:
          "Stream status is temporarily unavailable.",
      }));
    }
  }, []);

  useEffect(() => {
    checkStatus();

    const interval = window.setInterval(
      checkStatus,
      REFRESH_INTERVAL
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [checkStatus]);

  const kick = status.platforms?.kick || {
    isLive: false,
    url: "https://kick.com/lettotv",
  };

  const twitch =
    status.platforms?.twitch || {
      isLive: false,
      url: "https://www.twitch.tv/iettotv",
    };

  /*
    Pick the live stream to feature.

    Kick is currently prioritized if both
    Kick and Twitch are live.
  */

  const featuredStream = useMemo(() => {
    if (kick.isLive) {
      return {
        ...kick,
        platform: "kick",
      };
    }

    if (twitch.isLive) {
      return {
        ...twitch,
        platform: "twitch",
      };
    }

    return null;
  }, [kick, twitch]);

  const isLoading = status.loading;

  const isLive = Boolean(featuredStream);

  return (
    <section
      id="live"
      className="stream-hub-section"
    >
      <div className="section-shell">
        <div className="stream-hub-heading">
          <span className="kicker">
            STREAM STATUS
          </span>

          <h2>
            CATCH LETTO
            <br />

            <span>LIVE.</span>
          </h2>

          <p>
            Watch the stream directly from
            whichever platform you prefer.
          </p>
        </div>

        <div className="stream-feature">
          <div
            className={`stream-thumbnail-card ${
              isLive ? "is-live" : "is-offline"
            }`}
          >
            {isLoading ? (
              <div className="stream-loading-state">
                <span className="stream-loading-ring" />

                <strong>
                  CHECKING STREAM STATUS
                </strong>

                <small>
                  Looking for an active stream...
                </small>
              </div>
            ) : isLive ? (
              <>
                <img
                  src={featuredStream.thumbnail}
                  alt="Current Letto TV live stream"
                  className="stream-thumbnail-image"
                />

                <div className="stream-thumbnail-gradient" />

                <div className="stream-live-badge">
                  <span />

                  LIVE
                </div>

                <div className="stream-platform-badge">
                  {featuredStream.platform ===
                  "kick" ? (
                    <SiKick />
                  ) : (
                    <SiTwitch />
                  )}

                  {featuredStream.platform.toUpperCase()}
                </div>

                <div className="stream-thumbnail-info">
                  <span className="stream-category">
                    {featuredStream.category ||
                      "Gaming"}
                  </span>

                  <h3>
                    {featuredStream.title ||
                      "Letto TV Live"}
                  </h3>

                  <div className="stream-viewers">
                    <span className="viewer-dot" />

                    {Number(
                      featuredStream.viewers || 0
                    ).toLocaleString()}{" "}
                    watching
                  </div>
                </div>
              </>
            ) : (
              <div className="stream-offline-state">
                <div className="offline-signal">
                  <span />
                  <span />
                  <span />
                </div>

                <span className="offline-label">
                  CURRENTLY OFFLINE
                </span>

                <h3>
                  NO ACTIVE STREAM
                </h3>

                <p>
                  Letto is off the air right now.
                  Check back when the chaos starts.
                </p>
              </div>
            )}
          </div>

          <div className="stream-watch-buttons">
            <a
              href={
                kick.url ||
                "https://kick.com/lettotv"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="watch-platform-button watch-kick"
            >
              <span className="watch-platform-icon">
                <SiKick />
              </span>

              <span className="watch-platform-copy">
                <small>
                  {kick.isLive
                    ? "LIVE NOW"
                    : "STREAM CHANNEL"}
                </small>

                <strong>
                  WATCH ON KICK
                </strong>
              </span>

              {kick.isLive && (
                <span className="platform-live-dot" />
              )}

              <span className="watch-arrow">
                ↗
              </span>
            </a>

            <a
              href={
                twitch.url ||
                "https://www.twitch.tv/iettotv"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="watch-platform-button watch-twitch"
            >
              <span className="watch-platform-icon">
                <SiTwitch />
              </span>

              <span className="watch-platform-copy">
                <small>
                  {twitch.isLive
                    ? "LIVE NOW"
                    : "STREAM CHANNEL"}
                </small>

                <strong>
                  WATCH ON TWITCH
                </strong>
              </span>

              {twitch.isLive && (
                <span className="platform-live-dot" />
              )}

              <span className="watch-arrow">
                ↗
              </span>
            </a>
          </div>

          {status.error && (
            <p className="stream-status-error">
              {status.error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}