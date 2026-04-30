import { useEffect, useState } from "react";
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
    },
    {
      label: "Phone",
      value: phone,
    },
    {
      label: "Location",
      value: location,
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
              return (
                <button
                  type="button"
                  key={item.label}
                  className={`contact-item${
                    item.label.toLowerCase() === "email" ? " contact-item--email" : ""
                  }`}
                  onClick={() => {
                    void handleCopyDetails(item.label, item.value);
                  }}
                  aria-label={`Copy ${item.label}: ${item.value}`}
                >
                  <span className="contact-item-label">{item.label}</span>
                  <strong className="contact-item-value">{item.value}</strong>
                </button>
              );
            })}
          </div>
          {copyFeedback && <p className="contact-copy-feedback">{copyFeedback}</p>}

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
