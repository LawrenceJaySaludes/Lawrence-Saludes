import { useEffect, useState } from "react";
import HomePage from "./pages/Home";
import DeveloperPage from "./pages/Developer";
import VideoEditorPage from "./pages/VideoEditor";
import AdminPanel from "./components/AdminPanel";
import useInspectLock from "./hooks/useInspectLock";
import {
  readLocalPortfolioContent,
  saveLocalPortfolioContent,
} from "./lib/portfolioStore";
import { HOME_ABOUT_BUBBLES } from "./lib/portfolioVariants";

const SECRET_SEQUENCE = ["l", "j", "s"];
const DEPLOYED_PORTFOLIO_CONTENT_URL = "/portfolio-content.json";
const INTRO_FADE_MS = 3500;
const INTRO_SPEED_MULTIPLIER = 1.5;
const DEFAULT_CV = {
  url: "/Lawrence-Saludes-Resume.pdf",
  fileName: "Lawrence-Saludes-Resume.pdf",
};

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function toTextOrFallback(value, fallback) {
  return typeof value === "string" ? value : fallback;
}

const DEFAULT_CONTENT = {
  profile: {
    fullName: "Lawrence Jay A. Saludes",
    address: "Davao City, Philippines",
    birthday: "January 29, 2004",
    details: "Full Stack Development | Video Editing",
    profileImage: "",
  },
  contacts: {
    email: "lawrencejaysaludes@gmail.com",
    phone: "0939 694 2357",
    location: "Davao City, Philippines",
  },
  aboutBubbles: HOME_ABOUT_BUBBLES,
  customProjects: [],
  customVideos: [],
  customCertificates: [],
  cv: DEFAULT_CV,
};

function normalizeAboutBubbles(value) {
  if (!Array.isArray(value)) {
    return HOME_ABOUT_BUBBLES;
  }

  return HOME_ABOUT_BUBBLES.map((fallbackText, index) => {
    const item = value[index];
    return typeof item === "string" ? item : fallbackText;
  });
}

function normalizeProfile(value) {
  const safeValue = isObject(value) ? value : {};

  return {
    fullName: toTextOrFallback(safeValue.fullName, DEFAULT_CONTENT.profile.fullName),
    address: toTextOrFallback(safeValue.address, DEFAULT_CONTENT.profile.address),
    birthday: toTextOrFallback(safeValue.birthday, DEFAULT_CONTENT.profile.birthday),
    details: toTextOrFallback(safeValue.details, DEFAULT_CONTENT.profile.details),
    profileImage: toTextOrFallback(
      safeValue.profileImage,
      DEFAULT_CONTENT.profile.profileImage
    ),
  };
}

function normalizeContacts(value) {
  const safeValue = isObject(value) ? value : {};

  return {
    email: toTextOrFallback(safeValue.email, DEFAULT_CONTENT.contacts.email),
    phone: toTextOrFallback(safeValue.phone, DEFAULT_CONTENT.contacts.phone),
    location: toTextOrFallback(safeValue.location, DEFAULT_CONTENT.contacts.location),
  };
}

function normalizeCv(value) {
  if (typeof value === "string") {
    return {
      ...DEFAULT_CV,
      url: value.trim() || DEFAULT_CV.url,
    };
  }

  if (!value || typeof value !== "object") {
    return { ...DEFAULT_CV };
  }

  return {
    url:
      typeof value.url === "string" && value.url.trim()
        ? value.url.trim()
        : DEFAULT_CV.url,
    fileName:
      typeof value.fileName === "string" && value.fileName.trim()
        ? value.fileName.trim()
        : DEFAULT_CV.fileName,
  };
}

function mergeContent(stored) {
  return {
    profile: normalizeProfile(stored?.profile),
    contacts: normalizeContacts(stored?.contacts),
    aboutBubbles: normalizeAboutBubbles(stored?.aboutBubbles),
    customProjects: Array.isArray(stored?.customProjects)
      ? stored.customProjects
      : [],
    customVideos: Array.isArray(stored?.customVideos) ? stored.customVideos : [],
    customCertificates: Array.isArray(stored?.customCertificates)
      ? stored.customCertificates
      : [],
    cv: normalizeCv(stored?.cv),
  };
}

function hasPortfolioPayload(value) {
  if (!isObject(value)) {
    return false;
  }

  return (
    "profile" in value ||
    "contacts" in value ||
    "aboutBubbles" in value ||
    "customProjects" in value ||
    "customVideos" in value ||
    "customCertificates" in value ||
    "cv" in value
  );
}

