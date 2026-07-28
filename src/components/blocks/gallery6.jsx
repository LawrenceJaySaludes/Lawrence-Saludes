import { useEffect, useMemo, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

function ArrowUpRight({ className = "gallery6-arrow" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PreviewIcon({ className = "gallery6-preview-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function InfoIcon({ className = "gallery6-info-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

function GitHubIcon({ className = "gallery6-repo-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function Gallery6({ items = [] }) {
  const [carouselApi, setCarouselApi] = useState(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(null);
  const [infoTooltip, setInfoTooltip] = useState(null);

  useEffect(() => {
    if (!carouselApi) return undefined;

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setActiveIndex(carouselApi.getActiveIndex?.() ?? 0);
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (previewImages.length > 0 || selectedPreviewIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [previewImages, selectedPreviewIndex]);

  useEffect(() => {
    if (selectedPreviewIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedPreviewIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPreviewIndex]);

  const scrollToItem = (index) => {
    if (!carouselApi) return;
    carouselApi.scrollToIndex?.(index);
  };

  const visibleItems = useMemo(() => {
    const total = items.length;
    const maxVisible = Math.min(5, total);
    if (total <= maxVisible) {
      return items.map((item, index) => ({ item, index }));
    }

    const start = Math.max(0, Math.min(activeIndex - 2, total - maxVisible));
    return items.slice(start, start + maxVisible).map((item, offset) => ({
      item,
      index: start + offset,
    }));
  }, [activeIndex, items]);

  const closePreview = () => {
    setPreviewImages([]);
    setSelectedPreviewIndex(null);
  };

  const openProject = (url) => {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const showInfoTooltip = (event, text) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setInfoTooltip({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const hideInfoTooltip = () => setInfoTooltip(null);

  return (
    <section className="gallery6-section">
      <div className="gallery6-shell">
        <div className="gallery6-carousel-wrap">
          <Carousel
            setApi={setCarouselApi}
            className="gallery6-carousel"
            opts={{
              breakpoints: {
                "(max-width: 768px)": {
                  dragFree: true,
                },
              },
            }}
          >
            <CarouselContent className="gallery6-track">
              {items.map((item, index) => {
                const isActive = index === activeIndex;
                const hasPreview =
                  Array.isArray(item.previewImages) && item.previewImages.length > 0;
                const actionLabel = item.linkLabel || "View Live";
                const cardUrl = item.cardUrl || item.url;
                const actionUrl = item.actionUrl || item.url;

                return (
                  <CarouselItem key={item.id} className="gallery6-item">
                    <article
                      className={`gallery6-card${isActive ? " gallery6-card--active" : ""}`}
                      onClick={() => openProject(cardUrl)}
                      onMouseEnter={() => {
                        setActiveIndex(index);
                      }}
                      onFocus={() => {
                        setActiveIndex(index);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openProject(cardUrl);
                        }
                      }}
                    >
                      <div className="gallery6-card-container">
                        <div className="gallery6-image-wrap">
                          <div className="gallery6-image-inner">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="gallery6-image"
                            />
                          </div>
                        </div>

                        <div className="gallery6-title">{item.title}</div>
                        <div className="gallery6-summary">{item.summary}</div>
                        {item.stack && (
                          <div className="gallery6-stack">
                            <span className="gallery6-stack-label">Stack</span>
                            <span className="gallery6-stack-value">{item.stack}</span>
                          </div>
                        )}

                        <div className="gallery6-action-row">
                          <a
                            href={actionUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="gallery6-action-link"
                            onClick={(event) => event.stopPropagation()}
                          >
                            {actionLabel}
                            <ArrowUpRight className="gallery6-readmore-icon" />
                          </a>

                          {item.repoLink && (
                            <a
                              href={item.repoLink}
                              target="_blank"
                              rel="noreferrer"
                              className="gallery6-repo-link"
                              onClick={(event) => event.stopPropagation()}
                              aria-label="View source code"
                            >
                              <GitHubIcon className="gallery6-repo-icon" />
                            </a>
                          )}

                          {hasPreview && (
                            <button
                              type="button"
                              className="gallery6-preview-btn"
                              onClick={(event) => {
                                event.stopPropagation();
                                setPreviewImages(item.previewImages);
                                setSelectedPreviewIndex(null);
                              }}
                            >
                              Preview
                              <PreviewIcon className="gallery6-preview-icon" />
                            </button>
                          )}

                          {item.infoTooltip && (
                            <button
                              type="button"
                              className="gallery6-info-btn"
                              onMouseEnter={(event) => showInfoTooltip(event, item.infoTooltip)}
                              onMouseLeave={hideInfoTooltip}
                              onFocus={(event) => showInfoTooltip(event, item.infoTooltip)}
                              onBlur={hideInfoTooltip}
                              onClick={(event) => event.stopPropagation()}
                              aria-label="Project information"
                            >
                              <InfoIcon className="gallery6-info-icon" />
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="gallery6-pagination-wrap">
          <Pagination className="gallery6-pagination">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  disabled={!canScrollPrev}
                  onClick={(event) => {
                    event.preventDefault();
                    carouselApi?.scrollPrev();
                  }}
                />
              </PaginationItem>

              {visibleItems.map(({ item, index }) => (
                <PaginationItem key={item.id}>
                  <PaginationLink
                    href="#"
                    isActive={activeIndex === index}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToItem(index);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  disabled={!canScrollNext}
                  onClick={(event) => {
                    event.preventDefault();
                    carouselApi?.scrollNext();
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {previewImages.length > 0 && (
        <div className="modal-overlay">
          <div
            className="modal project-preview-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={closePreview}
              aria-label="Close modal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
            <h3>Project Preview</h3>
            <div className="modal-grid project-preview-grid">
              {previewImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className="project-sample-trigger"
                  onClick={() => setSelectedPreviewIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Project preview ${index + 1}`}
                    className="project-sample"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedPreviewIndex !== null && previewImages[selectedPreviewIndex] && (
        <div
          className="modal-overlay project-preview-fullscreen-overlay"
          onClick={() => setSelectedPreviewIndex(null)}
        >
          <div
            className="project-preview-fullscreen"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedPreviewIndex(null)}
              aria-label="Close full screen preview"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
            <img
              src={previewImages[selectedPreviewIndex]}
              alt={`Project preview ${selectedPreviewIndex + 1}`}
              className="project-preview-fullscreen-image"
            />
          </div>
        </div>
      )}

      {infoTooltip && (
        <div
          className="gallery6-info-tooltip"
          style={{
            position: "fixed",
            left: infoTooltip.x,
            top: infoTooltip.y - 8,
            transform: "translate(-50%, -100%)",
          }}
        >
          {infoTooltip.text}
        </div>
      )}
    </section>
  );
}

export default Gallery6;
