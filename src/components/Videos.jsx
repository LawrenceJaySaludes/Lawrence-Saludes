import { useRef, useState, useEffect, useCallback } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import travelPug from "../assets/travelpug.jpg";
import waterLemon from "../assets/waterlemon.jpg";
import etcLogo from "../assets/etc.jpg";
import businessBoss from "../assets/businessboss.jpg";
import landOfTomorrow from "../assets/lot.jpg";
import keithHothe from "../assets/keith hothe$.jpg";
import kaiPhoto from "../assets/kai.png";

const DEFAULT_CHANNELS = [
  {
    id: "channel-1",
    img: travelPug,
    name: "Travel Pug",
    link: "https://youtube.com/@thetravelpug?si=faCyVSJq9gSJCOlt",
    videos: [
      "yaLGxNYG0Vw",
      "ilkho_sbzB0",
      "JzWn8Q2MGrs",
      "QF0XtHc2cNE",
      "ZHTkyEMsI1E",
      "NBmRgY5uT0E",
      "F3Lv1E54S2I",
      "GgaX-BuFE4E",
    ],
  },
  {
    id: "channel-2",
    img: waterLemon,
    name: "Water Lemon",
    link: "https://youtube.com/@waterlemon385?si=YU-z7pMXb_GNrGJl",
    videos: [
      "uW00lirAzYE",
      "S18rwgXgMXo",
      "hCSsXzkHtH4",
      "3NZREsdzZv4",
      "AS6cx4sFWig",
      "0KgQe0RkJjY",
      "f5FNEOuJ1x8",
      "sNeA_t4tDRA",
    ],
  },
  {
    id: "channel-3",
    img: etcLogo,
    name: "Elite Trade Club",
    link: "https://youtube.com/@elitetradeclub?si=KAcSrmi4nC6bZWRb",
    videos: [
      "XRMyOUGtp7w",
      "5LthR1yhJZk",
      "MMe6u7gmv5Y",
      "sUZEULQyod8",
      "Lky9MVpr2TQ",
      "2phHZcbadsk",
    ],
  },
  {
    id: "channel-4",
    img: businessBoss,
    name: "Business Boss",
    link: "https://youtube.com/@businessboss3156?si=aTOL8JlRQBD97pHG",
    videos: [
      "PENSiHquies",
      "QN5ge3URDZg",
      "qZVN7dt4L7w",
      "FtTDEnMhvXU",
      "gerqxl9ksSI",
      "H_vFLPkw1YU",
    ],
  },
  {
    id: "channel-5",
    img: landOfTomorrow,
    name: "Land of Tomorrow",
    link: "https://youtube.com/@landoftomorrow?si=RtU5bgPy3F_Me7PE",
    videos: [
      "EmnypsWnEHI",
      "lytbqNoQxLE",
      "RRnfs9GT2Ko",
      "ZoFJ8xwZwsA",
    ],
  },
  {
    id: "channel-6",
    img: keithHothe,
    name: "Keith Hothe$",
    link: "https://www.youtube.com/@KeithHothes/shorts",
    videos: [],
  },
];

