import {
  SiKick,
  SiTwitch,
  SiYoutube,
  SiInstagram,
  SiTiktok,
  SiDiscord,
} from "react-icons/si";

import siteConfig from "../data/siteConfig";

const socialIcons = {
  Kick: SiKick,

  Twitch: SiTwitch,

  YouTube: SiYoutube,

  Instagram: SiInstagram,

  TikTok: SiTiktok,

  "The Locker Room": SiDiscord,
};

export default function SocialSection() {
  return (
    <section
      id="socials"
      className="social-section section-shell"
    >
      <div className="split-heading">
        <div>
          <span className="kicker">
            SOCIALS
          </span>

          <h2>
            FIND LETTO TV
            <br />

            EVERYWHERE.
          </h2>
        </div>

        <p>
          Same brand. Different kind of chaos.
        </p>
      </div>

      <div className="social-grid">
        {siteConfig.socials.map(
          (social) => {
            const Icon =
              socialIcons[
                social.name
              ];

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-card ${social.className}`}
              >
                <span className="social-icon">
                  {Icon && <Icon />}
                </span>

                <div>
                  <strong>
                    {social.name}
                  </strong>

                  <small>
                    {social.handle}
                  </small>
                </div>

                <span className="social-arrow">
                  ↗
                </span>
              </a>
            );
          }
        )}
      </div>
    </section>
  );
}