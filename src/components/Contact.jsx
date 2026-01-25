function Contact() {
  return (
    <section className="reveal">
      <div className="container">
        <div className="contact-card modern">
          <h2 className="section-title">Let’s Work Together</h2>

          <p className="contact-text">
            Open for <strong>remote</strong>, <strong>onsite</strong>, and
            <strong> freelance</strong> opportunities.
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "grid",
              gap: "1rem",
              textAlign: "center",
              fontSize: "1.05rem",
            }}
          >
            <p>📧 <strong>lawrencesaludes00@gmail.com</strong></p>
            <p>📱 <strong>0939 694 2357</strong></p>
            <p>📍 Davao City, Philippines</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
