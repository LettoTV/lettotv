import siteConfig from "../data/siteConfig";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="about-section section-shell"
    >
      <div className="about-panel">
        <div className="about-art">
          <img
            src="/images/lettotv-pfp.png"
            alt="Letto TV"
          />
        </div>

        <div className="about-copy">
          <span className="kicker">
            WHO IS LETTO?
          </span>

          <h2>
            COMPETITIVE WHEN IT MATTERS.
            <br />

            UNHINGED WHEN IT DOESN'T.
          </h2>

          <p>
            {siteConfig.creator.about}
          </p>

          <div className="about-tags">
            <span>LIVE</span>

            <span>CLIPS</span>

            <span>COMMUNITY</span>

            <span>CHAOS</span>
          </div>
        </div>
      </div>
    </section>
  );
}