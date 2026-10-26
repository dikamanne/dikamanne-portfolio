import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <p className="hand hero-hand">hello, I’m Dika</p>
      <h2 className="hero-title">
        I turn history, law and governance into stories you can click, scroll and play with.
      </h2>
      <p className="hero-sub">
        I’m a graphics reporter and researcher. I dig into how countries are run, then build
        interactive sites, videos and visuals that make the findings easy to use, so the
        information can help improve people’s everyday lives.
      </p>
      <a className="hero-link" href="#projects">See the board</a>
    </section>
  );
}