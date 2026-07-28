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
import shortlistThumb from "../assets/shortlist.png";
import stackrateThumb from "../assets/stackrate.png";
import stackratePreview1 from "../assets/sr1.png";
import stackratePreview2 from "../assets/sr2.png";
import lmsThumb from "../assets/lms.png";

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
    id: "default-project-stackrate",
    category: "Mobile App",
    title: "StackRate",
    description:
      "StackRate is a mobile app for developers, IT students, and career shifters to assess software stack proficiency, rate skills from 0-100%, track progress, and spot the skills needed for roles like Full Stack Developer, React Native Developer, or DevOps Engineer.",
    stack: "React Native | Expo | TypeScript | Supabase",
    liveLink:
      "https://github.com/LawrenceJaySaludes/stackrate-mobile/releases/tag/stackratev1",
    liveLabel: "Download App",
    repoLink: "https://github.com/LawrenceJaySaludes/stackrate-mobile",
    cardLink: "https://github.com/LawrenceJaySaludes/stackrate-mobile",
    actionLink:
      "https://github.com/LawrenceJaySaludes/stackrate-mobile/releases/tag/stackratev1",
    image: stackrateThumb,
    screenshots: [stackratePreview1, stackratePreview2],
  },
  {
    id: "default-project-lms",
    category: "Website",
    title: "Employee Leave Management",
    description:
      "A modern full-stack Employee Leave Management System built with React and Laravel REST API. The application provides secure authentication, role-based access control, employee management, leave request processing, approval workflows, dashboard analytics, and responsive UI/UX. Designed as a portfolio project to demonstrate full-stack development, API integration, and enterprise application architecture.",
    stack: "React (Vite) | Tailwind CSS | Axios | Laravel REST API | Sanctum | MySQL",
    liveLink: "https://leavemanagement-opal.vercel.app",
    repoLink:
      "https://github.com/LawrenceJaySaludes/employee-leave-management-backend",
    image: lmsThumb,
    infoTooltip:
      "This live demo showcases the frontend interface of the Employee Leave Management System.\n\nThe backend API is intentionally not deployed because this project is intended for portfolio demonstration and free hosting services do not provide sufficient resources for long-term backend hosting.\n\nSource code for both the frontend and backend is available on GitHub.",
  },
  {
    id: "default-project-1",
    category: "Website",
    title: "PickN'Eat",
    description:
      "A freelance food decision and management system developed for a client, featuring an Admin Dashboard, user authentication, food management, and full CRUD functionality with database integration.",
    stack: "React.js | Supabase | Vercel",
    liveLink: "https://pickneat-azure.vercel.app",
    repoLink: "https://github.com/LawrenceJaySaludes/pickneat",
    image: pickneatThumb,
  },
  {
    id: "default-project-9",
    category: "Website",
    title: "ShortList",
    description:
      "An AI-powered resume analyzer that compares resumes against job descriptions, calculates ATS compatibility scores, identifies missing skills and keywords, provides recruiter-style feedback, and generates AI-enhanced resume recommendations to improve job application success rates.",
    stack: "Next.js | TypeScript | Tailwind | Gemini AI | jsPDF",
    liveLink: "https://aishortlist.netlify.app/",
    repoLink: "https://github.com/LawrenceJaySaludes/shortlist",
    image: shortlistThumb,
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
    const cardUrl =
      project.cardLink ||
      (isDesktop
        ? project.repoLink || project.liveLink || "#"
        : project.liveLink || project.repoLink || "#");
    const actionUrl =
      project.actionLink ||
      project.liveLink ||
      project.repoLink ||
      "#";
    const linkLabel = isDesktop
      ? "View GitHub"
      : project.liveLabel || "View Live";

    return {
      id: project.id || `project-${index}`,
      title: project.title || "Untitled Project",
      summary: project.description || project.summary || "",
      stack: project.stack || "",
      url,
      cardUrl,
      actionUrl,
      linkLabel,
      isDesktop,
      previewImages: Array.isArray(project.screenshots)
        ? project.screenshots
        : [],
      image,
      infoTooltip: project.infoTooltip || "",
      repoLink: project.repoLink || "",
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
