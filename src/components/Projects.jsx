function Projects() {
  return (
    <section id="projects" className="reveal">
      {/* SECTION TITLE */}
      <h2 className="section-title">Website & Desktop Projects</h2>

      <div className="container">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* PICKN'EAT */}
          <div className="card project-card">
            <span className="project-tag">Website</span>

            <h3>PickN’Eat</h3>

            <p style={{ margin: "1rem 0" }}>
              Food decision web application with authentication and full CRUD
              functionality.
            </p>

            <small>React.js · Supabase · Vercel</small>

            <div className="project-actions">
              <a
                href="https://pickneat-azure.vercel.app"
                target="_blank"
                className="btn-outline"
              >
                Live Demo
              </a>

              <a
                href="https://github.com/LawrenceJaySaludes/pickneat"
                target="_blank"
                className="btn-solid"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* MOOD TRACKER SHIELLA */}
          <div className="card project-card">
            <span className="project-tag">Website</span>

            <h3>Mood Tracker Shiella</h3>

            <p style={{ margin: "1rem 0" }}>
              A mood tracking web application that allows users to log emotions
              and reflections with database persistence.
            </p>

            <small>React.js · Supabase · Vercel</small>

            <div className="project-actions">
              <a
                href="https://mood-tracker-shiella.vercel.app"
                target="_blank"
                className="btn-outline"
              >
                Live Demo
              </a>

              <a
                href="https://github.com/LawrenceJaySaludes/mood-tracker-shiella"
                target="_blank"
                className="btn-solid"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* SAFESHORE (AQUACHECK) – CAPSTONE */}
          <div className="card project-card">
            <span className="project-tag">Website</span>

            <h3>SafeShore (AquaCheck)</h3>

            <p style={{ margin: "1rem 0" }}>
              Capstone IoT-based water quality monitoring system that displays
              real-time sensor data through a web dashboard.
            </p>

            <small>React.js · IoT Sensors · Supabase · Vercel</small>

            <div className="project-actions">
              <a
                href="https://aquachecklive.vercel.app"
                target="_blank"
                className="btn-outline"
              >
                Live Demo
              </a>

              <a
                href="https://github.com/Pelyn9/aquacheck.git"
                target="_blank"
                className="btn-solid"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* CLINICAL APPOINTMENT SYSTEM */}
          <div className="card project-card">
            <span className="project-tag desktop">Desktop App</span>

            <h3>Clinical Appointment System</h3>

            <p style={{ margin: "1rem 0" }}>
              Desktop-based clinical appointment management system with patient
              records and scheduling.
            </p>

            <small>C# WinForms · SQL Server · Visual Studio</small>

            <div className="project-actions">
              <a
                href="https://github.com/LawrenceJaySaludes/clinical-appointment.git"
                target="_blank"
                className="btn-solid"
              >
                GitHub Repository
              </a>
            </div>
          </div>

          {/* BILLING RECEIPT FOR PICKN'EAT */}
          <div className="card project-card">
            <span className="project-tag desktop">Desktop App</span>

            <h3>Billing Receipt for PickN’Eat</h3>

            <p style={{ margin: "1rem 0" }}>
              Desktop billing and receipt generation system built for PickN’Eat
              with database-driven transaction records.
            </p>

            <small>C# WinForms · SQL Server · Visual Studio</small>

            <div className="project-actions">
              <a
                href="https://github.com/LawrenceJaySaludes/Billing-Receipt-for-Pick-N-Eat.git"
                target="_blank"
                className="btn-solid"
              >
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
