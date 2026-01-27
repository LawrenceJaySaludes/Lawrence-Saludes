import { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Videos from "./components/Videos";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Certificates from "./components/Certificates";


function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark app-bg" : "app-bg"}>
      {/* DARK MODE TOGGLE */}
      <button
        onClick={() => setDark(!dark)}
        className="dark-toggle"
        title="Toggle dark mode"
      >
        {dark ? "☀️" : "🌙"}
      </button>

      <Hero />

      <div className="section-divider" />

      <About />

      <div className="section-divider" />

      <Certificates />

      <div className="section-divider" />

      <Projects />

      <div className="section-divider" />

      <Videos />

      <div className="section-divider" />

      <Skills />

      <div className="section-divider" />

      <Contact />
    </div>
  );
}

export default App;