function Videos({
  customVideos = [],
  channels = DEFAULT_CHANNELS,
  title = "Video Editing Portfolio",
  lead = "Motion graphics, short-form edits, and branded YouTube content shaped to feel clear, engaging, and polished on screen.",
  introCopy = "With 2 years of professional video editing experience under Vast Professionals, I contributed to multiple YouTube channels by producing motion graphics, visual effects, and engaging video content using Adobe Premiere Pro, After Effects, and Canva.",
  noteCopy = "Browse with arrows or swipe, then click a card to preview published edits.",
}) {
  useScrollReveal();
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const videoChannels = Array.isArray(channels) && channels.length > 0 ? channels : DEFAULT_CHANNELS;

  useEffect(() => {
    if (selectedChannel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedChannel]);

  const checkScrollPosition = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const scrollLeft = carousel.scrollLeft;
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;

    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollPosition();

    const handleResize = () => {
      checkScrollPosition();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [checkScrollPosition]);

  const scrollCarousel = useCallback(
    (direction) => {
      const carousel = carouselRef.current;
      if (!carousel) return;
      const firstCard = carousel.querySelector(".channel-card--carousel");
      const cardWidth = firstCard?.offsetWidth ?? carousel.clientWidth * 0.82;
      const styles = window.getComputedStyle(carousel);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "16");
      const scrollAmount = cardWidth + (Number.isNaN(gap) ? 16 : gap);

      carousel.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    },
    []
  );

  const handleChannelClick = useCallback((channel, event) => {
    event.preventDefault();
    if (channel.videos && channel.videos.length > 0) {
      setSelectedChannel(channel);
    } else {
      window.open(channel.link, "_blank");
    }
  }, []);

  const closeModal = useCallback(() => {
    setSelectedChannel(null);
  }, []);

  return (
    <section id="videos" className="videos-section">
      <h2 className="section-title scroll-animate fade-up">
        {title}
      </h2>
      <p className="section-lead scroll-animate fade-up delay-1">
        {lead}
      </p>

      <div className="container">
        <div className="videos-showcase scroll-animate fade-up delay-2">
          <div className="videos-intro">
            <span className="videos-intro-kicker">Channel Showcase</span>
            <p className="videos-intro-copy">
              {introCopy}
            </p>
            <p className="videos-intro-note">
              {noteCopy}
            </p>
          </div>

          <div className="channel-cards-container">
            <div className="channel-carousel-wrapper">
              <button
                className={`channel-carousel-arrow channel-carousel-arrow-left ${showLeftArrow ? "visible" : ""}`}
                onClick={() => scrollCarousel("left")}
                aria-label="Scroll left"
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
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div
                ref={carouselRef}
                className="channel-carousel-track"
                onScroll={checkScrollPosition}
              >
                {videoChannels.map((channel, index) => (
                  <div
                    key={channel.id}
                    className={`card project-card channel-card channel-card--carousel scroll-animate fade-up channel-delay-${(index % 4) + 1}`}
                    onClick={(event) => handleChannelClick(channel, event)}
                    onDragStart={(event) => event.preventDefault()}
                    style={{ cursor: "pointer" }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleChannelClick(channel, event);
                      }
                    }}
                  >
                    <div className="channel-thumb-wrap">
                      <img
                        src={channel.img}
                        alt={channel.name}
                        className="channel-thumb"
                        draggable={false}
                      />
                      {channel.videos.length === 0 && (
                        <span className="channel-card-badge">YouTube shorts</span>
                      )}
                    </div>

                    <div className="channel-card-body">
                      <h3 className="channel-name">{channel.name}</h3>
                      <p className="channel-card-meta">
                        {channel.videos.length > 0
                          ? "Preview sample edits from this channel"
                          : "Open this channel directly on YouTube"}
                      </p>
                    </div>

                    <span className="channel-card-action">
                      {channel.videos.length > 0 ? "Preview channel" : "Open channel"}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`channel-carousel-arrow channel-carousel-arrow-right ${showRightArrow ? "visible" : ""}`}
                onClick={() => scrollCarousel("right")}
                aria-label="Scroll right"
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
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {selectedChannel && (
          <div className="modal-overlay video-modal-overlay">
            <div className="modal video-modal">
              <button
                className="modal-close-btn"
                onClick={closeModal}
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
              <div className="video-modal-head">
                <span className="video-modal-kicker">Channel Preview</span>
                <h3 className="modal-title">{selectedChannel.name}</h3>
                <p className="video-modal-subtitle">
                  Sample edits from this channel.
                </p>
              </div>

              <div className="video-grid">
                {selectedChannel.videos.map((videoId, index) => (
                  <div key={index} className="video-item">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Video ${index + 1} from ${selectedChannel.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
              <div className="modal-channel-link">
                <p className="modal-channel-note">
                  Explore the full channel for more edited videos.
                </p>
                <a
                  href={selectedChannel.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-solid"
                >
                  Visit YouTube Channel
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {customVideos.length > 0 && (
          <>
            <h3 className="videos-subtitle scroll-animate fade-up delay-1">
              Added Videos
            </h3>

            <div className="channel-grid">
              {customVideos.map((video, index) => (
                <a
                  key={video.id}
                  href={video.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`card project-card channel-card scroll-animate fade-up channel-delay-${(index % 4) + 1}`}
                >
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="channel-thumb"
                    />
                  ) : (
                    <div className="channel-thumb custom-video-placeholder">
                      Watch Video
                    </div>
                  )}

                  <h3 className="channel-name">{video.title}</h3>

                  {video.description && (
                    <p className="project-add-note">{video.description}</p>
                  )}
                </a>
              ))}
            </div>
          </>
        )}

        <div className="featured-video-wrap scroll-animate fade-up delay-2">
          <div className="featured-video-head">
            <span className="featured-video-kicker">Featured Sample</span>
            <h3 className="featured-video-title">Featured Video Editing Sample</h3>
            <p className="featured-video-copy">
              A short compilation highlighting my editing style, transitions, pacing, and motion graphics work.
            </p>
          </div>

          <div className="featured-video-frame">
            <div className="featured-video-embed">
              <video
                className="featured-video-player"
                controls
                preload="metadata"
                playsInline
                poster="/port-thumb.png"
              >
                <source src="/Edit-Sample.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="video-reference">
            <span className="video-reference-label">Professional Reference</span>
            <div className="video-reference-body">
              <img
                src={kaiPhoto}
                alt="Kyla Don"
                className="video-reference-photo"
                loading="lazy"
              />
              <div className="video-reference-content">
                <p className="video-reference-name">Kyla Don</p>
                <p className="video-reference-text">CEO of Vast Professionals</p>
                <blockquote className="video-reference-quote">
                  "Over the past 2 years, I've seen Lawrence grow significantly
                  as a video editor, consistently improving his creativity,
                  technical skills, and attention to detail. His dedication to
                  learning and refining his craft shows in the quality of his
                  work, and I'm confident he has strong potential to excel even
                  further in this field."
                </blockquote>
                <p className="video-reference-links">
                  <a
                    href="https://vastprofessionals.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    vastprofessionals.com
                  </a>
                  {/* <span>0968 753 8883</span> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Videos;
