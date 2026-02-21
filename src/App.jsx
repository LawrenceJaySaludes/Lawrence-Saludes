import { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Videos from "./components/Videos";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Certificates from "./components/Certificates";
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

function App() {
  const [dark, setDark] = useState(false);
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

      <Hero />

      <div className="section-divider" />

      <About />

      <div className="section-divider" />

      <Certificates />

      <div className="section-divider" />

      <Projects />

      <div className="section-divider" />

      <Videos />

      <div className="section-divider" />

      <Skills />

      <div className="section-divider" />

      <Contact />
    </div>
  );
}

export default App;
