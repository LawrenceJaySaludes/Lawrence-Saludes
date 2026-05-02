import { useRef, useState } from "react";
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
  },
  {
    id: "channel-2",
    img: waterLemon,
    name: "Water Lemon",
    link: "https://youtube.com/@waterlemon385?si=YU-z7pMXb_GNrGJl",
  },
  {
    id: "channel-3",
    img: etcLogo,
    name: "Elite Trade Club",
    link: "https://youtube.com/@elitetradeclub?si=KAcSrmi4nC6bZWRb",
  },
  {
    id: "channel-4",
    img: businessBoss,
    name: "Business Boss",
    link: "https://youtube.com/@businessboss3156?si=aTOL8JlRQBD97pHG",
  },
  {
    id: "channel-5",
    img: landOfTomorrow,
    name: "Land of Tomorrow",
    link: "https://youtube.com/@landoftomorrow?si=RtU5bgPy3F_Me7PE",
  },
  {
    id: "channel-6",
    img: keithHothe,
    name: "Keith Hothe$",
    link: "https://www.youtube.com/@KeithHothes/shorts",
  },
];

function Videos({ customVideos = [] }) {
  useScrollReveal();
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const scrollLeft = carousel.scrollLeft;
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const scrollAmount = carousel.clientWidth * 0.8;
    carousel.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="videos" className="videos-section">
      <h2 className="section-title scroll-animate fade-up">
        Video Editing Portfolio
      </h2>
      <p className="section-lead scroll-animate fade-up delay-1">
        Motion graphics, short-form edits, and branded YouTube content shaped to
        feel clear, engaging, and polished on screen.
      </p>

      <div className="container">
        <div className="videos-intro scroll-animate fade-up delay-2">
          <p className="videos-intro-copy">
          With <strong>2 year of professional video editing experience</strong>{" "}
          under <strong>Vast Professional</strong>, I contributed to multiple
          YouTube channels by producing motion graphics, visual effects, and
          engaging video content using <strong>Adobe Premiere Pro</strong>,{" "}
          <strong>After Effects</strong>, and <strong>Canva</strong>.
          </p>
          <p className="videos-intro-note">
            Visit the following channels to view published samples of my editing
            work.
          </p>
        </div>

        <div className="channel-carousel-wrapper">
          <button
            className={`channel-carousel-arrow channel-carousel-arrow-left ${showLeftArrow ? 'visible' : ''}`}
            onClick={() => scrollCarousel('left')}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div
            ref={carouselRef}
            className="channel-grid"
            onScroll={checkScrollPosition}
          >
            {DEFAULT_CHANNELS.map((channel, index) => (
              <a
                key={channel.id}
                href={channel.link}
                target="_blank"
                rel="noreferrer"
                className={`card project-card channel-card scroll-animate fade-up channel-delay-${(index % 4) + 1}`}
              >
                <img src={channel.img} alt={channel.name} className="channel-thumb" />
                <h3 className="channel-name">{channel.name}</h3>
              </a>
            ))}
          </div>

          <button
            className={`channel-carousel-arrow channel-carousel-arrow-right ${showRightArrow ? 'visible' : ''}`}
            onClick={() => scrollCarousel('right')}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

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
                  <span>0968 753 8883</span>
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
