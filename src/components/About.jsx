import profilePic from "../assets/lawr-prof.jpg";
import useScrollReveal from "../hooks/useScrollReveal";

const DEFAULT_ABOUT_BUBBLES = [
  "I am a 4th-year Information Technology student from Holy Cross of Davao College, specializing in building modern, responsive web applications using React.js, with solid experience in frontend development and system integration.",
  "On the development side, I design, develop, and deploy web applications using React.js, with database integration through Supabase and SQL. I also build C# WinForms applications connected to SQL databases, implementing full CRUD functionality and efficient data handling.",
  "On the creative side, I have one year of professional experience as a video editor under Vast Professional, producing motion graphics, visual effects, and thumbnails using Adobe Premiere Pro, After Effects, and Canva.",
  "Beyond technical skills, I am a strong problem solver who adapts quickly to new technologies and tools. I value clean code, continuous learning, and collaboration, and I am actively seeking opportunities where I can grow while delivering real-world, high-quality solutions.",
];

function About({ aboutBubbles = DEFAULT_ABOUT_BUBBLES, profileImage = "" }) {
  useScrollReveal();
  const avatarSrc =
    typeof profileImage === "string" && profileImage.trim()
      ? profileImage.trim()
      : profilePic;

  const resolvedBubbles = DEFAULT_ABOUT_BUBBLES.map((fallbackText, index) => {
    const bubbleText = aboutBubbles[index];
    return typeof bubbleText === "string" ? bubbleText : fallbackText;
  });

  const visibleBubbles = resolvedBubbles
    .map((text) => text.trim())
    .filter(Boolean);

  return (
    <section id="about">
      <h2 className="section-title scroll-animate fade-up">About Myself</h2>

      <div className="container chat-wrapper">
        {visibleBubbles.map((bubbleText, index) => {
          const isRight = index % 2 === 1;
          const sideClassName = isRight ? "right" : "left";
          const slideClassName = isRight ? "slide-right" : "slide-left";
          const delayClassName = `delay-${Math.min(index + 1, 4)}`;

          return (
            <div
              key={`about-bubble-${index}`}
              className={`chat-row ${sideClassName} scroll-animate ${slideClassName} ${delayClassName}`}
            >
              {!isRight && (
                <img src={avatarSrc} alt="Lawrence" className="chat-avatar" />
              )}

              <div className="chat-bubble about-chat-bubble">{bubbleText}</div>

              {isRight && (
                <img src={avatarSrc} alt="Lawrence" className="chat-avatar" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default About;
