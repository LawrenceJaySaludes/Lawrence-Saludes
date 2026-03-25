import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Videos from "./components/Videos";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Certificates from "./components/Certificates";
import AdminPanel from "./components/AdminPanel";
import { FloatingDock } from "./components/ui/FloatingDock";
import {
  IconAddressBook,
  IconCertificate,
  IconCode,
  IconHome,
  IconInfoCircle,
  IconMoonStars,
  IconPlayerPlay,
  IconSunHigh,
  IconTools,
} from "@tabler/icons-react";

const STORAGE_KEY = "portfolio-admin-content-v1";
const SECRET_SEQUENCE = ["l", "j", "s"];

const DEFAULT_CONTENT = {
  profile: {
    fullName: "Lawrence Jay A. Saludes",
    address: "Davao City, Philippines",
    birthday: "January 29, 2004",
    details: "Junior Web Developer | React.js | Video Editor",
  },
  contacts: {
    email: "lawrencesaludes00@gmail.com",
    phone: "0939 694 2357",
    location: "Davao City, Philippines",
  },
  customProjects: [],
  customVideos: [],
  customCertificates: [],
};

function readStoredContent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function mergeContent(stored) {
  return {
    profile: {
      ...DEFAULT_CONTENT.profile,
      ...(stored?.profile ?? {}),
    },
    contacts: {
      ...DEFAULT_CONTENT.contacts,
      ...(stored?.contacts ?? {}),
    },
    customProjects: Array.isArray(stored?.customProjects)
      ? stored.customProjects
      : [],
    customVideos: Array.isArray(stored?.customVideos) ? stored.customVideos : [],
    customCertificates: Array.isArray(stored?.customCertificates)
      ? stored.customCertificates
      : [],
  };
}

function App() {
  const [dark, setDark] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [portfolioContent, setPortfolioContent] = useState(() =>
    mergeContent(readStoredContent())
  );

  const savePortfolioContent = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioContent));
    }
  };

  useEffect(() => {
    let sequenceIndex = 0;
    let lastKeyTime = 0;

    const handleSecretShortcut = (event) => {
      const key = event.key.toLowerCase();
      const now = Date.now();

      if (!event.ctrlKey) {
        sequenceIndex = 0;
        return;
      }

      if (now - lastKeyTime > 1600) {
        sequenceIndex = 0;
      }
      lastKeyTime = now;

      if (key === SECRET_SEQUENCE[sequenceIndex]) {
        event.preventDefault();
        sequenceIndex += 1;

        if (sequenceIndex === SECRET_SEQUENCE.length) {
          setShowAdminPanel(true);
          sequenceIndex = 0;
        }

        return;
      }

      sequenceIndex = key === SECRET_SEQUENCE[0] ? 1 : 0;
    };

    window.addEventListener("keydown", handleSecretShortcut, true);
    return () => window.removeEventListener("keydown", handleSecretShortcut, true);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (showAdminPanel) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [showAdminPanel]);

  const setProfile = (updater) => {
    setPortfolioContent((prev) => ({
      ...prev,
      profile:
        typeof updater === "function" ? updater(prev.profile) : updater,
    }));
  };

  const setContacts = (updater) => {
    setPortfolioContent((prev) => ({
      ...prev,
      contacts:
        typeof updater === "function" ? updater(prev.contacts) : updater,
    }));
  };

  const setCustomProjects = (updater) => {
    setPortfolioContent((prev) => ({
      ...prev,
      customProjects:
        typeof updater === "function"
          ? updater(prev.customProjects)
          : updater,
    }));
  };

  const setCustomVideos = (updater) => {
    setPortfolioContent((prev) => ({
      ...prev,
      customVideos:
        typeof updater === "function" ? updater(prev.customVideos) : updater,
    }));
  };

  const setCustomCertificates = (updater) => {
    setPortfolioContent((prev) => ({
      ...prev,
      customCertificates:
        typeof updater === "function"
          ? updater(prev.customCertificates)
          : updater,
    }));
  };

  const dockItems = [
    {
      title: "Home",
      href: "#home",
      icon: <IconHome className="dock-nav-icon" stroke={1.9} />,
    },
    {
      title: "About",
      href: "#about",
      icon: <IconInfoCircle className="dock-nav-icon" stroke={1.9} />,
    },
    {
      title: "Certificates",
      href: "#certificates",
      icon: <IconCertificate className="dock-nav-icon" stroke={1.9} />,
    },
    {
      title: "Projects",
      href: "#projects",
      icon: <IconCode className="dock-nav-icon" stroke={1.9} />,
    },
    {
      title: "Videos",
      href: "#videos",
      icon: <IconPlayerPlay className="dock-nav-icon" stroke={1.9} />,
    },
    {
      title: "Skills",
      href: "#skills",
      icon: <IconTools className="dock-nav-icon" stroke={1.9} />,
    },
    {
      title: "Contact",
      href: "#contact",
      icon: <IconAddressBook className="dock-nav-icon" stroke={1.9} />,
    },
  ];

  return (
    <div className={dark ? "dark app-bg" : "app-bg"}>
      {/* DARK MODE TOGGLE */}
      <button
        onClick={() => setDark(!dark)}
        className="dark-toggle"
        title="Toggle dark mode"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className="dark-toggle-track">
          <span className="dark-toggle-knob">
            {dark ? (
              <IconSunHigh className="dark-toggle-icon" stroke={1.8} />
            ) : (
              <IconMoonStars className="dark-toggle-icon" stroke={1.8} />
            )}
          </span>
        </span>
        <span className="dark-toggle-label">{dark ? "Light" : "Dark"}</span>
      </button>

      <FloatingDock
        items={dockItems}
        desktopClassName="portfolio-dock-desktop"
        mobileClassName="portfolio-dock-mobile"
      />

      <Hero profile={portfolioContent.profile} />

      <div className="section-divider" />

      <About />

      <div className="section-divider" />

      <Certificates customCertificates={portfolioContent.customCertificates} />

      <div className="section-divider" />

      <Projects customProjects={portfolioContent.customProjects} />

      <div className="section-divider" />

      <Videos customVideos={portfolioContent.customVideos} />

      <div className="section-divider" />

      <Skills />

      <div className="section-divider" />

      <Contact contacts={portfolioContent.contacts} />

      {showAdminPanel && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
          onSave={savePortfolioContent}
          profile={portfolioContent.profile}
          contacts={portfolioContent.contacts}
          customProjects={portfolioContent.customProjects}
          customVideos={portfolioContent.customVideos}
          customCertificates={portfolioContent.customCertificates}
          setProfile={setProfile}
          setContacts={setContacts}
          setCustomProjects={setCustomProjects}
          setCustomVideos={setCustomVideos}
          setCustomCertificates={setCustomCertificates}
        />
      )}
    </div>
  );
}

export default App;
