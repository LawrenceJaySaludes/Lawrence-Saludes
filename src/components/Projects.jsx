import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

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

const DEFAULT_PROJECTS = [
  {
    id: "default-project-1",
    category: "Website",
    title: "PickN'Eat",
    description:
      "Food decision web application with authentication and full CRUD functionality.",
    stack: "React.js | Supabase | Vercel",
    liveLink: "https://pickneat-azure.vercel.app",
    repoLink: "https://github.com/LawrenceJaySaludes/pickneat",
  },
  {
    id: "default-project-2",
    category: "Website",
    title: "Mood Tracker Shiella",
    description:
      "A mood tracking web application that allows users to log emotions and reflections with database persistence.",
    stack: "React.js | Supabase | Vercel",
    liveLink: "https://mood-tracker-shiella.vercel.app",
    repoLink: "https://github.com/LawrenceJaySaludes/mood-tracker-shiella",
  },
  {
    id: "default-project-3",
    category: "Website",
    title: "SafeShore (AquaCheck)",
    description:
      "Capstone IoT-based water quality monitoring system that displays real-time sensor data through a web dashboard.",
    stack: "React.js | IoT Sensors | Supabase | Vercel",
    liveLink: "https://aquachecklive.vercel.app",
    repoLink: "https://github.com/Pelyn9/aquacheck.git",
  },
  {
    id: "default-project-4",
    category: "Desktop App",
    title: "Clinical Appointment System",
    description:
      "Desktop-based clinical appointment management system with patient records and scheduling.",
    stack: "C# WinForms | SQL Server | Visual Studio",
    repoLink:
      "https://github.com/LawrenceJaySaludes/clinical-appointment.git",
    repoLabel: "GitHub Repository",
    screenshots: [clinical1, clinical2, clinical3, clinical4],
  },
  {
    id: "default-project-5",
    category: "Desktop App",
    title: "Billing Receipt for PickN'Eat",
    description:
      "Desktop billing and receipt generation system built for PickN'Eat with database-driven transaction records.",
    stack: "C# WinForms | SQL Server | Visual Studio",
    repoLink:
      "https://github.com/LawrenceJaySaludes/Billing-Receipt-for-Pick-N-Eat.git",
    repoLabel: "GitHub Repository",
    screenshots: [billing1, billing2, billing3, billing4],
  },
];

function Projects({ customProjects = [] }) {
  useScrollReveal();

  const [openGallery, setOpenGallery] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const projects = [...DEFAULT_PROJECTS, ...customProjects];

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title scroll-animate fade-up">
        Website & Desktop Projects
      </h2>
      <p className="section-lead scroll-animate fade-up delay-1">
        A selection of web and desktop builds focused on usable interfaces,
        solid system logic, and practical real-world workflows.
      </p>

      <div className="container">
        <div className="grid projects-grid">
          {projects.map((project, index) => {
            const delayClass = `delay-${(index % 4) + 1}`;
            const isDesktop = project.category
              ?.toLowerCase()
              .includes("desktop");
            const cardToneClassName = isDesktop
              ? "project-card--desktop"
              : "project-card--web";

            return (
              <article
                key={project.id || `${project.title}-${index}`}
                className={`card project-card ${cardToneClassName} scroll-animate fade-up ${delayClass}`}
              >
                <div className="project-card-top">
                  <span className={`project-tag${isDesktop ? " desktop" : ""}`}>
                    {project.category || "Website"}
                  </span>
                  <span className="project-card-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="project-card-body">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-description">{project.description}</p>
                </div>

                <div className="project-stack-block">
                  <span className="project-stack-label">Stack</span>
                  <small className="project-stack-value">{project.stack}</small>
                </div>

                <div className="project-actions">
                  {Array.isArray(project.screenshots) &&
                    project.screenshots.length > 0 && (
                      <button
                        className="btn-outline project-link-btn"
                        onClick={() => setOpenGallery(project.screenshots)}
                      >
                        View Screenshots
                      </button>
                    )}

                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline project-link-btn"
                    >
                      {project.liveLabel || "Live Demo"}
                    </a>
                  )}

                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-solid project-link-btn"
                    >
                      {project.repoLabel || "GitHub"}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {openGallery && (
        <div className="modal-overlay" onClick={() => setOpenGallery(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <h3>Project Screenshots</h3>

            <div className="modal-grid">
              {openGallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="project screenshot"
                  className="project-sample"
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>

            <button className="btn-solid" onClick={() => setOpenGallery(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {activeImage && (
        <div className="modal-overlay" onClick={() => setActiveImage(null)}>
          <img src={activeImage} className="image-preview" alt="preview" />
        </div>
      )}
    </section>
  );
}

export default Projects;
