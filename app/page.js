import Header from "./components/Header";
import Hero from "./components/Hero";
import LiveSection from "./components/LiveSection";
import SocialSection from "./components/SocialSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

function EmberBackground() {
  return (
    <div
      className="ember-field"
      aria-hidden="true"
    />
  );
}
export default function Home() {
  return (
    <>
      <EmberBackground />

      <Header />

      <main>
        <Hero />

        <div className="marquee">
          <div className="marquee-track">
            <span>LIVE STREAMS</span>
            <i>✦</i>

            <span>CLIPS</span>
            <i>✦</i>

            <span>CHAOS</span>
            <i>✦</i>

            <span>THE LOCKER ROOM</span>
            <i>✦</i>

            <span>GAMING</span>
            <i>✦</i>

            <span>LIVE STREAMS</span>
            <i>✦</i>

            <span>CLIPS</span>
            <i>✦</i>

            <span>CHAOS</span>
            <i>✦</i>

            <span>THE LOCKER ROOM</span>
            <i>✦</i>

            <span>GAMING</span>
            <i>✦</i>
          </div>
        </div>

        <LiveSection />

        <SocialSection />

        <AboutSection />
      </main>

      <Footer />
    </>
  );
}