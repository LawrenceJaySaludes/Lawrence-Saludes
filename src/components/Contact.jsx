import useScrollReveal from "../hooks/useScrollReveal";

function Contact({ contacts }) {
  useScrollReveal();

  const email = contacts?.email || "";
  const phone = contacts?.phone || "";
  const location = contacts?.location || "";

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-card modern scroll-animate fade-up">
          <div className="contact-kicker scroll-animate fade-up delay-1">
            Available for Work
          </div>

          <h2 className="section-title contact-title scroll-animate fade-up delay-1">
            Let&apos;s Work Together
          </h2>

          <p className="contact-text scroll-animate fade-up delay-2">
            Open for <strong>remote</strong>, <strong>onsite</strong>, and{" "}
            <strong>freelance</strong> opportunities.
          </p>

          <div className="contact-info scroll-animate fade-up delay-3">
            <p className="contact-item">
              <span className="contact-item-label">Email</span>
              <strong>{email}</strong>
            </p>
            <p className="contact-item">
              <span className="contact-item-label">Phone</span>
              <strong>{phone}</strong>
            </p>
            <p className="contact-item">
              <span className="contact-item-label">Location</span>
              <strong>{location}</strong>
            </p>
          </div>

          <div className="resume-actions scroll-animate fade-up delay-4">
            <a
              href="/Lawrence-Saludes-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline contact-resume-btn"
            >
              View Resume
            </a>

            <a
              href="/Lawrence-Saludes-Resume.pdf"
              download
              className="btn-solid contact-resume-btn"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
