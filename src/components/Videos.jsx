import travelPug from "../assets/travelpug.jpg";
import waterLemon from "../assets/waterlemon.jpg";
import etcLogo from "../assets/etc.jpg";
import businessBoss from "../assets/businessboss.jpg";

function Videos() {
  return (
    <section id="videos" className="reveal">
      <h2 className="section-title">Video Editing Portfolio</h2>

      <div className="container">
        <p
          style={{
            textAlign: "center",
            maxWidth: "720px",
            margin: "0 auto 2.5rem",
          }}
        >
          1 year of professional video editing experience under
          <strong> Vast Professional</strong>. I worked on multiple YouTube
          channels, creating motion animations, visual effects, and engaging
          content using <strong>Premiere Pro</strong>,{" "}
          <strong>After Effects</strong>, and <strong>Canva</strong>.
        </p>

        {/* CHANNEL GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          <a
            href="https://youtube.com/@thetravelpug?si=faCyVSJq9gSJCOlt"
            target="_blank"
            className="card project-card"
            style={{ textAlign: "center" }}
          >
            <img src={travelPug} alt="Travel Pug" />
            <h3>Travel Pug</h3>
          </a>

          <a
            href="https://youtube.com/@waterlemon385?si=YU-z7pMXb_GNrGJl"
            target="_blank"
            className="card project-card"
            style={{ textAlign: "center" }}
          >
            <img src={waterLemon} alt="Water Lemon" />
            <h3>Water Lemon</h3>
          </a>

          <a
            href="https://youtube.com/@elitetradeclub?si=KAcSrmi4nC6bZWRb"
            target="_blank"
            className="card project-card"
            style={{ textAlign: "center" }}
          >
            <img src={etcLogo} alt="Elite Trade Club" />
            <h3>Elite Trade Club</h3>
          </a>

          <a
            href="https://youtube.com/@businessboss3156?si=aTOL8JlRQBD97pHG"
            target="_blank"
            className="card project-card"
            style={{ textAlign: "center" }}
          >
            <img src={businessBoss} alt="Business Boss" />
            <h3>Business Boss</h3>
          </a>
        </div>

        {/* REFERENCE SECTION */}
{/* PROFESSIONAL REFERENCE */}
<p
  style={{
    marginTop: "2.5rem",
    textAlign: "center",
    opacity: 0.85,
    lineHeight: "1.7",
  }}
>
  <strong>Professional Reference:</strong> Kyla Don — CEO, Vast Professionals
  <br />
  🌐{" "}
  <a
    href="https://vastprofessionals.com"
    target="_blank"
    className="link"
  >
    vastprofessionals.com
  </a>{" "}
  · 📱 0968 753 8883
</p>

      </div>
    </section>
  );
}

export default Videos;
