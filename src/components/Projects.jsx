import { useState } from "react";

/* CLINICAL SCREENSHOTS */
import clinical1 from "../assets/clinical-samp1.png";
import clinical2 from "../assets/clinical-samp2.png";
import clinical3 from "../assets/clinical-samp3.png";
import clinical4 from "../assets/clinical-samp4.png";

/* BILLING SCREENSHOTS */
import billing1 from "../assets/billing-samp1.png";
import billing2 from "../assets/billing-samp2.png";
import billing3 from "../assets/billing-samp3.png";
import billing4 from "../assets/billing-samp4.png";

function Projects() {
  const [openGallery, setOpenGallery] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

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

          {/* SAFESHORE (AQUACHECK) */}
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
              <button
                className="btn-outline"
                onClick={() =>
                  setOpenGallery([
                    clinical1,
                    clinical2,
                    clinical3,
                    clinical4,
                  ])
                }
              >
                View Screenshots
              </button>

              <a
                href="https://github.com/LawrenceJaySaludes/clinical-appointment.git"
                target="_blank"
                className="btn-solid"
              >
                GitHub Repository
              </a>
            </div>
          </div>

          {/* BILLING RECEIPT */}
          <div className="card project-card">
            <span className="project-tag desktop">Desktop App</span>

            <h3>Billing Receipt for PickN’Eat</h3>

            <p style={{ margin: "1rem 0" }}>
              Desktop billing and receipt generation system built for PickN’Eat
              with database-driven transaction records.
            </p>

            <small>C# WinForms · SQL Server · Visual Studio</small>

            <div className="project-actions">
              <button
                className="btn-outline"
                onClick={() =>
                  setOpenGallery([
                    billing1,
                    billing2,
                    billing3,
                    billing4,
                  ])
                }
              >
                View Screenshots
              </button>

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

      {/* GALLERY MODAL */}
{openGallery && (
  <div className="modal-overlay" onClick={() => setOpenGallery(null)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h3>Project Screenshots</h3>

      <div className="modal-grid">
        {openGallery.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="project screenshot"
            className="project-sample"
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div>

      <button
        className="btn-solid"
        onClick={() => setOpenGallery(null)}
      >
        Close
      </button>
    </div>
  </div>
)}

      {/* IMAGE PREVIEW */}
      {activeImage && (
        <div className="modal-overlay" onClick={() => setActiveImage(null)}>
          <img src={activeImage} className="image-preview" />
        </div>
      )}
    </section>
  );
}

export default Projects;
