import { FaDocker, FaFilm, FaPhotoVideo, FaReact, FaYoutube, FaCut, FaHome, FaCode, FaPlay } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import { DiMsqlServer } from "react-icons/di";
import { RiSupabaseFill } from "react-icons/ri";
import { TbBrandCSharp, TbBrandVisualStudio } from "react-icons/tb";
import {
  SiNextdotjs,
  SiPhp,
  SiTailwindcss,
  SiGit,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiNodedotjs,
  SiReact,
  SiHtml5,
  SiVuedotjs,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiAdobephotoshop,
  SiCanva,
} from "react-icons/si";
import { MdOutlineGraphicEq, MdOutlineSlowMotionVideo, MdOutlineVideocam } from "react-icons/md";

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
import clinical1 from "../assets/clinical-samp1.png";
import clinical2 from "../assets/clinical-samp2.png";
import clinical3 from "../assets/clinical-samp3.png";
import clinical4 from "../assets/clinical-samp4.png";
import billing1 from "../assets/billing-samp1.png";
import billing2 from "../assets/billing-samp2.png";
import billing3 from "../assets/billing-samp3.png";
import billing4 from "../assets/billing-samp4.png";

import cert1 from "../assets/cert1.jpg";
import cert2 from "../assets/cert2.png";
import cert3 from "../assets/cert3.jpg";
import travelPug from "../assets/travelpug.jpg";
import waterLemon from "../assets/waterlemon.jpg";
import etcLogo from "../assets/etc.jpg";
import businessBoss from "../assets/businessboss.jpg";
import landOfTomorrow from "../assets/lot.jpg";
import keithHothe from "../assets/keith hothe$.jpg";

function createSkillItem(id, name, designation, icon, color) {
  return { id, name, designation, icon, color };
}

export const HOME_ABOUT_BUBBLES = [
  "I am a 4th-year Information Technology student from Holy Cross of Davao College, specializing in building modern, responsive web applications using React.js, with solid experience in frontend development and system integration.",
  "On the development side, I design, develop, and deploy web applications using React.js, with database integration through Supabase and SQL. I also build C# WinForms applications connected to SQL databases, implementing full CRUD functionality and efficient data handling.",
  "On the creative side, I have one year of professional experience as a video editor under Vast Professional, producing motion graphics, visual effects, and thumbnails using Adobe Premiere Pro, After Effects, and Canva.",
  "Beyond technical skills, I am a strong problem solver who adapts quickly to new technologies and tools. I value clean code, continuous learning, and collaboration, and I am actively seeking opportunities where I can grow while delivering real-world, high-quality solutions.",
];

export const DEVELOPER_ABOUT_BUBBLES = [
  "I am a Bachelor of Science in Information Technology graduate from Holy Cross of Davao College with hands-on experience developing modern web applications, mobile apps, and full stack systems. I specialize in building responsive and user-friendly interfaces using React.js, React Native, and Next.js.",
  "Through my experience at INFOSOFT, I gained practical exposure to frontend-backend integration, API connectivity, debugging, Git/GitHub workflows, Docker-based environments, deployment processes, and modern software development practices.",
  "My technical stack includes React.js, Next.js, Laravel, PHP, JavaScript, MySQL, Supabase, Docker, Git/GitHub, REST APIs, Google API integration, and AI-assisted development tools that help improve productivity and development efficiency.",
  "I am a fast learner with strong problem-solving skills, focused on building clean, scalable, and maintainable applications. I am seeking opportunities as a Junior Full Stack Developer where I can contribute to real-world projects while continuously growing my technical expertise.",
];

export const VIDEO_ABOUT_BUBBLES = [
  "I have over 2 years of professional video editing experience with Vast Professionals, creating engaging content for various platforms and audiences.",
  "I specialize in both short-form and long-form content, including YouTube videos, reels, social media content, and AI-generated shorts designed to maximize audience engagement.",
  "My primary editing tools are Adobe Premiere Pro and Adobe After Effects, where I create clean edits, smooth transitions, motion graphics, and visually appealing storytelling sequences.",
  "I focus on strong pacing, viewer retention, and continuous improvement, ensuring every video delivers a polished and professional viewing experience from start to finish.",
];

export const HOME_HERO_CTA_BUTTONS = [
  { label: "Full Stack Developer", href: "/developer", isRoute: true },
  { label: "Video Editor", href: "/video-editor", isRoute: true },
];

