import useScrollReveal from "../hooks/useScrollReveal";

function Contact({ contacts }) {
  useScrollReveal();

  const email = contacts?.email || "";
  const phone = contacts?.phone || "";
  const location = contacts?.location || "";
  const contactItems = [
    {
      label: "Email",
      value: email,
      href: email ? `mailto:${email}` : "",
    },
    {
      label: "Phone",
      value: phone,
      href: phone ? `tel:${phone.replace(/\s+/g, "")}` : "",
    },
    {
      label: "Location",
      value: location,
      href: location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
        : "",
      external: true,
    },
  ].filter((item) => item.value);

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-card modern scroll-animate fade-up">
          <div className="contact-header">
            <div className="contact-kicker scroll-animate fade-up delay-1">
              Available for Work
            </div>

            <h2 className="section-title contact-title scroll-animate fade-up delay-1">
              Let&apos;s Work Together
            </h2>

            <p className="contact-text scroll-animate fade-up delay-2">
              Open for <strong>remote</strong>, <strong>onsite</strong>, and{" "}
              <strong>freelance</strong> opportunities across web development,
              systems work, and creative production.
            </p>
          </div>

          <div className="contact-info scroll-animate fade-up delay-3">
            {contactItems.map((item) => {
              const Tag = item.href ? "a" : "div";

              return (
                <Tag
                  key={item.label}
                  className="contact-item"
                  href={item.href || undefined}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                >
                  <span className="contact-item-label">{item.label}</span>
                  <strong className="contact-item-value">{item.value}</strong>
                </Tag>
              );
            })}
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
