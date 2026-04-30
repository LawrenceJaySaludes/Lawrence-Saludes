import { useCallback, useEffect, useState } from "react";

const ADMIN_PASSWORD = "lawrence@admin.him";
const MAX_CV_FILE_SIZE_BYTES = 3 * 1024 * 1024;
const CV_FILE_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const EMPTY_PROJECT = {
  title: "",
  category: "Website",
  description: "",
  stack: "",
  liveLink: "",
  repoLink: "",
};

const EMPTY_VIDEO = {
  title: "",
  link: "",
  description: "",
  thumbnail: "",
};

const EMPTY_CERTIFICATE = {
  title: "",
  imageUrl: "",
};

const TABS = [
  { id: "identity", label: "Identity" },
  { id: "projects", label: "Projects" },
  { id: "videos", label: "Videos" },
  { id: "certificates", label: "Certificates" },
];

function AdminPanel({
  onClose,
  onSave,
  profile,
  contacts,
  aboutBubbles,
  customProjects,
  customVideos,
  customCertificates,
  cv,
  setProfile,
  setContacts,
  setAboutBubbles,
  setCustomProjects,
  setCustomVideos,
  setCustomCertificates,
  setCv,
}) {
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState("identity");

  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT);
  const [videoForm, setVideoForm] = useState(EMPTY_VIDEO);
  const [certificateForm, setCertificateForm] = useState(EMPTY_CERTIFICATE);

  const [projectError, setProjectError] = useState("");
  const [videoError, setVideoError] = useState("");
  const [certificateError, setCertificateError] = useState("");
  const [cvError, setCvError] = useState("");
  const [isCvDragActive, setIsCvDragActive] = useState(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const markDirty = () => {
    setHasUnsavedChanges(true);
    setSaveFeedback("");
  };

  const requestClose = useCallback(() => {
    if (isSaving) {
      return;
    }

    if (authed && hasUnsavedChanges) {
      const shouldClose = window.confirm(
        "You have unsaved changes. Close without saving?"
      );

      if (!shouldClose) {
        return;
      }
    }

    onClose();
  }, [authed, hasUnsavedChanges, isSaving, onClose]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        requestClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [requestClose]);

  useEffect(() => {
    if (!saveFeedback) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSaveFeedback("");
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [saveFeedback]);

  const handleSaveChanges = async () => {
    if (isSaving || !hasUnsavedChanges) {
      return;
    }

    setIsSaving(true);
    setSaveFeedback("");

    try {
      const saveResult = await onSave();
      setHasUnsavedChanges(false);
      setSaveFeedback(
        saveResult?.mode === "remote"
          ? "Changes saved and synced across devices."
          : "Changes saved."
      );
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Unable to save changes.";
      setSaveFeedback(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();

    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setAuthed(true);
      setAuthError("");
      setPasswordInput("");
      return;
    }

    setAuthError("Incorrect password.");
  };

  const handleProjectSubmit = (event) => {
    event.preventDefault();

    if (
      !projectForm.title.trim() ||
      !projectForm.description.trim() ||
      !projectForm.stack.trim()
    ) {
      setProjectError("Project title, description, and stack are required.");
      return;
    }

    if (!projectForm.liveLink.trim() && !projectForm.repoLink.trim()) {
      setProjectError("Add at least one link (Live Demo or GitHub).");
      return;
    }

    const newProject = {
      id: `custom-project-${Date.now()}`,
      title: projectForm.title.trim(),
      category: projectForm.category.trim() || "Website",
      description: projectForm.description.trim(),
      stack: projectForm.stack.trim(),
      liveLink: projectForm.liveLink.trim(),
      repoLink: projectForm.repoLink.trim(),
    };

    setCustomProjects((prev) => [newProject, ...prev]);
    setProjectForm(EMPTY_PROJECT);
    setProjectError("");
    markDirty();
  };

  const handleVideoSubmit = (event) => {
    event.preventDefault();

    if (!videoForm.title.trim() || !videoForm.link.trim()) {
      setVideoError("Video title and URL are required.");
      return;
    }

    const newVideo = {
      id: `custom-video-${Date.now()}`,
      title: videoForm.title.trim(),
      link: videoForm.link.trim(),
      description: videoForm.description.trim(),
      thumbnail: videoForm.thumbnail.trim(),
    };

    setCustomVideos((prev) => [newVideo, ...prev]);
    setVideoForm(EMPTY_VIDEO);
    setVideoError("");
    markDirty();
  };

  const handleCertificateSubmit = (event) => {
    event.preventDefault();

    if (!certificateForm.title.trim() || !certificateForm.imageUrl.trim()) {
      setCertificateError("Certificate title and image URL are required.");
      return;
    }

    const newCertificate = {
      id: `custom-cert-${Date.now()}`,
      title: certificateForm.title.trim(),
      imageUrl: certificateForm.imageUrl.trim(),
    };

    setCustomCertificates((prev) => [newCertificate, ...prev]);
    setCertificateForm(EMPTY_CERTIFICATE);
    setCertificateError("");
    markDirty();
  };

  const processCvAttachment = (file) => {
    if (!file) {
      return;
    }

    const lowerName = typeof file.name === "string" ? file.name.toLowerCase() : "";
    const isAllowedType =
      lowerName.endsWith(".pdf") ||
      lowerName.endsWith(".doc") ||
      lowerName.endsWith(".docx");

    if (!isAllowedType) {
      setCvError("Please attach a PDF, DOC, or DOCX file.");
      return;
    }

    if (file.size > MAX_CV_FILE_SIZE_BYTES) {
      setCvError("CV file is too large. Keep it 3MB or less.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setCvError("Unable to read the selected file.");
        return;
      }

      setCv((prev) => ({
        ...(prev ?? {}),
        url: reader.result,
        fileName: file.name,
      }));
      setCvError("");
      markDirty();
    };

    reader.onerror = () => {
      setCvError("Unable to read the selected file.");
    };

    reader.readAsDataURL(file);
  };

  const handleCvFileChange = (event) => {
    const input = event.target;
    processCvAttachment(input.files?.[0]);
    input.value = "";
  };

  const handleCvDragEnter = (event) => {
    event.preventDefault();
    setIsCvDragActive(true);
  };

  const handleCvDragOver = (event) => {
    event.preventDefault();
    if (!isCvDragActive) {
      setIsCvDragActive(true);
    }
  };

  const handleCvDragLeave = (event) => {
    event.preventDefault();
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsCvDragActive(false);
    }
  };

  const handleCvDrop = (event) => {
    event.preventDefault();
    setIsCvDragActive(false);
    processCvAttachment(event.dataTransfer?.files?.[0]);
  };

  const projectCount = customProjects.length;
  const videoCount = customVideos.length;
  const certificateCount = customCertificates.length;
  const cvFileName =
    typeof cv?.fileName === "string" && cv.fileName.trim()
      ? cv.fileName.trim()
      : "No file selected";
  const aboutBubbleFields = Array.from({ length: 4 }, (_, index) => {
    const value = aboutBubbles?.[index];
    return typeof value === "string" ? value : "";
  });

  if (!authed) {
    return (
      <div
        className="admin-overlay admin-auth-overlay"
        role="dialog"
        aria-modal="true"
        onClick={requestClose}
      >
        <div
          className="admin-auth-card admin-auth-modal"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="admin-auth-header">
            <span className="admin-auth-badge">Secure Access</span>
            <h3 className="admin-auth-title">Admin Login</h3>
            <p className="project-add-note admin-auth-copy">
              Enter the admin password to continue.
            </p>
          </div>

          <form className="admin-auth-form" onSubmit={handleAuthSubmit}>
            <label className="admin-field-label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={passwordInput}
              onChange={(event) => {
                setPasswordInput(event.target.value);
                setAuthError("");
              }}
              placeholder="Admin password"
              className="form-input"
              autoFocus
            />

            <div className="admin-inline-actions">
              <button type="submit" className="btn-solid admin-primary-btn">
                Unlock Panel
              </button>
              <button
                type="button"
                className="btn-outline admin-secondary-btn"
                onClick={requestClose}
              >
                Cancel
              </button>
            </div>

            {authError && <span className="form-error">{authError}</span>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      className="admin-overlay"
      role="dialog"
      aria-modal="true"
      onClick={requestClose}
    >
      <div className="admin-panel" onClick={(event) => event.stopPropagation()}>
        <div className="admin-toolbar">
          <div>
            <h2 className="admin-title">Admin Studio</h2>
            <p className="admin-subtitle">
              Update your portfolio and click Save Changes to persist edits.
            </p>
          </div>

          <div className="admin-toolbar-actions">
            <span
              className={`admin-save-pill${hasUnsavedChanges ? " is-dirty" : ""}`}
            >
              {isSaving ? "Saving" : hasUnsavedChanges ? "Unsaved" : "Saved"}
            </span>
            <button
              type="button"
              className="btn-solid admin-save-btn"
              onClick={handleSaveChanges}
              disabled={!hasUnsavedChanges || isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="btn-outline admin-close-btn"
              onClick={requestClose}
              disabled={isSaving}
            >
              Close
            </button>
          </div>
        </div>

        {saveFeedback && (
          <div className="admin-save-feedback-wrap">
            <p className="admin-save-feedback">{saveFeedback}</p>
          </div>
        )}

        <div className="admin-body">
          <div className="admin-stats">
            <div className="admin-stat-card">
              <span className="admin-stat-label">Custom Projects</span>
              <strong className="admin-stat-value">{projectCount}</strong>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-label">Custom Videos</span>
              <strong className="admin-stat-value">{videoCount}</strong>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-label">Certificates Added</span>
              <strong className="admin-stat-value">{certificateCount}</strong>
            </div>
          </div>

          <div className="admin-tabs" role="tablist" aria-label="Admin sections">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`admin-tab-btn${activeTab === tab.id ? " is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "identity" && (
            <div className="admin-content-grid">
              <section className="admin-section">
                <div className="admin-section-head">
                  <h3>Profile Info</h3>
                </div>
                <p className="admin-section-note">
                  Changes update your hero and about profile content instantly.
                </p>

                <div className="admin-form-grid">
                  <label className="admin-field-label">Full Name</label>
                  <input
                    className="form-input"
                    value={profile.fullName}
                    onChange={(event) => {
                      markDirty();
                      setProfile((prev) => ({
                        ...prev,
                        fullName: event.target.value,
                      }));
                    }}
                    placeholder="Full name"
                  />

                  <label className="admin-field-label">Address</label>
                  <input
                    className="form-input"
                    value={profile.address}
                    onChange={(event) => {
                      markDirty();
                      setProfile((prev) => ({
                        ...prev,
                        address: event.target.value,
                      }));
                    }}
                    placeholder="Address"
                  />

                  <label className="admin-field-label">Birthday</label>
                  <input
                    className="form-input"
                    value={profile.birthday}
                    onChange={(event) => {
                      markDirty();
                      setProfile((prev) => ({
                        ...prev,
                        birthday: event.target.value,
                      }));
                    }}
                    placeholder="Birthday"
                  />

                  <label className="admin-field-label">Role / Details</label>
                  <input
                    className="form-input"
                    value={profile.details}
                    onChange={(event) => {
                      markDirty();
                      setProfile((prev) => ({
                        ...prev,
                        details: event.target.value,
                      }));
                    }}
                    placeholder="Role or short details"
                  />

                  <label className="admin-field-label">Profile Image URL</label>
                  <input
                    className="form-input form-full"
                    value={profile.profileImage || ""}
                    onChange={(event) => {
                      markDirty();
                      setProfile((prev) => ({
                        ...prev,
                        profileImage: event.target.value,
                      }));
                    }}
                    placeholder="https://example.com/your-profile-image.jpg"
                  />

                  <label className="admin-field-label">Update CV Attachment</label>
                  <div
                    className={`admin-cv-dropzone form-full${isCvDragActive ? " is-drag-active" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.currentTarget
                        .querySelector(".admin-cv-file-input")
                        ?.click();
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.currentTarget
                          .querySelector(".admin-cv-file-input")
                          ?.click();
                      }
                    }}
                    onDragEnter={handleCvDragEnter}
                    onDragOver={handleCvDragOver}
                    onDragLeave={handleCvDragLeave}
                    onDrop={handleCvDrop}
                  >
                    <p className="admin-cv-dropzone-title">Drop your CV file here</p>
                    <p className="admin-cv-dropzone-copy">
                      PDF, DOC, or DOCX up to 3MB
                    </p>
                    <p className="admin-cv-current-file">
                      Current file: <strong>{cvFileName}</strong>
                    </p>
                    <button
                      type="button"
                      className="btn-outline admin-secondary-btn admin-cv-upload-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        event.currentTarget
                          .closest(".admin-cv-dropzone")
                          ?.querySelector(".admin-cv-file-input")
                          ?.click();
                      }}
                    >
                      Choose File
                    </button>
                    <input
                      type="file"
                      accept={CV_FILE_ACCEPT}
                      className="admin-cv-file-input"
                      onChange={handleCvFileChange}
                    />
                  </div>

                  <p className="admin-section-note form-full">
                    Drag and drop your CV attachment, then click Save Changes.
                  </p>

                  {cvError && <span className="form-error form-full">{cvError}</span>}
                </div>
              </section>

              <section className="admin-section">
                <div className="admin-section-head">
                  <h3>Contact Info</h3>
                </div>
                <p className="admin-section-note">
                  This controls the information in your contact card.
                </p>

                <div className="admin-form-grid">
                  <label className="admin-field-label">Email</label>
                  <input
                    className="form-input"
                    value={contacts.email}
                    onChange={(event) => {
                      markDirty();
                      setContacts((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }));
                    }}
                    placeholder="Email"
                  />

                  <label className="admin-field-label">Phone</label>
                  <input
                    className="form-input"
                    value={contacts.phone}
                    onChange={(event) => {
                      markDirty();
                      setContacts((prev) => ({
                        ...prev,
                        phone: event.target.value,
                      }));
                    }}
                    placeholder="Phone"
                  />

                  <label className="admin-field-label">Location</label>
                  <input
                    className="form-input"
                    value={contacts.location}
                    onChange={(event) => {
                      markDirty();
                      setContacts((prev) => ({
                        ...prev,
                        location: event.target.value,
                      }));
                    }}
                    placeholder="Location"
                  />
                </div>
              </section>

              <section className="admin-section">
                <div className="admin-section-head">
                  <h3>About Myself</h3>
                </div>
                <p className="admin-section-note">
                  Edit the about chat bubbles shown in your About section.
                </p>

                <div className="admin-form-grid">
                  {aboutBubbleFields.map((bubbleText, index) => (
                    <div key={`about-bubble-field-${index}`} className="form-full">
                      <label className="admin-field-label">
                        Chat Bubble {index + 1}
                      </label>
                      <textarea
                        className="form-textarea form-full"
                        value={bubbleText}
                        onChange={(event) => {
                          const nextValue = event.target.value;
                          markDirty();
                          setAboutBubbles((prev) => {
                            const next = Array.from({ length: 4 }, (_, bubbleIndex) => {
                              const existingValue = prev?.[bubbleIndex];
                              return typeof existingValue === "string" ? existingValue : "";
                            });

                            next[index] = nextValue;
                            return next;
                          });
                        }}
                        placeholder={`Write your about message ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="admin-content-grid admin-content-single">
              <section className="admin-section">
                <div className="admin-section-head">
                  <h3>Add Project</h3>
                  <span className="admin-count-chip">{projectCount} saved</span>
                </div>

                <form className="admin-form" onSubmit={handleProjectSubmit}>
                  <input
                    name="title"
                    className="form-input"
                    placeholder="Project title"
                    value={projectForm.title}
                    onChange={(event) => {
                      setProjectForm((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }));
                      setProjectError("");
                    }}
                  />
                  <select
                    className="form-select"
                    value={projectForm.category}
                    onChange={(event) =>
                      setProjectForm((prev) => ({
                        ...prev,
                        category: event.target.value,
                      }))
                    }
                  >
                    <option value="Website">Website</option>
                    <option value="Desktop App">Desktop App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Other">Other</option>
                  </select>

                  <textarea
                    className="form-textarea form-full"
                    placeholder="Project description"
                    value={projectForm.description}
                    onChange={(event) => {
                      setProjectForm((prev) => ({
                        ...prev,
                        description: event.target.value,
                      }));
                      setProjectError("");
                    }}
                  />

                  <input
                    className="form-input form-full"
                    placeholder="Tech stack"
                    value={projectForm.stack}
                    onChange={(event) => {
                      setProjectForm((prev) => ({
                        ...prev,
                        stack: event.target.value,
                      }));
                      setProjectError("");
                    }}
                  />

                  <input
                    className="form-input"
                    placeholder="Live demo link"
                    value={projectForm.liveLink}
                    onChange={(event) => {
                      setProjectForm((prev) => ({
                        ...prev,
                        liveLink: event.target.value,
                      }));
                      setProjectError("");
                    }}
                  />

                  <input
                    className="form-input"
                    placeholder="GitHub link"
                    value={projectForm.repoLink}
                    onChange={(event) => {
                      setProjectForm((prev) => ({
                        ...prev,
                        repoLink: event.target.value,
                      }));
                      setProjectError("");
                    }}
                  />

                  <div className="admin-inline-actions form-full">
                    <button type="submit" className="btn-solid admin-primary-btn">
                      Add Project
                    </button>
                    {projectError && <span className="form-error">{projectError}</span>}
                  </div>
                </form>

                <div className="admin-list">
                  <div className="admin-list-head">Saved Projects</div>
                  {customProjects.length === 0 ? (
                    <p className="admin-empty-state">No custom projects yet.</p>
                  ) : (
                    customProjects.map((project) => (
                      <div key={project.id} className="admin-list-item">
                        <span>{project.title}</span>
                        <button
                          type="button"
                          className="btn-outline admin-remove-btn"
                          onClick={() => {
                            setCustomProjects((prev) =>
                              prev.filter((item) => item.id !== project.id)
                            );
                            markDirty();
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}

          {activeTab === "videos" && (
            <div className="admin-content-grid admin-content-single">
              <section className="admin-section">
                <div className="admin-section-head">
                  <h3>Add Video</h3>
                  <span className="admin-count-chip">{videoCount} saved</span>
                </div>

                <form className="admin-form" onSubmit={handleVideoSubmit}>
                  <input
                    className="form-input"
                    placeholder="Video title"
                    value={videoForm.title}
                    onChange={(event) => {
                      setVideoForm((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }));
                      setVideoError("");
                    }}
                  />
                  <input
                    className="form-input"
                    placeholder="Video URL"
                    value={videoForm.link}
                    onChange={(event) => {
                      setVideoForm((prev) => ({
                        ...prev,
                        link: event.target.value,
                      }));
                      setVideoError("");
                    }}
                  />
                  <textarea
                    className="form-textarea form-full"
                    placeholder="Description (optional)"
                    value={videoForm.description}
                    onChange={(event) =>
                      setVideoForm((prev) => ({
                        ...prev,
                        description: event.target.value,
                      }))
                    }
                  />
                  <input
                    className="form-input form-full"
                    placeholder="Thumbnail URL (optional)"
                    value={videoForm.thumbnail}
                    onChange={(event) =>
                      setVideoForm((prev) => ({
                        ...prev,
                        thumbnail: event.target.value,
                      }))
                    }
                  />
                  <div className="admin-inline-actions form-full">
                    <button type="submit" className="btn-solid admin-primary-btn">
                      Add Video
                    </button>
                    {videoError && <span className="form-error">{videoError}</span>}
                  </div>
                </form>

                <div className="admin-list">
                  <div className="admin-list-head">Saved Videos</div>
                  {customVideos.length === 0 ? (
                    <p className="admin-empty-state">No custom videos yet.</p>
                  ) : (
                    customVideos.map((video) => (
                      <div key={video.id} className="admin-list-item">
                        <span>{video.title}</span>
                        <button
                          type="button"
                          className="btn-outline admin-remove-btn"
                          onClick={() => {
                            setCustomVideos((prev) =>
                              prev.filter((item) => item.id !== video.id)
                            );
                            markDirty();
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="admin-content-grid admin-content-single">
              <section className="admin-section">
                <div className="admin-section-head">
                  <h3>Add Certificate</h3>
                  <span className="admin-count-chip">{certificateCount} saved</span>
                </div>

                <form className="admin-form" onSubmit={handleCertificateSubmit}>
                  <input
                    className="form-input"
                    placeholder="Certificate title"
                    value={certificateForm.title}
                    onChange={(event) => {
                      setCertificateForm((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }));
                      setCertificateError("");
                    }}
                  />
                  <input
                    className="form-input"
                    placeholder="Certificate image URL"
                    value={certificateForm.imageUrl}
                    onChange={(event) => {
                      setCertificateForm((prev) => ({
                        ...prev,
                        imageUrl: event.target.value,
                      }));
                      setCertificateError("");
                    }}
                  />
                  <div className="admin-inline-actions form-full">
                    <button type="submit" className="btn-solid admin-primary-btn">
                      Add Certificate
                    </button>
                    {certificateError && <span className="form-error">{certificateError}</span>}
                  </div>
                </form>

                <div className="admin-list">
                  <div className="admin-list-head">Saved Certificates</div>
                  {customCertificates.length === 0 ? (
                    <p className="admin-empty-state">No certificates added yet.</p>
                  ) : (
                    customCertificates.map((certificate) => (
                      <div key={certificate.id} className="admin-list-item">
                        <span>{certificate.title}</span>
                        <button
                          type="button"
                          className="btn-outline admin-remove-btn"
                          onClick={() => {
                            setCustomCertificates((prev) =>
                              prev.filter((item) => item.id !== certificate.id)
                            );
                            markDirty();
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
