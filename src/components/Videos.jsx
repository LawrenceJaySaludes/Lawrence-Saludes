import useScrollReveal from "../hooks/useScrollReveal";
import travelPug from "../assets/travelpug.jpg";
import waterLemon from "../assets/waterlemon.jpg";
import etcLogo from "../assets/etc.jpg";
import businessBoss from "../assets/businessboss.jpg";
import ytLogo from "../assets/yt-logo.png";

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
];

function Videos({ customVideos = [] }) {
  useScrollReveal();

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
          With <strong>1 year of professional video editing experience</strong>{" "}
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

        <div className="channel-grid">
          {DEFAULT_CHANNELS.map((channel, index) => (
            <a
              key={channel.id}
              href={channel.link}
              target="_blank"
              rel="noreferrer"
              className={`card project-card channel-card scroll-animate fade-up channel-delay-${index + 1}`}
            >
              <div className="channel-badge-row">
                <img src={ytLogo} alt="YouTube" className="channel-badge" />
              </div>

              <img src={channel.img} alt={channel.name} className="channel-thumb" />
              <h3 className="channel-name">{channel.name}</h3>
            </a>
          ))}
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
              A short compilation highlighting my editing style, transitions,
              pacing, and motion graphics work.
            </p>
          </div>

          <div className="featured-video-frame">
            <div className="featured-video-embed">
              <video
                className="featured-video-player"
                controls
                preload="metadata"
                playsInline
              >
                <source src="/Edit-Sample.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="video-reference">
            <span className="video-reference-label">Professional Reference</span>
            <p className="video-reference-text">
              Kyla Don, CEO of Vast Professionals
            </p>
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
    </section>
  );
}

export default Videos;
