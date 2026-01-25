import profilePic from "../assets/lawr-prof.jpg";

function Hero() {
  return (
    <section className="hero reveal">
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        {/* PROFILE IMAGE */}
       <img
  src={profilePic}
  alt="Lawrence Jay A. Saludes"
  style={{
    width: "190px",   // was 160
    height: "190px",  // was 160
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 25px 50px rgba(0,0,0,0.18)",
  }}
/>


        {/* TEXT CONTENT */}
        <div>
          <h1>Lawrence Jay A. Saludes</h1>

          {/* DETAILS BELOW NAME */}
          <p
            style={{
              marginTop: "0.5rem",
              opacity: "0.8",
              fontSize: "0.95rem",
            }}
          >
            📍 Davao City, Philippines · 🎂 January 29, 2004
          </p>

          <p style={{ marginTop: "0.8rem" }}>
            Junior Web Developer · React.js · Video Editor
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn-solid">
              Web Projects
            </a>

            <a href="#videos" className="btn-solid">
              Video Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
