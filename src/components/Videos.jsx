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
    <section id="videos">
      <h2 className="section-title scroll-animate fade-up">
        Video Editing Portfolio
      </h2>

      <div className="container">
        <p
          className="scroll-animate fade-up delay-1"
          style={{
            textAlign: "center",
            maxWidth: "760px",
            margin: "0 auto 1.8rem",
            lineHeight: "1.7",
          }}
        >
          With <strong>1 year of professional video editing experience</strong>{" "}
          under <strong>Vast Professional</strong>, I contributed to multiple
          YouTube channels by producing motion graphics, visual effects, and
          engaging video content using <strong>Adobe Premiere Pro</strong>,{" "}
          <strong>After Effects</strong>, and <strong>Canva</strong>.
        </p>

        <p
          className="scroll-animate fade-up delay-2"
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
            opacity: 0.85,
          }}
        >
          Visit the following YouTube channels to view published samples of my
          video editing work.
        </p>

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
            <h3
              className="scroll-animate fade-up delay-1"
              style={{ marginTop: "3rem", marginBottom: "1rem", textAlign: "center" }}
            >
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

        <div
          className="scroll-animate fade-up delay-2"
          style={{ marginTop: "4rem", textAlign: "center" }}
        >
          <h3 style={{ marginBottom: "0.8rem" }}>
            Featured Video Editing Sample
          </h3>

          <p style={{ opacity: 0.85, marginBottom: "1.5rem" }}>
            A short compilation highlighting my editing style, transitions, and
            motion graphics work.
          </p>

          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              maxWidth: "900px",
              margin: "0 auto",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/Mtp14xAnkGw"
              title="Video Editing Sample"
              frameBorder="0"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <p
            style={{
              marginTop: "3rem",
              textAlign: "center",
              opacity: 0.85,
              lineHeight: "1.7",
            }}
          >
            <strong>Professional Reference:</strong> Kyla Don - CEO, Vast
            Professionals
            <br />
            <a href="https://vastprofessionals.com" target="_blank" rel="noreferrer">
              vastprofessionals.com
            </a>{" "}
            | 0968 753 8883
          </p>
        </div>
      </div>
    </section>
  );
}

export default Videos;
