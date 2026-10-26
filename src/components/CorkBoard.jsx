import React, { useEffect, useRef, useState } from "react";
import "./CorkBoard.css";

const pinColors = ["#d4503f", "#2f5d8c", "#e2b13c", "#4f9a6b"];
const tilts = [-3, 2.5, -1.5, 3, -2, 1.5];
const vars = (i) => ({ "--i": i, "--rot": `${tilts[i % tilts.length]}deg` });

// Swap for your own photos later: { src: "/strip/1.jpg" }
const STRIP = [
  { emoji: "🏮", bg: "#e59ab0" },
  { emoji: "🌴", bg: "#9fc7a8" },
  { emoji: "✈️", bg: "#a9c4de" },
  { emoji: "🍜", bg: "#f0d38a" },
];

const Pin = ({ i }) => (
  <span className="pin" style={{ background: pinColors[i % pinColors.length] }} aria-hidden="true" />
);
const Tape = () => <span className="tape" aria-hidden="true" />;

function Photo({ item }) {
  return (
    <div className="photo" style={{ backgroundColor: item.bg }}>
      {item.image && <img className="still" src={item.image} alt="" />}
      {item.gif && <img className="gif" src={item.gif} alt="" />}
      {!item.image && <span className="photo-num">{item.num}</span>}
    </div>
  );
}

function Polaroid({ item, i, extra }) {
  return (
    <a
      href={`/project/${item.id}`}
      className={`piece polaroid ${extra ? "extra" : "slot-p0"}`}
      style={vars(i)}
    >
      <Pin i={i} />
      <Photo item={item} />
      <p className="caption">{item.title}</p>
      <p className="tag">{item.status ? `${item.status}, ` : ""}{item.tag}</p>
      <span className="open-tab">view project</span>
    </a>
  );
}

function Postcard({ item, i }) {
  return (
    <a href={`/project/${item.id}`} className="piece postcard slot-p1" style={vars(i)}>
      <Tape />
      <Photo item={item} />
      <div className="postcard-body">
        <span className="postmark">{item.country}<br />{item.num}</span>
        <p className="caption">{item.title}</p>
        <p className="postcard-desc">{item.desc}</p>
        <p className="tag">{item.status ? `${item.status}, ` : ""}{item.tag}</p>
      </div>
      <span className="open-tab">view project</span>
    </a>
  );
}

export default function CorkBoard({ projects }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const firstPolaroid = projects.find((p) => p.type !== "postcard");
  const firstPostcard = projects.find((p) => p.type === "postcard");
  const extras = projects.filter((p) => p !== firstPolaroid && p !== firstPostcard);

  return (
    <section id="projects" className={`cork-board ${inView ? "in-view" : ""}`} ref={ref}>
      <div className="cork-grid">
        <div className="piece note slot-note" style={vars(0)}>
          <Tape />
          this board is basically my brain: maps, film, ceramics, research and way too many
          tabs. poke around ✦
        </div>

        {firstPolaroid && <Polaroid item={firstPolaroid} i={1} />}

        <div className="piece strip slot-strip" style={vars(2)} aria-hidden="true">
          {STRIP.map((f, k) => (
            <div key={k} className="frame" style={{ background: f.bg, "--k": k }}>
              {f.src ? <img src={f.src} alt="" /> : f.emoji}
            </div>
          ))}
        </div>

        <div className="piece tile slot-tile" style={vars(3)} aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <rect width="100" height="100" fill="#fff" />
            <g fill="#2f5d8c">
              <path d="M0 0h50a50 50 0 0 1-50 50z" />
              <path d="M100 0v50a50 50 0 0 1-50-50z" opacity=".55" />
              <path d="M0 100V50a50 50 0 0 1 50 50z" opacity=".55" />
              <path d="M100 100H50a50 50 0 0 1 50-50z" />
            </g>
            <circle cx="50" cy="50" r="9" fill="#fff" stroke="#2f5d8c" strokeWidth="3" />
          </svg>
        </div>

        <div className="piece sticker slot-s1" style={vars(4)} aria-hidden="true">🍒</div>

        {firstPostcard && <Postcard item={firstPostcard} i={5} />}

        <div className="piece sticker slot-s2" style={vars(0)} aria-hidden="true">🌍</div>
        <div className="piece sticker slot-s3" style={vars(3)} aria-hidden="true">🎞️</div>

        <div className="piece ticket slot-ticket" style={vars(2)}>
          <div className="ticket-inner">
            <span>NOW READING</span>
            <strong>Replace me: a book, law or report you’re into</strong>
          </div>
        </div>

        {extras.map((p, k) => (
          <Polaroid key={p.id} item={p} i={k + 6} extra />
        ))}
      </div>
    </section>
  );
}