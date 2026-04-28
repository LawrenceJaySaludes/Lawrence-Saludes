import useScrollReveal from "../hooks/useScrollReveal";

const DEFAULT_CV_URL = "/Lawrence-Saludes-Resume.pdf";
const DEFAULT_CV_FILE_NAME = "Lawrence-Saludes-CV.pdf";

function dataUrlToBlob(dataUrl) {
  const [metadata, payload] = dataUrl.split(",");
  const mimeMatch = metadata.match(/^data:([^;]+)/);
  const mimeType = mimeMatch ? mimeMatch[1] : "application/octet-stream";
  const byteString = window.atob(payload || "");
  const buffer = new Uint8Array(byteString.length);

  for (let index = 0; index < byteString.length; index += 1) {
    buffer[index] = byteString.charCodeAt(index);
  }

  return new Blob([buffer], { type: mimeType });
}

function openInNewTab(url) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function Contact({ contacts, cv }) {
  useScrollReveal();

  const email = typeof contacts?.email === "string" ? contacts.email : "";
  const phone = typeof contacts?.phone === "string" ? contacts.phone : "";
  const location =
    typeof contacts?.location === "string" ? contacts.location : "";
  const cvUrl =
    typeof cv?.url === "string" && cv.url.trim()
      ? cv.url.trim()
      : DEFAULT_CV_URL;
  const cvFileName =
    typeof cv?.fileName === "string" && cv.fileName.trim()
      ? cv.fileName.trim()
      : DEFAULT_CV_FILE_NAME;
  const isDataUrl = cvUrl.startsWith("data:");
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

  const handleViewCvClick = (event) => {
    event.preventDefault();

    if (!cvUrl) {
      return;
    }

    if (isDataUrl) {
      try {
        const cvBlob = dataUrlToBlob(cvUrl);
        const objectUrl = URL.createObjectURL(cvBlob);
        openInNewTab(objectUrl);
        window.setTimeout(() => {
          URL.revokeObjectURL(objectUrl);
        }, 60_000);
        return;
      } catch {
        // Fall through to direct open when conversion fails.
      }
    }

    try {
      const freshUrl = new URL(cvUrl, window.location.origin);
      freshUrl.searchParams.set("cvv", Date.now().toString());
      openInNewTab(freshUrl.toString());
    } catch {
      openInNewTab(cvUrl);
    }
  };

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
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline contact-resume-btn"
              onClick={handleViewCvClick}
            >
              View CV
            </a>

            <a
              href={cvUrl}
              download={cvFileName}
              className="btn-solid contact-resume-btn"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
