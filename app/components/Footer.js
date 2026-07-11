import siteConfig from "../data/siteConfig";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="brand-mark">
          LT
        </span>

        <span>LETTO TV</span>
      </div>

      <p>
        THE OFFICIAL LETTO TV HUB
      </p>

      <div className="footer-links">
        <a
          href={siteConfig.kick.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          KICK
        </a>

        <a
          href={siteConfig.links.discord}
          target="_blank"
          rel="noopener noreferrer"
        >
          DISCORD
        </a>

        <a
          href={siteConfig.links.support}
          target="_blank"
          rel="noopener noreferrer"
        >
          SUPPORT
        </a>
      </div>
    </footer>
  );
}