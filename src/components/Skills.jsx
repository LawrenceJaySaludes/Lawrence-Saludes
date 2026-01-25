function Skills() {
  return (
    <section className="reveal">
      <div className="container">
        <h2 className="section-title">Skills</h2>


        <div
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* WEB DEVELOPMENT */}
          <div className="card">
            <h3 style={{ marginBottom: "1rem" }}>Web Development</h3>
            <span className="skill">React.js</span>
            <span className="skill">JavaScript</span>
            <span className="skill">Supabase</span>
            <span className="skill">SQL</span>
          </div>

          {/* DESKTOP DEVELOPMENT */}
          <div className="card">
            <h3 style={{ marginBottom: "1rem" }}>Desktop Development</h3>
            <span className="skill">C# WinForms App</span>
            <span className="skill">SQL Database</span>
          </div>

          {/* VIDEO & CREATIVE */}
          <div className="card">
            <h3 style={{ marginBottom: "1rem" }}>Video & Creative</h3>
            <span className="skill">Adobe Premiere Pro</span>
            <span className="skill">After Effects</span>
            <span className="skill">Canva (Thumbnails)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
