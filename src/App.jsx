import React from "react";
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import CorkBoard from "./components/CorkBoard.jsx";
import About from "./components/About.jsx";
import WorldGame from "./components/WorldGame.jsx";
import Contact from "./components/Contact.jsx";
import CursorTrail from "./components/CursorTrail.jsx";
import projectItems from "./components/ProjectItems.js";

export default function App() {
  return (
    <div className="App texture-overlay">
      <CursorTrail />
      <NavBar />
      <main>
        <Hero />
        <CorkBoard projects={projectItems} />
        <About />
        <WorldGame projects={projectItems} />
      </main>
      <Contact />
    </div>
  );
}