import siteConfig from "../data/siteConfig";

export default function Header() {
  return (
    <header className="site-header">
      <a
        href="#top"
        className="brand"
        aria-label="Letto TV homepage"
      >
        <span className="brand-mark">
          {siteConfig.brand.shortName}
        </span>

        <span className="brand-name">
          LETTO <b>TV</b>
        </span>
      </a>

      <nav className="desktop-nav">
        <a href="#live">Live</a>

        <a href="#socials">Socials</a>

        <a href="#about">About</a>
      </nav>

      <a
        href={siteConfig.links.discord}
        target="_blank"
        rel="noopener noreferrer"
        className="header-cta"
      >
        JOIN THE LOCKER ROOM
      </a>
    </header>
  );
}