function Contact() {
  return (
    <section className="reveal contact-section">
      <div className="container">
        <div className="contact-card modern">
          <h2 className="section-title">Let’s Work Together</h2>

          <p className="contact-text">
            Open for <strong>remote</strong>, <strong>onsite</strong>, and{" "}
            <strong>freelance</strong> opportunities.
          </p>

          {/* CONTACT INFO */}
          <div className="contact-info">
            <p>📧 <strong>lawrencesaludes00@gmail.com</strong></p>
            <p>📱 <strong>0939 694 2357</strong></p>
            <p>📍 Davao City, Philippines</p>
          </div>

          {/* RESUME ACTIONS */}
          <div className="resume-actions">
            <a
              href="/Lawrence-Saludes-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              View Resume
            </a>

            <a
              href="/Lawrence-Saludes-Resume.pdf"
              download
              className="btn-solid"
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
