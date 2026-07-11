import "./globals.css";

export const metadata = {
  title: {
    default:
      "Letto TV | Official Gaming Hub",

    template: "%s | Letto TV",
  },

  description:
    "The official home of Letto TV. Live streams, gaming clips, squad chaos, and The Locker Room.",

  keywords: [
    "Letto TV",
    "LettoTV",
    "gaming streamer",
    "Kick streamer",
    "gaming creator",
    "Get Burnt",
  ],

  openGraph: {
    title:
      "Letto TV | Official Gaming Hub",

    description:
      "Streams, clips, squad chaos, and whatever game comes next.",

    type: "website",

    images: [
      {
        url: "/images/lettotv-pfp.png",
      },
    ],
  },

  icons: {
    icon: "/images/lettotv-pfp.png",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}