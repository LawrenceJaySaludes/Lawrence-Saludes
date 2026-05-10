import useScrollReveal from "../hooks/useScrollReveal";
import { FaReact, FaDocker } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { DiMsqlServer } from "react-icons/di";
import { RiSupabaseFill } from "react-icons/ri";
import { TbBrandCSharp } from "react-icons/tb";
import {
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiPhp,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiAdobephotoshop,
  SiCanva,
  SiGit,
  SiLaravel,
} from "react-icons/si";

function Skills() {
  useScrollReveal();
  const skillGroups = [
    {
      title: "Development Stack",
      className: "skills-card system",
      items: [
        { label: "React.js", icon: <FaReact />, color: "#61DAFB" },
        { label: "Next.js", icon: <SiNextdotjs />, color: "#111111" },
        { label: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
        { label: "JavaScript", icon: <IoLogoJavascript />, color: "#F7DF1E" },
        { label: "React Native", icon: <SiReact />, color: "#61DAFB" },
        { label: "PHP", icon: <SiPhp />, color: "#777BB4" },
        { label: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
        { label: "Git", icon: <SiGit />, color: "#F05032" },
        { label: "C# WinForms App", icon: <TbBrandCSharp />, color: "#9B4DCA" },
        { label: "SQL Database", icon: <DiMsqlServer />, color: "#0078D4" },
        { label: "Supabase", icon: <RiSupabaseFill />, color: "#3ECF8E" },
        { label: "Docker", icon: <FaDocker />, color: "#2496ED" },
      ],
    },
    {
      title: "Creative Suite",
      className: "skills-card creative",
      items: [
        { label: "Adobe Premiere Pro", icon: <SiAdobepremierepro />, color: "#9999FF" },
        { label: "Adobe After Effects", icon: <SiAdobeaftereffects />, color: "#D291FF" },
        { label: "Adobe Photoshop", icon: <SiAdobephotoshop />, color: "#31A8FF" },
        { label: "Canva", icon: <SiCanva />, color: "#00C4CC" },
      ],
    },
  ];

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title scroll-animate fade-up">
          Skills
        </h2>

        <div className="skills-layout">
          {skillGroups.map((group, index) => (
            <div
              key={group.title}
              className={`${group.className} scroll-animate fade-up delay-${index + 1}`}
            >
              <h3 className="skills-card-title">{group.title}</h3>
              <div className="skills-chip-grid">
                {group.items.map((skill) => (
                  <div className="skills-chip" key={skill.label}>
                    <span className="skills-chip-icon" style={{ color: skill.color }}>
                      {skill.icon}
                    </span>
                    <span className="skills-chip-label">{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
