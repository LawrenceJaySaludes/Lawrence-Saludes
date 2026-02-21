import profilePic from "../assets/lawr-prof.jpg";
import useScrollReveal from "../hooks/useScrollReveal";

function About() {
  useScrollReveal();

  return (
    <section id="about">
      <h2 className="section-title scroll-animate fade-up">
        About Myself
      </h2>

      <div className="container chat-wrapper">

        <div className="chat-row left scroll-animate slide-left delay-1">
          <img src={profilePic} alt="Lawrence" className="chat-avatar" />
          <div className="chat-bubble">
            I am a <strong>4th-year Information Technology student</strong> from
            <strong> Holy Cross of Davao College</strong>, specializing in building
            <strong> modern, responsive web applications</strong> using React.js,
            with solid experience in frontend development and system integration.
          </div>
        </div>

        {/* CHAT 2 — RIGHT */}
        <div className="chat-row right scroll-animate slide-right delay-2">
          <div className="chat-bubble">
            On the development side, I design, develop, and deploy web
            applications using <strong>React.js</strong>, with database integration
            through <strong>Supabase and SQL</strong>. I also build
            <strong> C# WinForms applications connected to SQL databases</strong>,
            implementing full CRUD functionality and efficient data handling.
          </div>
          <img src={profilePic} alt="Lawrence" className="chat-avatar" />
        </div>

        {/* CHAT 3 — LEFT */}
          <div className="chat-row left scroll-animate slide-left delay-3">
          <img src={profilePic} alt="Lawrence" className="chat-avatar" />
          <div className="chat-bubble">
            On the creative side, I have <strong>one year of professional experience </strong>
            as a <strong> video editor </strong> under Vast Professional, producing motion graphics,
            visual effects, and thumbnails using Adobe Premiere Pro, After Effects,
            and Canva.
          </div>
        </div>

        {/* CHAT 4 — RIGHT */}
        <div className="chat-row right scroll-animate slide-right delay-4">
          <div className="chat-bubble">
            
            Beyond technical skills, I am a <strong>strong problem solver </strong>
            who adapts quickly to <strong>new technologies and tools</strong>.
            I value clean code, continuous learning, and collaboration, and I am
            actively seeking opportunities where I can grow while delivering
            <strong> real-world, high-quality solutions</strong>.
          </div>
          <img src={profilePic} alt="Lawrence" className="chat-avatar" />
        </div>

      </div>
    </section>
  );
}

export default About;
