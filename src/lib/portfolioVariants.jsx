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
  SiAdobepremierepro,
  SiAdobeaftereffects,
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

export const HOME_ABOUT_BUBBLES = [
  "I am a 4th-year Information Technology student from Holy Cross of Davao College, specializing in building modern, responsive web applications using React.js, with solid experience in frontend development and system integration.",
  "On the development side, I design, develop, and deploy web applications using React.js, with database integration through Supabase and SQL. I also build C# WinForms applications connected to SQL databases, implementing full CRUD functionality and efficient data handling.",
  "On the creative side, I have one year of professional experience as a video editor under Vast Professional, producing motion graphics, visual effects, and thumbnails using Adobe Premiere Pro, After Effects, and Canva.",
  "Beyond technical skills, I am a strong problem solver who adapts quickly to new technologies and tools. I value clean code, continuous learning, and collaboration, and I am actively seeking opportunities where I can grow while delivering real-world, high-quality solutions.",
];

export const DEVELOPER_ABOUT_BUBBLES = [
  "I am a Bachelor of Science in Information Technology graduate from Holy Cross of Davao College with hands-on experience developing modern web applications and full stack systems. I specialize in building responsive and user-friendly interfaces using React.js and Next.js.",
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
    id: "default-project-9",
    category: "Website",
    title: "ShortList",
    description:
      "ShortList \u2014 An AI-powered resume analyzer that compares resumes against job descriptions, calculates ATS compatibility scores, identifies missing skills and keywords, provides recruiter-style feedback, and generates AI-enhanced resume recommendations to improve job application success rates.",
    stack: "Next.js | TypeScript | Tailwind CSS | Google Gemini AI | jsPDF",
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
    className: "skills-card system",
    items: [
      { label: "React.js", icon: <FaReact />, color: "#61DAFB" },
      { label: "Next.js", icon: <SiNextdotjs />, color: "#111111" },
      { label: "JavaScript", icon: <IoLogoJavascript />, color: "#F7DF1E" },
      { label: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38BDF8" },
    ],
  },
  {
    title: "Backend & Data",
    className: "skills-card creative",
    items: [
      { label: "Laravel", icon: <SiLaravel />, color: "#FF2D20" },
      { label: "PHP", icon: <SiPhp />, color: "#777BB4" },
      { label: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      { label: "Supabase", icon: <RiSupabaseFill />, color: "#3ECF8E" },
      { label: "MySQL", icon: <SiMysql />, color: "#4479A1" },
      { label: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { label: "API Integration", icon: <FaPhotoVideo />, color: "#4F46E5" },
      { label: "Deployment", icon: <MdOutlineVideocam />, color: "#6366F1" },
    ],
  },
  {
    title: "Tools",
    className: "skills-card system",
    items: [
      { label: "Docker", icon: <FaDocker />, color: "#2496ED" },
      { label: "Git", icon: <SiGit />, color: "#F05032" },
      { label: "Visual Studio Code", icon: <TbBrandVisualStudio />, color: "#007ACC" },
      { label: "C# WinForms", icon: <TbBrandCSharp />, color: "#9B4DCA" },
      { label: "SQL Server", icon: <DiMsqlServer />, color: "#0078D4" },
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
    className: "skills-card creative",
    items: [
      { label: "Adobe Premiere Pro", icon: <SiAdobepremierepro />, color: "#9999FF" },
      { label: "Adobe After Effects", icon: <SiAdobeaftereffects />, color: "#D291FF" },
      { label: "Canva Pro", icon: <SiCanva />, color: "#00C4CC" },
      { label: "CapCut", icon: <FaCut />, color: "#FFFFFF" },
    ],
  },
  {
    title: "Creative Skills",
    className: "skills-card system",
    items: [
      { label: "Motion Graphics", icon: <MdOutlineSlowMotionVideo />, color: "#A78BFA" },
      { label: "Storytelling", icon: <FaFilm />, color: "#F472B6" },
      { label: "Sound Design", icon: <MdOutlineGraphicEq />, color: "#60A5FA" },
      { label: "Pacing", icon: <FaPhotoVideo />, color: "#34D399" },
      { label: "Short-form Editing", icon: <FaFilm />, color: "#FBBF24" },
      { label: "Long-form Editing", icon: <FaFilm />, color: "#FB7185" },
      { label: "Thumbnails", icon: <FaRegImage />, color: "#FDE047" },
      { label: "Reels", icon: <FaYoutube />, color: "#EF4444" },
      { label: "YouTube Content", icon: <FaYoutube />, color: "#FF0000" },
    ],
  },
];
