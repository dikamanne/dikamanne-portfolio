import React, { useEffect, useRef, useState } from "react";
import "./CorkBoard.css";

const pinColors = ["#6e1423", "#2d2a2b", "#b08d57"];
const tilts = [-0.8, 0.6, -0.4, 0.9, -0.6, 0.4];
const vars = (i) => ({ "--i": i, "--rot": `${tilts[i % tilts.length]}deg` });

// Film strip frames. Add your own photos: { tone: "#8a8584", src: "/film/1.jpg" }
const FILM = [
  { tone: "#8a8584" },
  { tone: "#6e6a68" },
  { tone: "#a39d99" },
  { tone: "#7d5a5f" },
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

function Meta({ item }) {
  return (
    <p className="tag">
      {item.status && <b className="wip">{item.status}</b>} {item.tag}
    </p>
  );
}

function Polaroid({ item, i }) {
  return (
    <a href={`/project/${item.id}`} className="piece polaroid" style={vars(i)}>
      <Pin i={i} />
      <Photo item={item} />
      <p className="caption">{item.title}</p>
      <Meta item={item} />
      <span className="open-tab">view project</span>
    </a>
  );
}

function Postcard({ item, i }) {
  return (
    <a href={`/project/${item.id}`} className="piece postcard" style={vars(i)}>
      <Tape />
      <Photo item={item} />
      <div className="postcard-body">
        <span className="postmark">{item.country}<br />{item.num}</span>
        <p className="caption">{item.title}</p>
        <p className="postcard-desc">{item.desc}</p>
        <Meta item={item} />
      </div>
      <span className="open-tab">view project</span>
    </a>
  );
}

export default function CorkBoard({ projects }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false, pct: 0 });

  // fade pieces in once the board is on screen
  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  // arrows + progress bar
  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft > max - 8,
      pct: max > 0 ? el.scrollLeft / max : 0,
    });
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [projects]);

  const go = (dir) =>
    trackRef.current.scrollBy({ left: dir * trackRef.current.clientWidth * 0.8, behavior: "smooth" });

  let n = projects.length + 2; // running index for the decor pieces

  return (
    <section id="projects" className={`cork-board ${inView ? "in-view" : ""}`} ref={sectionRef}>
      <div className="board-label">
        <span>THE BOARD</span>
        <span>scroll or use the arrows</span>
      </div>

      <div className="board-frame">
        <div className="lace lace-top" aria-hidden="true" />

        <div
          className="board-track"
          ref={trackRef}
          onScroll={update}
          tabIndex={0}
          role="region"
          aria-label="Project board. Scroll sideways to see more."
        >
          <div className="col">
            <div className="piece index-card" style={vars(0)}>
              <Tape />
              <span className="card-kicker">FIELD NOTES / 01</span>
              <p>
                This board is basically my brain: maps, film, ceramics, research and way too many
                tabs.
              </p>
              <p className="scrawl">keep scrolling →</p>
            </div>
          </div>

          <div className="col">
            <div className="piece film" style={vars(1)} aria-hidden="true">
              {FILM.map((f, k) => (
                <div className="film-frame" key={k} style={{ background: f.tone }}>
                  {f.src && <img src={f.src} alt="" />}
                  <span>{21 + k}A</span>
                </div>
              ))}
            </div>
          </div>

          {projects.map((p, k) => (
            <div className="col" key={p.id}>
              {p.type === "postcard" ? <Postcard item={p} i={k + 2} /> : <Polaroid item={p} i={k + 2} />}
            </div>
          ))}

          <div className="col stack">
            <div className="piece tile" style={vars(n++)} aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <rect width="100" height="100" fill="#f3ede1" />
                <g fill="#6e1423">
                  <path d="M0 0h50a50 50 0 0 1-50 50z" />
                  <path d="M100 100H50a50 50 0 0 1 50-50z" />
                </g>
                <g fill="#8a8584">
                  <path d="M100 0v50a50 50 0 0 1-50-50z" />
                  <path d="M0 100V50a50 50 0 0 1 50 50z" />
                </g>
                <circle cx="50" cy="50" r="9" fill="#f3ede1" stroke="#2d2a2b" strokeWidth="3" />
              </svg>
            </div>
            <div className="piece sticker s-burg" style={vars(n++)} aria-hidden="true">
              FOLLOW<br />THE MONEY
            </div>
            <div className="piece sticker s-cream" style={vars(n++)} aria-hidden="true">
              READ THE<br />FINE PRINT
            </div>
          </div>

          <div className="col stack">
            <div className="piece lcd" style={vars(n++)} aria-hidden="true">
              <div className="lcd-top"><span className="rec">● REC</span><span>00:04:12</span></div>
              <div className="lcd-view"><i /><i /><i /><i /></div>
              <div className="lcd-bottom">ISO 400 &nbsp; f/2.8 &nbsp; 1/60</div>
            </div>
            <div className="piece ticket" style={vars(n++)}>
              <div className="ticket-inner">
                <span>NOW READING</span>
                <strong>Replace me: a book, law or report you’re into</strong>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="piece endcard" style={vars(n++)} aria-hidden="true">
              <span>MORE SOON</span>
              <p>next story loading…</p>
            </div>
          </div>
        </div>

        <button type="button" className="board-arrow prev" onClick={() => go(-1)} disabled={edge.start} aria-label="Scroll left">‹</button>
        <button type="button" className="board-arrow next" onClick={() => go(1)} disabled={edge.end} aria-label="Scroll right">›</button>

        <div className="lace lace-bottom" aria-hidden="true" />
      </div>

      <div className="board-progress" aria-hidden="true">
        <span style={{ width: `${10 + edge.pct * 90}%` }} />
      </div>
    </section>
  );
}