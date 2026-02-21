import { useState } from "react";
import cert1 from "../assets/cert1.jpg";
import cert2 from "../assets/cert2.png";
import cert3 from "../assets/cert3.jpg";
import useScrollReveal from "../hooks/useScrollReveal";

function Certificates() {
  useScrollReveal();

  const certificates = [cert1, cert3, cert2];
  const [activeIndex, setActiveIndex] = useState(1);

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? certificates.length - 1 : prev - 1
    );
  };

  const next = () => {
    setActiveIndex((prev) =>
      prev === certificates.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="certificates">
      <h2 className="section-title scroll-animate fade-up">
        Certificates
      </h2>

      <div className="container cert-carousel scroll-animate fade-up delay-1">
        <button className="cert-arrow left" onClick={prev}>‹</button>

        <div className="cert-track">
          {certificates.map((cert, index) => {
            let position = "side";

            if (index === activeIndex) position = "active";
            else if (
              index === (activeIndex - 1 + certificates.length) % certificates.length
            ) position = "left";
            else if (
              index === (activeIndex + 1) % certificates.length
            ) position = "right";

            return (
              <img
                key={index}
                src={cert}
                alt="Certificate"
                className={`cert-img ${position}`}
              />
            );
          })}
        </div>

        <button className="cert-arrow right" onClick={next}>›</button>
      </div>
    </section>
  );
}

export default Certificates;