export const HOME_SKILL_GROUPS = [
  {
    title: "Full Stack Development",
    items: [
      createSkillItem("home-fullstack-react", "React.js", "Frontend", <FaReact />, "#61DAFB"),
      createSkillItem("home-fullstack-next", "Next.js", "Frontend", <SiNextdotjs />, "#111111"),
      createSkillItem("home-fullstack-node", "Node.js", "Backend", <SiNodedotjs />, "#339933"),
      createSkillItem("home-fullstack-js", "JavaScript", "Core Language", <IoLogoJavascript />, "#F7DF1E"),
      createSkillItem("home-fullstack-react-native", "React Native", "Mobile", <SiReact />, "#61DAFB"),
      createSkillItem("home-fullstack-vue", "Vue", "Frontend", <SiVuedotjs />, "#4FC08D"),
      createSkillItem("home-fullstack-html", "HTML", "Markup", <SiHtml5 />, "#E34F26"),
      createSkillItem("home-fullstack-php", "PHP", "Backend", <SiPhp />, "#777BB4"),
      createSkillItem("home-fullstack-laravel", "Laravel", "Backend", <SiLaravel />, "#FF2D20"),
      createSkillItem("home-fullstack-git", "Git", "Workflow", <SiGit />, "#F05032"),
      createSkillItem("home-fullstack-csharp", "C# WinForms", "Desktop", <TbBrandCSharp />, "#9B4DCA"),
      createSkillItem("home-fullstack-sql", "SQL Database", "Database", <DiMsqlServer />, "#0078D4"),
      createSkillItem("home-fullstack-supabase", "Supabase", "Backend", <RiSupabaseFill />, "#3ECF8E"),
      createSkillItem("home-fullstack-docker", "Docker", "Deployment", <FaDocker />, "#2496ED"),
    ],
  },
  {
    title: "Video Editing",
    items: [
      createSkillItem(
        "home-video-premiere",
        "Premiere Pro",
        "Editing",
        <SiAdobepremierepro />,
        "#9999FF"
      ),
      createSkillItem(
        "home-video-aftereffects",
        "After Effects",
        "Motion Graphics",
        <SiAdobeaftereffects />,
        "#D291FF"
      ),
      createSkillItem(
        "home-video-photoshop",
        "Photoshop",
        "Thumbnails",
        <SiAdobephotoshop />,
        "#31A8FF"
      ),
      createSkillItem("home-video-canva", "Canva", "Graphics", <SiCanva />, "#00C4CC"),
    ],
  },
];

export const DEVELOPER_CTA_BUTTONS = [
  { label: "Home", href: "/", isRoute: true, icon: <FaHome /> },
  { label: "Projects", href: "#projects", isRoute: false, icon: <FaCode /> },
];

export const VIDEO_CTA_BUTTONS = [
  { label: "Home", href: "/", isRoute: true, icon: <FaHome /> },
  { label: "Videos", href: "#videos", isRoute: false, icon: <FaPlay /> },
];

export const DEVELOPER_HERO_DETAILS =
  "Full Stack Software Developer";

export const VIDEO_HERO_DETAILS =
  "Video Editor | Motion Graphics";

