import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Videos from "./Videos";
import Skills from "./Skills";
import Contact from "./Contact";
import Certificates from "./Certificates";
import { FloatingDock } from "./ui/FloatingDock";
import ChatBot from "./ChatBot";
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
import {
  DEVELOPER_ABOUT_BUBBLES,
  DEVELOPER_CERTIFICATES,
  DEVELOPER_CTA_BUTTONS,
  DEVELOPER_HERO_DETAILS,
  DEVELOPER_PROJECTS,
  DEVELOPER_SKILL_GROUPS,
  HOME_HERO_CTA_BUTTONS,
  HOME_SKILL_GROUPS,
  VIDEO_ABOUT_BUBBLES,
  VIDEO_CTA_BUTTONS,
  VIDEO_CHANNELS,
  VIDEO_HERO_DETAILS,
  VIDEO_SKILL_GROUPS,
} from "../lib/portfolioVariants";

function buildDockItems(variant) {
  const commonItems = [
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
  ];

  if (variant === "developer") {
    return [
      ...commonItems,
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
  }

  if (variant === "video") {
    return [
      ...commonItems,
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
  }

  return [
    ...commonItems,
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
}

function getRouteContent(variant, portfolioContent) {
  const homeContent = portfolioContent ?? {};
  const profile = homeContent.profile ?? {};
  const contacts = homeContent.contacts ?? {};
  const cv = homeContent.cv ?? {};

  if (variant === "developer") {
    return {
      profile: {
        ...profile,
        details: DEVELOPER_HERO_DETAILS,
      },
      heroButtons: DEVELOPER_CTA_BUTTONS,
      aboutTitle: "About Myself",
      aboutLead:
        "A focused developer with a background in full stack web development, system integration, and real-world software deployment.",
      aboutBubbles: DEVELOPER_ABOUT_BUBBLES,
      showCertificates: true,
      certificateTitle: "Certificates",
      certificateLead:
        "Certifications and training that support my full stack and IT development focus.",
      certificates: DEVELOPER_CERTIFICATES,
      showProjects: true,
      projectTitle: "System Projects",
      projectLead:
        "Projects focused on responsive interfaces, system logic, database flows, and deployment-ready builds.",
      projects: DEVELOPER_PROJECTS,
      showVideos: false,
      showSkills: true,
      skillsTitle: "Skills and Technologies",
      skillGroups: DEVELOPER_SKILL_GROUPS,
      customVideos: [],
      contacts,
      cv,
    };
  }

  if (variant === "video") {
    return {
      profile: {
        ...profile,
        details: VIDEO_HERO_DETAILS,
      },
      heroButtons: VIDEO_CTA_BUTTONS,
      aboutTitle: "About Myself",
      aboutLead:
        "A dedicated video editor with over 2 years of professional experience crafting engaging content across multiple platforms and formats.",
      aboutBubbles: VIDEO_ABOUT_BUBBLES,
      showCertificates: false,
      showProjects: false,
      showVideos: true,
      showSkills: true,
      skillsTitle: "Skills and Software",
      skillGroups: VIDEO_SKILL_GROUPS,
      customVideos: Array.isArray(homeContent.customVideos)
        ? homeContent.customVideos
        : [],
      contacts,
      cv,
    };
  }

  return {
    profile: {
      ...profile,
      details:
        typeof profile.details === "string" && profile.details.trim()
          ? profile.details.trim()
          : "Full Stack Development | Video Editing",
    },
    heroButtons: HOME_HERO_CTA_BUTTONS,
    aboutTitle: "About Myself",
    aboutLead:
      "A quick snapshot of how I combine web development, system building, and creative editing into polished, real-world work.",
    aboutBubbles: Array.isArray(homeContent.aboutBubbles)
      ? homeContent.aboutBubbles
      : [],
    showCertificates: true,
    certificateTitle: "Certificates",
    certificateLead:
      "Certifications that reflect continuous learning, technical growth, and hands-on professional development.",
    showProjects: true,
    projectTitle: "Website & Desktop Projects",
    projectLead:
      "A selection of web and desktop builds focused on usable interfaces, solid system logic, and practical real-world workflows.",
    showVideos: true,
    showSkills: true,
    skillsTitle: "Skills",
    skillGroups: HOME_SKILL_GROUPS,
    customVideos: Array.isArray(homeContent.customVideos)
      ? homeContent.customVideos
      : [],
    contacts,
    cv,
  };
}

function SectionDivider() {
  return <div className="section-divider" />;
}

function PortfolioPage({
  variant = "home",
  dark = false,
  setDark,
  navigateTo,
  portfolioContent,
}) {
  const page = getRouteContent(variant, portfolioContent);

  return (
    <div className="app-content">
      <button
        onClick={() => setDark?.(!dark)}
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
        </button>

      <FloatingDock
        items={buildDockItems(variant)}
        desktopClassName="portfolio-dock-desktop"
        mobileClassName="portfolio-dock-mobile"
      />

      <Hero
        profile={page.profile}
        dark={dark}
        ctaButtons={page.heroButtons}
        navigateTo={navigateTo}
        details={page.profile.details}
      />

      <main className="portfolio-sections">
        <SectionDivider />

        <About
          title={page.aboutTitle}
          lead={page.aboutLead}
          aboutBubbles={page.aboutBubbles}
          profileImage={portfolioContent?.profile?.profileImage}
        />

        {page.showCertificates && (
          <>
            <SectionDivider />
            <Certificates
              title={page.certificateTitle}
              lead={page.certificateLead}
              certificates={page.certificates}
            />
          </>
        )}

        {page.showProjects && (
          <>
            <SectionDivider />
            <Projects
              title={page.projectTitle}
              lead={page.projectLead}
              projects={page.projects}
            />
          </>
        )}

        {page.showVideos && (
          <>
            <SectionDivider />
            <Videos
              customVideos={page.customVideos}
              channels={VIDEO_CHANNELS}
            />
          </>
        )}

        {page.showSkills && (
          <>
            <SectionDivider />
            <Skills title={page.skillsTitle} skillGroups={page.skillGroups} />
          </>
        )}

        <SectionDivider />

        <Contact contacts={page.contacts} cv={page.cv} />
      </main>

      <ChatBot />

      <footer className="site-footer" aria-label="Copyright">
        <p className="site-footer-copy">
          &copy; 2026 Lawrence Portfolio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default PortfolioPage;
