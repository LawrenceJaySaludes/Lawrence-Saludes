import { useCallback, useEffect, useRef } from "react";
import profilePic from "../assets/lawr-test.png";
import ElectricBorder from "./ui/ElectricBorder";
import DecryptedText from "./ui/DecryptedText";
import GradientText from "./ui/GradientText";

const NAME_TRIPLE_CLICK_SOUND = "/neon-go-go-go.mp3";
const IMAGE_TRIPLE_CLICK_SOUND = "/fahhhhhhhhhhhhhh.mp3";
const TRIPLE_CLICK_WINDOW_MS = 850;

function useTripleClickSound(soundPath) {
  const audioRef = useRef(null);
  const clickCountRef = useRef(0);
  const clickResetTimerRef = useRef(null);
  const isSoundPlayingRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(soundPath);
    audio.preload = "auto";

    const handleAudioEnded = () => {
      isSoundPlayingRef.current = false;
    };

    audio.addEventListener("ended", handleAudioEnded);
    audioRef.current = audio;

    return () => {
      if (clickResetTimerRef.current) {
        window.clearTimeout(clickResetTimerRef.current);
      }

      audio.pause();
      audio.removeEventListener("ended", handleAudioEnded);
      audioRef.current = null;
    };
  }, [soundPath]);

  return useCallback(() => {
    if (isSoundPlayingRef.current) {
      return;
    }

    clickCountRef.current += 1;

    if (clickResetTimerRef.current) {
      window.clearTimeout(clickResetTimerRef.current);
    }

    clickResetTimerRef.current = window.setTimeout(() => {
      clickCountRef.current = 0;
      clickResetTimerRef.current = null;
    }, TRIPLE_CLICK_WINDOW_MS);

    if (clickCountRef.current < 3) {
      return;
    }

    clickCountRef.current = 0;
    window.clearTimeout(clickResetTimerRef.current);
    clickResetTimerRef.current = null;

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    isSoundPlayingRef.current = true;
    audio.currentTime = 0;
    const playResult = audio.play();

    if (playResult && typeof playResult.catch === "function") {
      playResult.catch(() => {
        isSoundPlayingRef.current = false;
      });
    }
  }, []);
}

function TypingName({ text, onNameClick, isDark }) {
  const safeText = text || "Lawrence";
  const nameGradientColors = isDark
    ? ["#7DF9FF", "#B983FF", "#E5E7EB"]
    : ["#2F3A44", "#2916F5", "#5E51F7"];
  const greetingGradientColors = isDark
    ? ["#A5F3FC", "#C4B5FD", "#E2E8F0"]
    : ["#334155", "#3730A3", "#4F46E5"];

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

      <h1 className="hero-name hero-name-interactive" onClick={onNameClick}>
        <GradientText
          colors={nameGradientColors}
          animationSpeed={8}
          showBorder={false}
          className="hero-name-gradient"
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
        </GradientText>
      </h1>
    </>
  );
}

function Hero({ profile, dark = false }) {
  const fullName = profile?.fullName || "Lawrence";
  const displayName =
    fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean)[0] || "Lawrence";
  const address = profile?.address || "Davao City, Philippines";
  const birthday = profile?.birthday || "January 29, 2004";
  const details =
    profile?.details || "Junior Web Developer | React.js | Video Editor";
  const profileImageSrc =
    typeof profile?.profileImage === "string" && profile.profileImage.trim()
      ? profile.profileImage.trim()
      : profilePic;

  const playNameTripleClickSound = useTripleClickSound(NAME_TRIPLE_CLICK_SOUND);
  const playImageTripleClickSound = useTripleClickSound(IMAGE_TRIPLE_CLICK_SOUND);

  return (
    <section id="home" className="hero reveal">
      <div className="container hero-layout">
        <div className="hero-content">
          <TypingName
            key={displayName}
            text={displayName}
            onNameClick={playNameTripleClickSound}
            isDark={dark}
          />

          <div className="hero-meta hero-left show">
            <div className="hero-detail-pill">
              <span className="hero-detail-label">Address</span>
              <span className="hero-detail-value">{address}</span>
            </div>
            <div className="hero-detail-pill">
              <span className="hero-detail-label">Birthday</span>
              <span className="hero-detail-value">{birthday}</span>
            </div>
          </div>

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
            color="#7df9ff"
            speed={1}
            chaos={0.12}
            thickness={2}
            borderRadius={28}
            className="hero-electric-border"
          >
            <img
              src={profileImageSrc}
              alt={fullName}
              className="hero-image hero-image-interactive"
              onClick={playImageTripleClickSound}
            />
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
}

export default Hero;
