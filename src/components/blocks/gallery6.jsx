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

function Gallery6({ items = [] }) {
  const [carouselApi, setCarouselApi] = useState(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(null);

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
    </section>
  );
}

export default Gallery6;
