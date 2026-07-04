import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import DecryptedText from "./ui/DecryptedText";
import GradientText from "./ui/GradientText";
import GlareCard from "./ui/GlareCard";
import ShinyText from "./ui/ShinyText";

const DEFAULT_PROFILE_FRAME_RADIUS = 10;
const DEFAULT_ROLE_TEXT = "Full Stack Developer | Video Editor";
const LEGACY_ROLE_TEXTS = new Set([
  "Junior Web Developer | React.js | Video Editor",
  "Junior Full Stack Developer | Video Editor",
]);
const FALLBACK_CTA_BUTTONS = [
  {
    label: "Projects",
    href: "#projects",
    isRoute: false,
  },
  {
    label: "Video Portfolio",
    href: "#videos",
    isRoute: false,
  },
];

function TypingName({ text, isDark }) {
  const safeText = text || "Lawrence";
  const nameGradientColors = isDark
    ? ["#D10000", "#FF3B3B", "#FFD0D0"]
    : ["#2F3A44", "#2916F5", "#5E51F7"];
  const greetingGradientColors = isDark
    ? ["#D10000", "#FF6B6B", "#FFFFFF"]
    : ["#334155", "#3730A3", "#4F46E5"];
  const nameShineColor = isDark
    ? "rgba(255, 255, 255, 0.95)"
    : "rgba(255, 255, 255, 0.9)";

  return (
    <>
      <p className="hero-greeting">
        <GradientText
          colors={greetingGradientColors}
          animationSpeed={8}
          showBorder={false}
          className="hero-greeting-gradient"
        >
          <DecryptedText
            text="Hi I'm"
            animateOn="view"
            sequential
            revealDirection="start"
            speed={150}
            className="hero-greeting-char"
            encryptedClassName="hero-greeting-encrypted"
          />
        </GradientText>
      </p>

      <h1 className="hero-name">
        <ShinyText
          speed={3.2}
          colors={nameGradientColors}
          shineColor={nameShineColor}
          spread={112}
          yoyo
          delay={0.4}
          className="hero-name-shiny"
        >
          <DecryptedText
            text={safeText}
            animateOn="view"
            sequential
            revealDirection="start"
            speed={190}
            className="hero-name-char"
            encryptedClassName="hero-name-encrypted"
          />
        </ShinyText>
      </h1>
    </>
  );
}

function Hero({ profile, dark = false, ctaButtons = [], navigateTo, details }) {
  const heroRef = useRef(null);
  const hasBeenVisibleRef = useRef(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);

  useEffect(() => {
    const heroElement = heroRef.current;

    if (!heroElement) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (isVisible && !hasBeenVisibleRef.current) {
          hasBeenVisibleRef.current = true;
          setAnimationCycle((prev) => prev + 1);
          setIsHeroVisible(true);
          return;
        }

        if (!isVisible && hasBeenVisibleRef.current) {
          hasBeenVisibleRef.current = false;
          setIsHeroVisible(false);
        }
      },
      {
        root: null,
        threshold: 0.45,
        rootMargin: "-8% 0px -12% 0px",
      }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const fullName =
    typeof profile?.fullName === "string" && profile.fullName.trim()
      ? profile.fullName
      : "Lawrence";
  const displayName =
    fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean)[0] || "Lawrence";
  const rawDetails =
    typeof details === "string"
      ? details.trim()
      : typeof profile?.details === "string"
        ? profile.details.trim()
        : "";
  const roleText =
    !rawDetails || LEGACY_ROLE_TEXTS.has(rawDetails)
      ? DEFAULT_ROLE_TEXT
      : rawDetails;
  const profileImageSrc =
    typeof profile?.profileImage === "string" && profile.profileImage.trim()
      ? profile.profileImage.trim()
      : "/mainprofile-gradpic.png";
  const resolvedCtaButtons =
    Array.isArray(ctaButtons) && ctaButtons.length > 0
      ? ctaButtons
      : FALLBACK_CTA_BUTTONS;

  const handleCtaClick = (button, event) => {
    const href = typeof button?.href === "string" ? button.href.trim() : "";

    if (!href) {
      return;
    }

    if (button?.isRoute) {
      event.preventDefault();
      if (typeof navigateTo === "function") {
        navigateTo(href);
        return;
      }

      window.location.assign(href);
      return;
    }

    if (href.startsWith("#")) {
      event.preventDefault();
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero reveal" ref={heroRef}>
      <div className="hero-top-logo-wrap">
        <img src="/ls-new-3d.png" alt="LS logo" className="hero-top-logo" />
      </div>

      <div className="container hero-layout">
        <div className="hero-content">
          <TypingName
            key={`${displayName}-${animationCycle}`}
            text={displayName}
            isDark={dark}
          />

          <p className={`hero-right hero-role${isHeroVisible ? " show" : ""}`}>
            {(() => {
              const parts = roleText.split("|").map(p => p.trim());
              return parts.length > 1 ? (
                <><span className="hero-role-line1">{parts[0]}</span><span className="hero-role-sep"> | </span><span className="hero-role-line2">{parts[1]}</span></>
              ) : (
                <span>{roleText}</span>
              );
            })()}
          </p>

          <div className={`hero-buttons hero-fade${isHeroVisible ? " show" : ""}`}>
            {resolvedCtaButtons.map((button) => {
              const href =
                typeof button?.href === "string" && button.href.trim()
                  ? button.href.trim()
                  : "#";

              return (
                <a
                  key={button.label}
                  href={href}
                  className="btn-solid hero-cta-btn"
                  onClick={(event) => handleCtaClick(button, event)}
                >
                  {button.icon && <span className="hero-cta-icon">{button.icon}</span>}
                  {button.label}
                </a>
              );
            })}
          </div>

          <div className="hero-socials">
            <a
              href="https://www.linkedin.com/in/lawrence-jay-saludes-4b112a298"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-linkedin"
            >
              <FontAwesomeIcon icon={faLinkedin} className="hero-linkedin-icon" />
              LinkedIn
            </a>

            <a
              href="https://v2.onlinejobs.ph/jobseekers/info/3050749"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-olj"
            >
              <img src="/olj-favicon.ico" alt="" className="hero-olj-icon" />
              OnlineJobs.ph
            </a>

            <a
              href="https://profile.indeed.com/?hl=en_PH&co=PH&from=gnav-jobseeker-profile--profile-one-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-indeed"
            >
              <img src="/indeed-favicon.ico" alt="" className="hero-indeed-icon" />
              Indeed
            </a>

            <a
              href="https://ph.jobstreet.com/profile/me"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-jobstreet"
            >
              <img src="/jobstreet-favicon.ico" alt="" className="hero-jobstreet-icon" />
              JobStreet
            </a>
          </div>
        </div>

        <div className={`hero-image-shell${isHeroVisible ? " show" : ""}`}>
          <GlareCard className="hero-glare-card">
            <img src={profileImageSrc} alt={fullName} className="hero-image" />
          </GlareCard>
        </div>
      </div>
    </section>
  );
}

export default Hero;
