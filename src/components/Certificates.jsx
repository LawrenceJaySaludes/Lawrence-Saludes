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

  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleCertificates = certificates.length > 1;
  const safeActiveIndex = activeIndex % certificates.length;

  const prev = () => {
    if (!hasMultipleCertificates) {
      return;
    }

    setActiveIndex((prevIndex) => {
      const normalizedIndex = prevIndex % certificates.length;
      return normalizedIndex === 0
        ? certificates.length - 1
        : normalizedIndex - 1;
    });
  };

  const next = () => {
    if (!hasMultipleCertificates) {
      return;
    }

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
        <div className="cert-carousel" aria-label="Certificate navigation">
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

          <div className="cert-controls" role="group" aria-label="Certificate controls">
            <button
              className="cert-arrow cert-arrow-left"
              onClick={prev}
              aria-label="Previous certificate"
              disabled={!hasMultipleCertificates}
            >
              <span className="cert-arrow-icon" aria-hidden="true">
                <svg viewBox="0 0 14 14" focusable="false" aria-hidden="true">
                  <path d="M9.5 2.5L4.5 7l5 4.5" />
                </svg>
              </span>
            </button>

            <div
              className="cert-count"
              aria-label="Certificate progress"
              aria-live="polite"
              aria-atomic="true"
            >
              <strong>{String(safeActiveIndex + 1).padStart(2, "0")}</strong>
              <span>/ {String(certificates.length).padStart(2, "0")}</span>
            </div>

            <button
              className="cert-arrow cert-arrow-right"
              onClick={next}
              aria-label="Next certificate"
              disabled={!hasMultipleCertificates}
            >
              <span className="cert-arrow-icon" aria-hidden="true">
                <svg viewBox="0 0 14 14" focusable="false" aria-hidden="true">
                  <path d="M4.5 2.5L9.5 7l-5 4.5" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;
