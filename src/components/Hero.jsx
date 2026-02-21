import { useEffect, useState } from "react";
import profilePic from "../assets/lawr-test.png";

function Hero() {
  const fullName = "Lawrence Jay A. Saludes";
  const [typedName, setTypedName] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    let index = 0;

    const typeName = setInterval(() => {
      setTypedName(fullName.slice(0, index + 1));
      index += 1;

      if (index === fullName.length) {
        clearInterval(typeName);

        setTimeout(() => setShowAddress(true), 300);
        setTimeout(() => setShowRole(true), 600);
        setTimeout(() => setShowButtons(true), 900);
        setTimeout(() => setShowImage(true), 1200);
      }
    }, 80);

    return () => clearInterval(typeName);
  }, []);

  return (
    <section id="home" className="hero reveal">
      <div className="container hero-layout">
        <div className="hero-content">
          <h1 className="hero-name">{typedName}</h1>

          {showAddress && (
            <div className="hero-meta hero-left show">
              <div className="hero-detail-pill">
                <span className="hero-detail-label">Address</span>
                <span className="hero-detail-value">Davao City, Philippines</span>
              </div>
              <div className="hero-detail-pill">
                <span className="hero-detail-label">Birthday</span>
                <span className="hero-detail-value">January 29, 2004</span>
              </div>
            </div>
          )}

          {showRole && (
            <p className="hero-right show hero-role">
              Junior Web Developer | React.js | Video Editor
            </p>
          )}

          {showButtons && (
            <div className="hero-buttons hero-fade show">
              <a href="#projects" className="btn-solid hero-cta-btn">
                System Projects
              </a>
              <a href="#videos" className="btn-solid hero-cta-btn">
                Video Portfolio
              </a>
            </div>
          )}
        </div>

        {showImage && (
          <img
            src={profilePic}
            alt="Lawrence Jay A. Saludes"
            className="hero-image show"
          />
        )}
      </div>
    </section>
  );
}

export default Hero;
