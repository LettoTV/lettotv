import siteConfig from "../data/siteConfig";

export default function Hero() {
  return (
    <section
      id="top"
      className="hero section-shell"
    >
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="pulse-dot" />

          OFFICIAL LETTO TV HUB
        </div>

        <h1>
          NO ONE GAME.

          <br />

          <span>
            JUST THE NEXT MOMENT.
          </span>
        </h1>

        <p className="hero-lede">
          {siteConfig.creator.description}
        </p>

        <div className="hero-actions">
          <a
            href="#live"
            className="btn btn-fire"
          >
            SEE STREAM STATUS

            <span>↓</span>
          </a>

          <a
            href="#socials"
            className="btn btn-ghost"
          >
            FIND ME EVERYWHERE
          </a>
        </div>

        <div className="handle-strip">
          <span>
            CURRENT IN-GAME TAG
          </span>

          <strong>
            {siteConfig.brand.currentGamertag}
          </strong>

          <small>
            The game and tag can change.
            The brand stays Letto TV.
          </small>
        </div>
      </div>

      <div className="hero-visual">
        <div className="pfp-halo halo-one" />

        <div className="pfp-halo halo-two" />

        <div className="pfp-frame">
          <img
            src="/images/lettotv-pfp.png"
            alt="Letto TV"
          />
        </div>

        <div className="creator-chip">
          <span className="status-dot live-dot" />

          STREAMER / GAMING CREATOR
        </div>

        <div className="corner-tag">
          LETTO.TV
        </div>
      </div>
    </section>
  );
}