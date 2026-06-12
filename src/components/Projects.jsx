import Gallery6 from "./blocks/gallery6";
import clinical1 from "../assets/clinical-samp1.png";
import clinical2 from "../assets/clinical-samp2.png";
import clinical3 from "../assets/clinical-samp3.png";
import clinical4 from "../assets/clinical-samp4.png";
import billing1 from "../assets/billing-samp1.png";
import billing2 from "../assets/billing-samp2.png";
import billing3 from "../assets/billing-samp3.png";
import billing4 from "../assets/billing-samp4.png";
import davcomThumb from "../assets/davcom.png";
import pickneatThumb from "../assets/pickneatweb.png";
import flowlyThumb from "../assets/flowly.png";
import safeshoreThumb from "../assets/safeshore.png";
import moodThumb from "../assets/mood.png";
import databasyThumb from "../assets/databasy.png";
import mentalHealthThumb from "../assets/mentalhealth.png";

const DEFAULT_PROJECTS = [
  {
    id: "default-project-0",
    category: "Website",
    title: "DavCom Guide",
    description:
      "A full-stack commute navigation app for Davao City that helps users find jeepney and Interim Bus routes, view routes on an interactive map, and discover nearby public transportation.",
    stack: "Next.js | Laravel | PostgreSQL | Docker | Leaflet",
    liveLink: "https://davcom-guide.vercel.app",
    repoLink: "https://github.com/LawrenceJaySaludes/davcom-guide.git",
    image: davcomThumb,
  },
  {
    id: "default-project-1",
    category: "Website",
    title: "PickN'Eat",
    description:
      "Food decision web application with authentication and full CRUD functionality.",
    stack: "React.js | Supabase | Vercel",
    liveLink: "https://pickneat-azure.vercel.app",
    repoLink: "https://github.com/LawrenceJaySaludes/pickneat",
    image: pickneatThumb,
  },
  {
    id: "default-project-2",
    category: "Website",
    title: "Mood Tracker",
    description:
      "A mood tracking web application that allows users to log emotions and reflections with database persistence.",
    stack: "React.js | Supabase | Vercel",
    liveLink: "https://mood-tracker-shiella.vercel.app",
    repoLink: "https://github.com/LawrenceJaySaludes/mood-tracker-shiella",
    image: moodThumb,
  },
  {
    id: "default-project-3",
    category: "Website",
    title: "SafeShore",
    description:
      "Capstone IoT-based water quality monitoring system that displays real-time sensor data through a web dashboard.",
    stack: "React.js | IoT Sensors | Supabase | Vercel",
    liveLink: "https://safeshore9.vercel.app/visitor",
    repoLink: "https://github.com/Pelyn9/aquacheck.git",
    image: safeshoreThumb,
  },
  {
    id: "default-project-6",
    category: "Website",
    title: "Flowly",
    description:
      "PWA personal finance tracker for monitoring income and expenses in a real-time dashboard.",
    stack: "React.js | Supabase | Vercel",
    liveLink: "https://flowlyfinance.vercel.app",
    repoLink: "https://github.com/LawrenceJaySaludes/Flowly.git",
    image: flowlyThumb,
  },
  {
    id: "default-project-7",
    category: "Website",
    title: "Mental Health Matters",
    description:
      "A mental health awareness platform with AI support, educational resources, and guidance for managing stress, anxiety, and depression, with links to professional help when needed.",
    stack: "React.js | Node.js | Vercel",
    liveLink: "https://mental-health-matters-bice.vercel.app/",
    image: mentalHealthThumb,
  },
  {
    id: "default-project-4",
    category: "Desktop App",
    title: "Clinical Appointment System",
    description:
      "Desktop-based clinical appointment management system with patient records and scheduling.",
    stack: "C# WinForms | SQL Server | Visual Studio",
    repoLink:
      "https://github.com/LawrenceJaySaludes/clinical-appointment.git",
    repoLabel: "GitHub Repository",
    image: clinical1,
    screenshots: [clinical1, clinical2, clinical3, clinical4],
  },
  {
    id: "default-project-5",
    category: "Desktop App",
    title: "Billing Receipt for PickN'Eat",
    description:
      "Desktop billing and receipt generation system built for PickN'Eat with database-driven transaction records.",
    stack: "C# WinForms | SQL Server | Visual Studio",
    repoLink:
      "https://github.com/LawrenceJaySaludes/Billing-Receipt-for-Pick-N-Eat.git",
    repoLabel: "GitHub Repository",
    image: billing1,
    screenshots: [billing1, billing2, billing3, billing4],
  },
  {
    id: "default-project-8",
    category: "Team Collab Project",
    title: "DATABASY",
    description:
      "DATABASY offers beautiful, clean WEBSITES that are incredibly quick & easy to build and maintain. Alongside an affordable and super intuitive CRM that hones your sales, operations, and communications, imagine an inbox on steroids and you're close. With a simple half-price solution that agencies love, DATABASY has everything you need.",
    stack: "CRM | PHP | Laravel | Docker",
    liveLink: "https://databasy.io/",
    image: databasyThumb,
  },
];

function Projects({
  customProjects = [],
  projects: explicitProjects,
  title = "Website & Desktop Projects",
  lead = "A selection of web and desktop builds focused on usable interfaces, solid system logic, and practical real-world workflows.",
}) {
  const resolvedProjects =
    Array.isArray(explicitProjects) && explicitProjects.length > 0
      ? explicitProjects
      : [...DEFAULT_PROJECTS, ...(Array.isArray(customProjects) ? customProjects : [])];

  const items = resolvedProjects.map((project, index) => {
    const image =
      project.image ||
      project.thumbnail ||
      project.screenshots?.[0] ||
      "/port-thumb.png";
    const isDesktop =
      typeof project.category === "string" &&
      project.category.toLowerCase().includes("desktop");
    const url = isDesktop
      ? project.repoLink || project.liveLink || "#"
      : project.liveLink || project.repoLink || "#";
    const linkLabel = isDesktop
      ? "View GitHub"
      : project.liveLabel || "View Live";

    return {
      id: project.id || `project-${index}`,
      title: project.title || "Untitled Project",
      summary: project.description || project.summary || "",
      stack: project.stack || "",
      url,
      linkLabel,
      isDesktop,
      previewImages: Array.isArray(project.screenshots)
        ? project.screenshots
        : [],
      image,
    };
  });

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title scroll-animate fade-up">{title}</h2>
      <p className="section-lead scroll-animate fade-up delay-1">{lead}</p>

      <Gallery6 items={items} />
    </section>
  );
}

export default Projects;
