import { useEffect, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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

async function copyTextToClipboard(text) {
  if (!text) {
    return false;
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy copy method.
    }
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, text.length);
    const didCopy = document.execCommand("copy");
    document.body.removeChild(textArea);
    return didCopy;
  } catch {
    return false;
  }
}

function Contact({ contacts, cv }) {
  useScrollReveal();
  const [copyFeedback, setCopyFeedback] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

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
      copyable: true,
    },
    {
      label: "Phone",
      value: phone,
      copyable: true,
    },
    {
      label: "Location",
      value: location,
      copyable: false,
    },
  ].filter((item) => item.value);

  useEffect(() => {
    if (!copyFeedback) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopyFeedback("");
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [copyFeedback]);

  const handleCopyDetails = async (label, value) => {
    const didCopy = await copyTextToClipboard(value);
    setCopyFeedback(
      didCopy
        ? `${label} copied to clipboard.`
        : `Unable to copy ${label.toLowerCase()}.`
    );
  };

  useEffect(() => {
  if (cooldown <= 0) return;

  const timer = setInterval(() => {
    setCooldown((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [cooldown]);

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

 const sendEmail = async (event) => {
  event.preventDefault();

  if (isSending || cooldown > 0) return;

  const form = event.currentTarget;

  setIsSending(true);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const mainTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;

  const formData = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value,
  };

  try {
    await Promise.all([
      emailjs.sendForm(serviceId, mainTemplateId, form, publicKey),
      emailjs.send(serviceId, autoReplyTemplateId, formData, publicKey),
    ]);

    await Swal.fire({
      title: "Message sent!",
      text: "Thanks for reaching out. I will get back to you soon.",
      icon: "success",
      confirmButtonColor: "#2916F5",
    });

    form.reset();

    // 🔥 10 second anti-spam cooldown
    setCooldown(10);
  } catch (error) {
    console.error("EmailJS Error:", error);

    await Swal.fire({
      title: "Message failed",
      text: "Please check your connection and try again.",
      icon: "error",
      confirmButtonColor: "#ef4444",
    });
  } finally {
    setIsSending(false);
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

          <div className="contact-content">
            <div className="contact-details scroll-animate fade-up delay-3">
              <div className="contact-panel">
                <h3 className="contact-panel-title">Contact Details</h3>
                <p className="contact-panel-copy">Tap an item to copy it quickly.</p>

                <div className="contact-info">
                  {contactItems.map((item) => {
                    const isCopyable = item.copyable !== false;
                    return (
                      <button
                        type="button"
                        key={item.label}
                        className={`contact-item${
                          item.label.toLowerCase() === "email"
                            ? " contact-item--email"
                            : ""
                        }${!isCopyable ? " not-copyable" : ""}`}
                        onClick={() => {
                          if (isCopyable) {
                            void handleCopyDetails(item.label, item.value);
                          }
                        }}
                        aria-label={isCopyable ? `Copy ${item.label}: ${item.value}` : `${item.label}: ${item.value}`}
                        disabled={!isCopyable}
                      >
                        <span className="contact-item-label">{item.label}</span>
                        <strong className="contact-item-value">{item.value}</strong>
                      </button>
                    );
                  })}
                </div>

                {copyFeedback && (
                  <p className="contact-copy-feedback">{copyFeedback}</p>
                )}
              </div>

              <div className="contact-panel">
                <h3 className="contact-panel-title">Curriculum Vitae</h3>
                <p className="contact-panel-copy">
                  View online or download an offline copy.
                </p>

                <div className="resume-actions">
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

            <div className="contact-form-shell scroll-animate fade-up delay-4">
              <div className="contact-form-head">
                <p className="contact-form-kicker">Send Me a Message</p>
                <h3 className="contact-form-title">Let&apos;s Build Something Great</h3>
                <p className="contact-form-copy">
                  Share your idea, project, or collaboration details.
                </p>
              </div>

              <form
                className="contact-form"
                aria-label="Contact message form"
                aria-busy={isSending}
                onSubmit={sendEmail}
              >
                <div className="contact-form-row">
                  <label className="contact-form-field" htmlFor="contact-name">
                    <span className="contact-field-label">Name</span>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className="contact-form-input"
                      required
                    />
                  </label>

                  <label className="contact-form-field" htmlFor="contact-email">
                    <span className="contact-field-label">Email</span>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@email.com"
                      className="contact-form-input"
                      required
                    />
                  </label>
                </div>

                <label className="contact-form-field" htmlFor="contact-subject">
                  <span className="contact-field-label">Subject</span>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Project inquiry"
                    className="contact-form-input"
                  />
                </label>

                <label className="contact-form-field" htmlFor="contact-message">
                  <span className="contact-field-label">Message</span>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Write your message here..."
                    className="contact-form-textarea"
                    required
                  />
                </label>

                <button
  type="submit"
  className="contact-submit-btn"
  disabled={isSending || cooldown > 0}
>
  {isSending ? (
    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span className="spinner" />
      Sending...
    </span>
  ) : cooldown > 0 ? (
    `Wait ${cooldown}s`
  ) : (
    "Send Message"
  )}
</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
