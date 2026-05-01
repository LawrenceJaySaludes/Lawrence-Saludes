import profilePic from "../assets/lawr-test.png";
import ElectricBorder from "./ui/ElectricBorder";
import DecryptedText from "./ui/DecryptedText";
import GradientText from "./ui/GradientText";
import ShinyText from "./ui/ShinyText";

const DEFAULT_PROFILE_FRAME_RADIUS = 10;
const DEFAULT_ROLE_TEXT = "Junior Full Stack Developer | Video Editor";
const LEGACY_ROLE_TEXT = "Junior Web Developer | React.js | Video Editor";

function TypingName({ text, isDark }) {
  const safeText = text || "Lawrence";
  const nameGradientColors = isDark
    ? ["#7DF9FF", "#B983FF", "#E5E7EB"]
    : ["#2F3A44", "#2916F5", "#5E51F7"];
  const greetingGradientColors = isDark
    ? ["#A5F3FC", "#C4B5FD", "#E2E8F0"]
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
            speed={120}
            className="hero-name-char"
            encryptedClassName="hero-name-encrypted"
          />
        </ShinyText>
      </h1>
    </>
  );
}

function Hero({ profile, dark = false }) {
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
    typeof profile?.details === "string" ? profile.details.trim() : "";
  const details =
    !rawDetails || rawDetails === LEGACY_ROLE_TEXT
      ? DEFAULT_ROLE_TEXT
      : rawDetails;
  const profileImageSrc =
    typeof profile?.profileImage === "string" && profile.profileImage.trim()
      ? profile.profileImage.trim()
      : profilePic;
  const usesDefaultProfileFrame = profileImageSrc === profilePic;
  const electricBorderColor = dark ? "#7df9ff" : "#4f46e5";
  const electricBorderStyle = dark
    ? undefined
    : {
        "--electric-light-mix": "white 10%",
        "--electric-glow-1-fade": "transparent 58%",
        "--electric-glow-2-fade": "transparent 50%",
        "--electric-glow-1-blur": "0.5px",
        "--electric-glow-2-blur": "2px",
        "--electric-background-glow-scale": "1.04",
        "--electric-background-glow-blur": "16px",
        "--electric-background-glow-opacity": "0.14",
      };
  const electricBorderRadius = usesDefaultProfileFrame
    ? DEFAULT_PROFILE_FRAME_RADIUS
    : 28;
  const electricBorderClassName = usesDefaultProfileFrame
    ? "hero-electric-border hero-electric-border--polaroid"
    : "hero-electric-border";

  return (
    <section id="home" className="hero reveal">
      <div className="hero-top-logo-wrap">
        <img src="/ls-logo-rbg.png" alt="LS logo" className="hero-top-logo" />
      </div>

      <div className="container hero-layout">
        <div className="hero-content">
          <TypingName key={displayName} text={displayName} isDark={dark} />

          <p className="hero-right show hero-role">{details}</p>

          <div className="hero-buttons hero-fade show">
            <a href="#projects" className="btn-solid hero-cta-btn">
              System Projects
            </a>
            <a href="#videos" className="btn-solid hero-cta-btn">
              Video Portfolio
            </a>
          </div>
        </div>

        <div className="hero-image-shell show">
          <ElectricBorder
            color={electricBorderColor}
            speed={1}
            chaos={0.12}
            thickness={2}
            borderRadius={electricBorderRadius}
            className={electricBorderClassName}
            style={electricBorderStyle}
          >
            <img src={profileImageSrc} alt={fullName} className="hero-image" />
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
}

export default Hero;
