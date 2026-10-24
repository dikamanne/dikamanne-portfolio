import { useState } from "react";
import "./App.css";
import "./index.css";
import NavBar from "./components/NavBar.jsx";
import CorkBoard from "./components/CorkBoard.jsx";
import MapSection from "./components/MapSection.jsx";
import projectItems from "./components/ProjectItems.js";

export default function App() {
  const [activeCountry, setActiveCountry] = useState(null);

  const availableCountries = [...new Set(projectItems.map((i) => i.country))];

  // map only filters its own mini list, not the cork board
  const countryProjects = activeCountry
    ? projectItems.filter(
        (i) => i.country.toLowerCase() === activeCountry.toLowerCase()
      )
    : [];

  const handleCountryClick = (country) =>
    setActiveCountry((prev) => (prev === country ? null : country)); // click again to clear

  return (
    <div className="App texture-overlay">
      <NavBar />

      <section id="home" className="hero">
        <h2 className="hero-title">Hi, I'm Dika.</h2>
        <p className="hero-sub">
          One sentence about what you do and what you're looking for.
        </p>
      </section>

      <CorkBoard projects={projectItems} />

      <section id="about" className="about">
        {/* photo + short bio + resume link */}
      </section>

      <section id="field-notes" className="map-wrap">
        <h3>Where I've explored</h3>
        <p>Click a highlighted country to see work from there.</p>
        <MapSection
          availableCountries={availableCountries}
          activeCountry={activeCountry}
          onCountryClick={handleCountryClick}
        />
        {activeCountry && (
          <div className="map-results">
            {countryProjects.map((p) => (
              <a key={p.id} href={`/project/${p.id}`}>{p.title}</a>
            ))}
          </div>
        )}
      </section>

      <footer id="contact">{/* email, LinkedIn, etc. */}</footer>
    </div>
  );
}