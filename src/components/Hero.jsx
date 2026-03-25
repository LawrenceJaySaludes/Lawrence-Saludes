import { useEffect, useState } from "react";
import profilePic from "../assets/lawr-test.png";

function TypingName({ text }) {
  const safeText = text || "";
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (!safeText.length) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setVisibleChars((previous) => {
        if (previous >= safeText.length) {
          window.clearInterval(intervalId);
          return previous;
        }

        return previous + 1;
      });
    }, 68);

    return () => window.clearInterval(intervalId);
  }, [safeText]);

  const typedValue = safeText.slice(0, visibleChars);

  return <h1 className="hero-name">{typedValue}</h1>;
}

function Hero({ profile }) {
  const fullName = profile?.fullName || "Lawrence Jay A. Saludes";
  const address = profile?.address || "Davao City, Philippines";
  const birthday = profile?.birthday || "January 29, 2004";
  const details =
    profile?.details || "Junior Web Developer | React.js | Video Editor";

  return (
    <section id="home" className="hero reveal">
      <div className="container hero-layout">
        <div className="hero-content">
          <TypingName key={fullName} text={fullName} />

          <div className="hero-meta hero-left show">
            <div className="hero-detail-pill">
              <span className="hero-detail-label">Address</span>
              <span className="hero-detail-value">{address}</span>
            </div>
            <div className="hero-detail-pill">
              <span className="hero-detail-label">Birthday</span>
              <span className="hero-detail-value">{birthday}</span>
            </div>
          </div>

          <p className="hero-right show hero-role">{details}</p>

          <div className="hero-buttons hero-fade show">
            <a href="#projects" className="btn-solid hero-cta-btn">
              System Projects
            </a>
            <a href="#videos" className="btn-solid hero-cta-btn">
              Video Portfolio
            </a>
          </div>
        </div>

        <img
          src={profilePic}
          alt="Lawrence Jay A. Saludes"
          className="hero-image show"
        />
      </div>
    </section>
  );
}

export default Hero;
