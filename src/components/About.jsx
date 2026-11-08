import React from "react";
import "./About.css";

const interests = ["history", "law", "governance", "data viz", "film photography", "ceramics", "travel"];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-photo">
        <span className="tape" aria-hidden="true" />
        {/* Replace the box with <img src="/me.jpg" alt="Dika" /> */}
        <div className="about-img">your photo</div>
        <p className="caption">that’s me</p>
      </div>

      <div className="about-text">
        <p className="hand">about</p>
        <h3>interactive research and visuals!</h3>
        <p>
          Hi all! I'm Dika Manne and I hope to build interactive and visual websites that explore
          history, politics, and law in the regions of West Africa, MENA and South Asia. 
        </p>
        <ul className="chips" aria-label="Interests">
          {interests.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <a className="resume" href="/resume.pdf">Download resume</a>
      </div>
    </section>
  );
}