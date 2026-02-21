import { useEffect, useState } from "react";
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

const STORAGE_KEY = "portfolio-added-projects";
const ADMIN_PASSWORD = "admin.lawrence.secret";

const INITIAL_FORM = {
  title: "",
  category: "Website",
  description: "",
  stack: "",
  liveLink: "",
  repoLink: "",
};

function loadSavedProjects() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function Projects() {
  useScrollReveal();

  const [openGallery, setOpenGallery] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [addedProjects, setAddedProjects] = useState(loadSavedProjects);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(addedProjects));
    }
  }, [addedProjects]);

  const openPasswordModal = () => {
    setShowPasswordModal(true);
    setAdminPasswordInput("");
    setPasswordError("");
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setAdminPasswordInput("");
    setPasswordError("");
  };

  const closeAddProjectModal = () => {
    setShowAddProjectModal(false);
    setFormError("");
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (adminPasswordInput.trim() === ADMIN_PASSWORD) {
      setShowPasswordModal(false);
      setShowAddProjectModal(true);
      setAdminPasswordInput("");
      setPasswordError("");
      return;
    }

    setPasswordError("Incorrect admin password.");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.stack.trim()
    ) {
      setFormError("Please fill in title, description, and stack.");
      return;
    }

    if (!formData.liveLink.trim() && !formData.repoLink.trim()) {
      setFormError("Add at least one link (Live Demo or GitHub).");
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      category: formData.category.trim() || "Website",
      description: formData.description.trim(),
      stack: formData.stack.trim(),
      liveLink: formData.liveLink.trim(),
      repoLink: formData.repoLink.trim(),
    };

    setAddedProjects((prev) => [newProject, ...prev]);
    setFormData(INITIAL_FORM);
    setFormError("");
    setShowAddProjectModal(false);
  };

  const handleRemoveProject = (projectId) => {
    setAddedProjects((prev) =>
      prev.filter((project) => project.id !== projectId)
    );
  };

  return (
    <section id="projects">
      <h2 className="section-title scroll-animate fade-up">
        Website & Desktop Projects
      </h2>

      <div className="container">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          <div className="card project-card scroll-animate fade-up delay-1">
            <span className="project-tag">Website</span>
            <h3>PickN'Eat</h3>
            <p style={{ margin: "1rem 0" }}>
              Food decision web application with authentication and full CRUD
              functionality.
            </p>
            <small>React.js | Supabase | Vercel</small>

            <div className="project-actions">
              <a
                href="https://pickneat-azure.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Live Demo
              </a>

              <a
                href="https://github.com/LawrenceJaySaludes/pickneat"
                target="_blank"
                rel="noreferrer"
                className="btn-solid"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="card project-card scroll-animate fade-up delay-2">
            <span className="project-tag">Website</span>
            <h3>Mood Tracker Shiella</h3>
            <p style={{ margin: "1rem 0" }}>
              A mood tracking web application that allows users to log emotions
              and reflections with database persistence.
            </p>
            <small>React.js | Supabase | Vercel</small>

            <div className="project-actions">
              <a
                href="https://mood-tracker-shiella.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Live Demo
              </a>

              <a
                href="https://github.com/LawrenceJaySaludes/mood-tracker-shiella"
                target="_blank"
                rel="noreferrer"
                className="btn-solid"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="card project-card scroll-animate fade-up delay-3">
            <span className="project-tag">Website</span>
            <h3>SafeShore (AquaCheck)</h3>
            <p style={{ margin: "1rem 0" }}>
              Capstone IoT-based water quality monitoring system that displays
              real-time sensor data through a web dashboard.
            </p>
            <small>React.js | IoT Sensors | Supabase | Vercel</small>

            <div className="project-actions">
              <a
                href="https://aquachecklive.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Live Demo
              </a>

              <a
                href="https://github.com/Pelyn9/aquacheck.git"
                target="_blank"
                rel="noreferrer"
                className="btn-solid"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="card project-card scroll-animate fade-up delay-4">
            <span className="project-tag desktop">Desktop App</span>
            <h3>Clinical Appointment System</h3>
            <p style={{ margin: "1rem 0" }}>
              Desktop-based clinical appointment management system with patient
              records and scheduling.
            </p>
            <small>C# WinForms | SQL Server | Visual Studio</small>

            <div className="project-actions">
              <button
                className="btn-outline"
                onClick={() =>
                  setOpenGallery([clinical1, clinical2, clinical3, clinical4])
                }
              >
                View Screenshots
              </button>

              <a
                href="https://github.com/LawrenceJaySaludes/clinical-appointment.git"
                target="_blank"
                rel="noreferrer"
                className="btn-solid"
              >
                GitHub Repository
              </a>
            </div>
          </div>

          <div className="card project-card scroll-animate fade-up delay-4">
            <span className="project-tag desktop">Desktop App</span>
            <h3>Billing Receipt for PickN'Eat</h3>
            <p style={{ margin: "1rem 0" }}>
              Desktop billing and receipt generation system built for PickN'Eat
              with database-driven transaction records.
            </p>
            <small>C# WinForms | SQL Server | Visual Studio</small>

            <div className="project-actions">
              <button
                className="btn-outline"
                onClick={() =>
                  setOpenGallery([billing1, billing2, billing3, billing4])
                }
              >
                View Screenshots
              </button>

              <a
                href="https://github.com/LawrenceJaySaludes/Billing-Receipt-for-Pick-N-Eat.git"
                target="_blank"
                rel="noreferrer"
                className="btn-solid"
              >
                GitHub Repository
              </a>
            </div>
          </div>

          {addedProjects.map((project) => (
            <div key={project.id} className="card project-card">
              <span
                className={`project-tag${
                  project.category.toLowerCase().includes("desktop")
                    ? " desktop"
                    : ""
                }`}
              >
                {project.category}
              </span>
              <h3>{project.title}</h3>
              <p style={{ margin: "1rem 0" }}>{project.description}</p>
              <small>{project.stack}</small>

              <div className="project-actions">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                  >
                    Live Demo
                  </a>
                )}

                {project.repoLink && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-solid"
                  >
                    GitHub
                  </a>
                )}

                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => handleRemoveProject(project.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="card project-card project-add-trigger scroll-animate fade-up delay-2"
            onClick={openPasswordModal}
            aria-label="Add project"
          >
            <span className="project-plus-icon">+</span>
            <span className="project-plus-text">Add Project</span>
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={closePasswordModal}>
          <div className="modal auth-modal" onClick={(event) => event.stopPropagation()}>
            <h3>Admin Access</h3>
            <p className="project-add-note">
              Enter admin password to add a new project.
            </p>

            <form className="project-form" onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={adminPasswordInput}
                onChange={(event) => setAdminPasswordInput(event.target.value)}
                placeholder="Admin password"
                className="form-input form-full"
                autoFocus
              />

              <div className="project-form-actions form-full">
                <button type="submit" className="btn-solid">
                  Continue
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={closePasswordModal}
                >
                  Cancel
                </button>
                {passwordError && <span className="form-error">{passwordError}</span>}
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddProjectModal && (
        <div className="modal-overlay" onClick={closeAddProjectModal}>
          <div className="modal project-form-modal" onClick={(event) => event.stopPropagation()}>
            <h3>Add Project</h3>
            <p className="project-add-note">
              Enter project details and link(s), then submit.
            </p>

            <form className="project-form" onSubmit={handleAddProject}>
              <input
                name="title"
                type="text"
                placeholder="Project title"
                value={formData.title}
                onChange={handleFormChange}
                className="form-input"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                className="form-select"
              >
                <option value="Website">Website</option>
                <option value="Desktop App">Desktop App</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                name="description"
                placeholder="Project description"
                value={formData.description}
                onChange={handleFormChange}
                className="form-textarea form-full"
              />

              <input
                name="stack"
                type="text"
                placeholder="Tech stack (e.g., React.js | Supabase | Vercel)"
                value={formData.stack}
                onChange={handleFormChange}
                className="form-input form-full"
              />

              <input
                name="liveLink"
                type="url"
                placeholder="Live demo link (optional)"
                value={formData.liveLink}
                onChange={handleFormChange}
                className="form-input"
              />

              <input
                name="repoLink"
                type="url"
                placeholder="GitHub link (optional)"
                value={formData.repoLink}
                onChange={handleFormChange}
                className="form-input"
              />

              <div className="project-form-actions form-full">
                <button type="submit" className="btn-solid">
                  Add Project
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={closeAddProjectModal}
                >
                  Cancel
                </button>
                {formError && <span className="form-error">{formError}</span>}
              </div>
            </form>
          </div>
        </div>
      )}

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
