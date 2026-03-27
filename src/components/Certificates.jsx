import { useMemo, useState } from "react";
import cert1 from "../assets/cert1.jpg";
import cert2 from "../assets/cert2.png";
import cert3 from "../assets/cert3.jpg";
import useScrollReveal from "../hooks/useScrollReveal";

const DEFAULT_CERTIFICATES = [
  { id: "default-cert-1", title: "Certificate 1", image: cert1 },
  { id: "default-cert-2", title: "Certificate 2", image: cert3 },
  { id: "default-cert-3", title: "Certificate 3", image: cert2 },
];

function Certificates({ customCertificates = [] }) {
  useScrollReveal();

  const certificates = useMemo(
    () => [
      ...DEFAULT_CERTIFICATES,
      ...customCertificates
        .filter((certificate) => certificate?.imageUrl)
        .map((certificate) => ({
          id: certificate.id,
          title: certificate.title || "Certificate",
          image: certificate.imageUrl,
        })),
    ],
    [customCertificates]
  );

  const [activeIndex, setActiveIndex] = useState(1);
  const safeActiveIndex = activeIndex % certificates.length;
  const prev = () => {
    setActiveIndex((prevIndex) => {
      const normalizedIndex = prevIndex % certificates.length;
      return normalizedIndex === 0
        ? certificates.length - 1
        : normalizedIndex - 1;
    });
  };

  const next = () => {
    setActiveIndex(
      (prevIndex) => ((prevIndex % certificates.length) + 1) % certificates.length
    );
  };

  return (
    <section id="certificates" className="certificates-section">
      <h2 className="section-title scroll-animate fade-up">Certificates</h2>
      <p className="section-lead scroll-animate fade-up delay-1">
        A curated selection of certifications that reflect continuous learning,
        technical growth, and hands-on professional development.
      </p>

      <div className="container cert-showcase scroll-animate fade-up delay-2">
        <div className="cert-showcase-header">
          <div className="cert-controls" aria-label="Certificate navigation">
            <div className="cert-count">
              <strong>{String(safeActiveIndex + 1).padStart(2, "0")}</strong>
              <span>/ {String(certificates.length).padStart(2, "0")}</span>
            </div>

            <button className="cert-arrow left" onClick={prev} aria-label="Previous certificate">
              <span aria-hidden="true">&lt;</span>
            </button>

            <button className="cert-arrow right" onClick={next} aria-label="Next certificate">
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        </div>

        <div className="cert-carousel">
          <div className="cert-track">
            {certificates.map((certificate, index) => {
              let position = "side";

              if (index === safeActiveIndex) {
                position = "active";
              } else if (
                index ===
                (safeActiveIndex - 1 + certificates.length) % certificates.length
              ) {
                position = "left";
              } else if (
                index === (safeActiveIndex + 1) % certificates.length
              ) {
                position = "right";
              }

              return (
                <img
                  key={certificate.id || `${certificate.title}-${index}`}
                  src={certificate.image}
                  alt={certificate.title}
                  className={`cert-img ${position}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;
