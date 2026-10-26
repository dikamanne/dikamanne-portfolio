import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      
      <h2 className="hero-title">
        I turn history, law and governance into stories you can click, scroll and play with.
      </h2>
      <p className="hero-sub">
        I’m an [amateur] graphics reporter and researcher. I dig into how countries are run, then build
        interactive sites, videos and visuals. </p>
      <a className="hero-link" href="#projects">See the board</a>
    </section>
  );
}