export const DEVELOPER_PROJECTS = [
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

export const DEVELOPER_CERTIFICATES = [
  { id: "developer-cert-1", title: "IT Certificate 1", image: cert1 },
  { id: "developer-cert-2", title: "IT Certificate 2", image: cert3 },
  { id: "developer-cert-3", title: "IT Certificate 3", image: cert2 },
];

export const DEVELOPER_SKILL_GROUPS = [
  {
    title: "Frontend",
    items: [
      createSkillItem("developer-frontend-react", "React.js", "Frontend", <FaReact />, "#61DAFB"),
      createSkillItem("developer-frontend-next", "Next.js", "Frontend", <SiNextdotjs />, "#111111"),
      createSkillItem("developer-frontend-js", "JavaScript", "Core Language", <IoLogoJavascript />, "#F7DF1E"),
      createSkillItem("developer-frontend-tailwind", "Tailwind CSS", "Styling", <SiTailwindcss />, "#38BDF8"),
      createSkillItem("developer-frontend-react-native", "React Native", "Mobile", <SiReact />, "#61DAFB"),
      createSkillItem("developer-frontend-vue", "Vue", "Frontend", <SiVuedotjs />, "#4FC08D"),
      createSkillItem("developer-frontend-html", "HTML", "Markup", <SiHtml5 />, "#E34F26"),
    ],
  },
  {
    title: "Backend & Data",
    items: [
      createSkillItem("developer-backend-laravel", "Laravel", "Backend", <SiLaravel />, "#FF2D20"),
      createSkillItem("developer-backend-php", "PHP", "Backend", <SiPhp />, "#777BB4"),
      createSkillItem("developer-backend-node", "Node.js", "Backend", <SiNodedotjs />, "#339933"),
      createSkillItem("developer-backend-supabase", "Supabase", "Backend", <RiSupabaseFill />, "#3ECF8E"),
      createSkillItem("developer-backend-mysql", "MySQL", "Database", <SiMysql />, "#4479A1"),
      createSkillItem("developer-backend-postgres", "PostgreSQL", "Database", <SiPostgresql />, "#336791"),
      createSkillItem("developer-backend-api", "API Integration", "Integration", <FaPhotoVideo />, "#4F46E5"),
      createSkillItem("developer-backend-deployment", "Deployment", "Release", <MdOutlineVideocam />, "#6366F1"),
    ],
  },
  {
    title: "Tools",
    items: [
      createSkillItem("developer-tools-docker", "Docker", "DevOps", <FaDocker />, "#2496ED"),
      createSkillItem("developer-tools-git", "Git", "Workflow", <SiGit />, "#F05032"),
      createSkillItem("developer-tools-vscode", "Visual Studio Code", "IDE", <TbBrandVisualStudio />, "#007ACC"),
      createSkillItem("developer-tools-csharp", "C# WinForms", "Desktop", <TbBrandCSharp />, "#9B4DCA"),
      createSkillItem("developer-tools-sqlserver", "SQL Server", "Database", <DiMsqlServer />, "#0078D4"),
    ],
  },
];

export const VIDEO_CHANNELS = [
  {
    id: "channel-1",
    img: travelPug,
    name: "Travel Pug",
    link: "https://youtube.com/@thetravelpug?si=faCyVSJq9gSJCOlt",
    videos: ["yaLGxNYG0Vw", "ilkho_sbzB0", "JzWn8Q2MGrs", "QF0XtHc2cNE", "ZHTkyEMsI1E", "NBmRgY5uT0E", "F3Lv1E54S2I", "GgaX-BuFE4E"],
  },
  {
    id: "channel-2",
    img: waterLemon,
    name: "Water Lemon",
    link: "https://youtube.com/@waterlemon385?si=YU-z7pMXb_GNrGJl",
    videos: ["uW00lirAzYE", "S18rwgXgMXo", "hCSsXzkHtH4", "3NZREsdzZv4", "AS6cx4sFWig", "0KgQe0RkJjY", "f5FNEOuJ1x8", "sNeA_t4tDRA"],
  },
  {
    id: "channel-3",
    img: etcLogo,
    name: "Elite Trade Club",
    link: "https://youtube.com/@elitetradeclub?si=KAcSrmi4nC6bZWRb",
    videos: ["XRMyOUGtp7w", "5LthR1yhJZk", "MMe6u7gmv5Y", "sUZEULQyod8", "Lky9MVpr2TQ", "2phHZcbadsk"],
  },
  {
    id: "channel-4",
    img: businessBoss,
    name: "Business Boss",
    link: "https://youtube.com/@businessboss3156?si=aTOL8JlRQBD97pHG",
    videos: ["PENSiHquies", "QN5ge3URDZg", "qZVN7dt4L7w", "FtTDEnMhvXU", "gerqxl9ksSI", "H_vFLPkw1YU"],
  },
  {
    id: "channel-5",
    img: landOfTomorrow,
    name: "Land of Tomorrow",
    link: "https://youtube.com/@landoftomorrow?si=RtU5bgPy3F_Me7PE",
    videos: ["EmnypsWnEHI", "lytbqNoQxLE", "RRnfs9GT2Ko", "ZoFJ8xwZwsA"],
  },
  {
    id: "channel-6",
    img: keithHothe,
    name: "Keith Hothe$",
    link: "https://www.youtube.com/@KeithHothes/shorts",
    videos: [],
  },
];

export const VIDEO_SKILL_GROUPS = [
  {
    title: "Editing Tools",
    items: [
      createSkillItem("video-tools-premiere", "Adobe Premiere Pro", "Editing", <SiAdobepremierepro />, "#9999FF"),
      createSkillItem("video-tools-aftereffects", "Adobe After Effects", "Motion Graphics", <SiAdobeaftereffects />, "#D291FF"),
      createSkillItem("video-tools-canva", "Canva Pro", "Design", <SiCanva />, "#00C4CC"),
      createSkillItem("video-tools-capcut", "CapCut", "Editing", <FaCut />, "#FFFFFF"),
    ],
  },
  {
    title: "Creative Skills",
    items: [
      createSkillItem("video-skills-motion", "Motion Graphics", "Animation", <MdOutlineSlowMotionVideo />, "#A78BFA"),
      createSkillItem("video-skills-storytelling", "Storytelling", "Narrative", <FaFilm />, "#F472B6"),
      createSkillItem("video-skills-sound", "Sound Design", "Audio", <MdOutlineGraphicEq />, "#60A5FA"),
      createSkillItem("video-skills-pacing", "Pacing", "Retention", <FaPhotoVideo />, "#34D399"),
      createSkillItem("video-skills-shortform", "Short-form Editing", "Social", <FaFilm />, "#FBBF24"),
      createSkillItem("video-skills-longform", "Long-form Editing", "YouTube", <FaFilm />, "#FB7185"),
      createSkillItem("video-skills-thumbnails", "Thumbnails", "Packaging", <FaRegImage />, "#FDE047"),
      createSkillItem("video-skills-reels", "Reels", "Shorts", <FaYoutube />, "#EF4444"),
      createSkillItem("video-skills-youtube", "YouTube Content", "Channels", <FaYoutube />, "#FF0000"),
    ],
  },
];