function normalizePath(pathname) {
  if (typeof pathname !== "string" || !pathname.trim()) {
    return "/";
  }

  const trimmed = pathname.trim();
  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  if (withLeadingSlash === "/") {
    return "/";
  }

  return withLeadingSlash.replace(/\/+$/, "");
}

function App() {
  const [dark, setDark] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [pathname, setPathname] = useState(() =>
    normalizePath(window.location.pathname)
  );
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isIntroClosing, setIsIntroClosing] = useState(false);
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);
  const [introCommandText, setIntroCommandText] = useState("");
  const [introLocalText, setIntroLocalText] = useState("");
  const [introRouteText, setIntroRouteText] = useState("");
  const [isIntroLocalVisible, setIsIntroLocalVisible] = useState(false);
  const [isIntroRouteVisible, setIsIntroRouteVisible] = useState(false);
  const [introTypingStage, setIntroTypingStage] = useState("none");
  useInspectLock();
  const [portfolioContent, setPortfolioContent] = useState(() =>
    mergeContent(readLocalPortfolioContent())
  );

  const navigateTo = (nextPath) => {
    const normalizedPath = normalizePath(nextPath);

    if (normalizedPath === pathname) {
      return;
    }

    window.history.pushState({}, "", normalizedPath);
    setPathname(normalizedPath);
  };

  const savePortfolioContent = async () => {
    try {
      saveLocalPortfolioContent(portfolioContent);
    } catch {
      throw new Error(
        "Unable to save changes locally. Try a smaller CV file or use a hosted CV URL."
      );
    }

    return {
      mode: "local",
    };
  };

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadDeployedPortfolioContent = async () => {
      try {
        const response = await fetch(DEPLOYED_PORTFOLIO_CONTENT_URL, {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const deployedContent = await response.json();
        if (!isMounted || !hasPortfolioPayload(deployedContent)) {
          return;
        }

        const mergedContent = mergeContent(deployedContent);
        setPortfolioContent(mergedContent);

        try {
          saveLocalPortfolioContent(mergedContent);
        } catch {
          // Cache write errors should not block deployed content loading.
        }
      } catch (error) {
        console.error("Unable to load deployed portfolio content:", error);
      }
    };

    void loadDeployedPortfolioContent();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const timeouts = [];
    const faster = (ms) =>
      Math.max(1, Math.round(ms / INTRO_SPEED_MULTIPLIER));

    const wait = (ms) =>
      new Promise((resolve) => {
        const timeoutId = window.setTimeout(resolve, ms);
        timeouts.push(timeoutId);
      });

    const typeLine = async (text, setter, charMs) => {
      for (let index = 1; index <= text.length; index += 1) {
        if (isCancelled) {
          return;
        }

        setter(text.slice(0, index));
        await wait(charMs);
      }
    };

    const playIntroSequence = async () => {
      const commandLine = "npm run dev";
      const localLine = "lawrence-portfolio@0.0.0 dev";
      const routeLine = `Opening: https://www.lawrencesaludes.me${pathname === "/" ? "" : pathname}`;

      await wait(faster(220));
      if (isCancelled) {
        return;
      }

      setIntroTypingStage("command");
      await typeLine(commandLine, setIntroCommandText, faster(65));
      await wait(faster(220));
      if (isCancelled) {
        return;
      }

      setIsIntroLocalVisible(true);
      setIntroTypingStage("local");
      await typeLine(localLine, setIntroLocalText, faster(38));
      await wait(faster(180));
      if (isCancelled) {
        return;
      }

      setIsIntroRouteVisible(true);
      setIntroTypingStage("route");
      await typeLine(routeLine, setIntroRouteText, faster(32));
      await wait(faster(320));
      if (isCancelled) {
        return;
      }

      setIntroTypingStage("none");
      setIsPortfolioVisible(true);
      setIsIntroClosing(true);
    };

    const startTimeoutId = window.setTimeout(() => {
      if (isCancelled) {
        return;
      }

      setIsIntroVisible(true);
      setIsIntroClosing(false);
      setIsPortfolioVisible(false);
      setIntroCommandText("");
      setIntroLocalText("");
      setIntroRouteText("");
      setIsIntroLocalVisible(false);
      setIsIntroRouteVisible(false);
      setIntroTypingStage("none");

      void playIntroSequence();
    }, 0);

    return () => {
      isCancelled = true;
      window.clearTimeout(startTimeoutId);
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [pathname]);

  useEffect(() => {
    if (!isIntroVisible || !isIntroClosing) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsIntroVisible(false);
      setIsPortfolioVisible(true);
    }, INTRO_FADE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isIntroClosing, isIntroVisible]);

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

    if (showAdminPanel || isIntroVisible) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isIntroVisible, showAdminPanel]);

  const setProfile = (updater) => {
    setPortfolioContent((prev) => ({
      ...prev,
      profile: typeof updater === "function" ? updater(prev.profile) : updater,
    }));
  };

  const setContacts = (updater) => {
    setPortfolioContent((prev) => ({
      ...prev,
      contacts: typeof updater === "function" ? updater(prev.contacts) : updater,
    }));
  };

  const setAboutBubbles = (updater) => {
    setPortfolioContent((prev) => ({
      ...prev,
      aboutBubbles:
        typeof updater === "function" ? updater(prev.aboutBubbles) : updater,
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

  const setCv = (updater) => {
    setPortfolioContent((prev) => ({
      ...prev,
      cv: typeof updater === "function" ? updater(prev.cv) : updater,
    }));
  };

  const appClassName = `${dark ? "dark " : ""}app-bg${
    isIntroVisible && !isIntroClosing ? " intro-active" : ""
  }`;

  const handleIntroAnimationEnd = (event) => {
    if (!isIntroClosing || !isIntroVisible) {
      return;
    }

    if (
      event.target !== event.currentTarget ||
      event.animationName !== "introOverlayFadeOut"
    ) {
      return;
    }

    setIsPortfolioVisible(true);
    setIsIntroVisible(false);
  };

  return (
    <div className={appClassName}>
      <video
        className="app-bg-video"
        src="/whitevidbg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <video
        className="app-bg-video-dark"
        src="/darkblue.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {isPortfolioVisible && (
        pathname === "/developer" ? (
          <DeveloperPage
            key={pathname}
            dark={dark}
            setDark={setDark}
            navigateTo={navigateTo}
            portfolioContent={portfolioContent}
          />
        ) : pathname === "/video-editor" ? (
          <VideoEditorPage
            key={pathname}
            dark={dark}
            setDark={setDark}
            navigateTo={navigateTo}
            portfolioContent={portfolioContent}
          />
        ) : (
          <HomePage
            key={pathname}
            dark={dark}
            setDark={setDark}
            navigateTo={navigateTo}
            portfolioContent={portfolioContent}
          />
        )
      )}

      {showAdminPanel && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
          onSave={savePortfolioContent}
          profile={portfolioContent.profile}
          contacts={portfolioContent.contacts}
          aboutBubbles={portfolioContent.aboutBubbles}
          customProjects={portfolioContent.customProjects}
          customVideos={portfolioContent.customVideos}
          customCertificates={portfolioContent.customCertificates}
          cv={portfolioContent.cv}
          portfolioContent={portfolioContent}
          setProfile={setProfile}
          setContacts={setContacts}
          setAboutBubbles={setAboutBubbles}
          setCustomProjects={setCustomProjects}
          setCustomVideos={setCustomVideos}
          setCustomCertificates={setCustomCertificates}
          setCv={setCv}
        />
      )}

      {isIntroVisible && (
        <div
          className={`intro-overlay${isIntroClosing ? " is-hiding" : ""}`}
          aria-hidden="true"
          onAnimationEnd={handleIntroAnimationEnd}
        >
          <div className="intro-logo-orbit">
            <span className="intro-logo-glare" aria-hidden="true" />
            <img src="/ls-new-3d.png" alt="" className="intro-logo" />
          </div>

          <div className="intro-terminal">
            <p
              className={`intro-terminal-line intro-terminal-command${
                introTypingStage === "command" ? " is-typing" : ""
              }`}
            >
              <span className="intro-terminal-prefix">$</span>
              <span className="intro-terminal-text">{introCommandText}</span>
              <span className="intro-terminal-caret" aria-hidden="true" />
            </p>
            <p
              className={`intro-terminal-line intro-terminal-local${
                isIntroLocalVisible ? " is-visible" : ""
              }${introTypingStage === "local" ? " is-typing" : ""}`}
            >
              <span className="intro-terminal-prefix">$</span>
              <span className="intro-terminal-text">{introLocalText}</span>
              <span className="intro-terminal-caret" aria-hidden="true" />
            </p>
            <p
              className={`intro-terminal-line intro-terminal-route${
                isIntroRouteVisible ? " is-visible" : ""
              }${introTypingStage === "route" ? " is-typing" : ""}`}
            >
              <span className="intro-terminal-prefix">&gt;</span>
              <span className="intro-terminal-text">{introRouteText}</span>
              <span className="intro-terminal-caret" aria-hidden="true" />
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
