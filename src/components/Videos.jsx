import travelPug from "../assets/travelpug.jpg";
import waterLemon from "../assets/waterlemon.jpg";
import etcLogo from "../assets/etc.jpg";
import businessBoss from "../assets/businessboss.jpg";
import ytLogo from "../assets/yt-logo.png";

function Videos() {
  return (
    <section id="videos" className="reveal">
      <h2 className="section-title">Video Editing Portfolio</h2>

      <div className="container">
        <p
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
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
            opacity: 0.85,
          }}
        >
          Visit the following YouTube channels to view published samples of my
          video editing work.
        </p>

        {/* CHANNEL GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            {
              img: travelPug,
              name: "Travel Pug",
              link: "https://youtube.com/@thetravelpug?si=faCyVSJq9gSJCOlt",
            },
            {
              img: waterLemon,
              name: "Water Lemon",
              link: "https://youtube.com/@waterlemon385?si=YU-z7pMXb_GNrGJl",
            },
            {
              img: etcLogo,
              name: "Elite Trade Club",
              link: "https://youtube.com/@elitetradeclub?si=KAcSrmi4nC6bZWRb",
            },
            {
              img: businessBoss,
              name: "Business Boss",
              link: "https://youtube.com/@businessboss3156?si=aTOL8JlRQBD97pHG",
            },
          ].map((channel, index) => (
            <a
              key={index}
              href={channel.link}
              target="_blank"
              className="card project-card"
              style={{ textAlign: "center", position: "relative" }}
            >
              <img
                src={ytLogo}
                alt="YouTube"
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "28px",
                }}
              />

              <img
                src={channel.img}
                alt={channel.name}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: "0.75rem",
                }}
              />
              <h3>{channel.name}</h3>
            </a>
          ))}
        </div>

        {/* SAMPLE VIDEO */}
        <div style={{ marginTop: "4rem", textAlign: "center" }}>
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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
        </div>

        {/* PROFESSIONAL REFERENCE */}
        <p
          style={{
            marginTop: "3rem",
            textAlign: "center",
            opacity: 0.85,
            lineHeight: "1.7",
          }}
        >
          <strong>Professional Reference:</strong> Kyla Don — CEO, Vast
          Professionals
          <br />
          🌐{" "}
          <a href="https://vastprofessionals.com" target="_blank">
            vastprofessionals.com
          </a>{" "}
          · 📱 0968 753 8883
        </p>
      </div>
    </section>
  );
}

export default Videos;
