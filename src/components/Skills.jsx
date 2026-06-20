import useScrollReveal from "../hooks/useScrollReveal";
import { HOME_SKILL_GROUPS } from "../lib/portfolioVariants";
import { AnimatedTooltip } from "./ui/AnimatedTooltip";

function Skills({ skillGroups: explicitSkillGroups, title = "Skills" }) {
  useScrollReveal();

  const skillGroups =
    Array.isArray(explicitSkillGroups) && explicitSkillGroups.length > 0
      ? explicitSkillGroups
      : HOME_SKILL_GROUPS;

  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title scroll-animate fade-up">{title}</h2>

      <div className="skills-stack">
        {skillGroups.map((group, index) => (
          <article
            key={group.title}
            className={`skills-group scroll-animate fade-up delay-${Math.min(
              index + 1,
              4
            )}`}
          >
            <div className="skills-group-title-wrap">
              <h3 className="skills-group-title">
                <span className="skills-group-title-text">{group.title}</span>
              </h3>
            </div>

            <AnimatedTooltip items={group.items} className="skills-tooltip-row" />
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;
