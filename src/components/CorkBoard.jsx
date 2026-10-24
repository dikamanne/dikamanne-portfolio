import React from "react";
import "./CorkBoard.css";

const rotations = [-3, 2, -1.5, 3, -2, 1.5];
const pinColors = ["#d94f4f", "#3b82c4", "#e0b030", "#4aa36b"];

export default function CorkBoard({ projects }) {
  return (
    <section id="projects" className="cork-board">
      <div className="cork-grid">
        {projects.map((item, i) => (
          <a
            key={item.id}
            href={`/project/${item.id}`}
            className="pin-card"
            style={{ "--rot": `${rotations[i % rotations.length]}deg` }}
          >
            <span className="pin" style={{ background: pinColors[i % 4] }} />
            <div className="pin-photo" style={{ backgroundColor: item.bg }}>
              {item.still && <img className="still" src={item.still} alt="" />}
              {item.gif && <img className="gif" src={item.gif} alt="" />}
            </div>
            <p className="pin-title">{item.title}</p>
          </a>
        ))}
      </div>
    </section>
  );
}