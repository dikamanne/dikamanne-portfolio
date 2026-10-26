import React, { useMemo, useRef, useState } from "react";
import MapSection from "./MapSection.jsx";
import "./WorldGame.css";

const same = (a, b) => !!a && !!b && a.toLowerCase() === b.toLowerCase();

export default function WorldGame({ projects }) {
  const countries = useMemo(() => [...new Set(projects.map((p) => p.country))], [projects]);
  const [stamped, setStamped] = useState([]);
  const [open, setOpen] = useState(null);
  const [wrong, setWrong] = useState(null);
  const [msg, setMsg] = useState("");
  const timer = useRef(null);

  const quest = projects.find((p) => !stamped.some((c) => same(c, p.country)));
  const unlocked = open ? projects.filter((p) => same(p.country, open)) : [];

  const stamp = (country) => {
    setStamped((s) => (s.some((c) => same(c, country)) ? s : [...s, country]));
    setOpen(country);
    setWrong(null);
  };

  const handleClick = (name) => {
    if (stamped.some((c) => same(c, name))) { setOpen(name); setMsg(""); return; }
    if (!quest) return;
    if (same(name, quest.country)) {
      stamp(quest.country);
      setMsg(`Yes! That’s ${quest.country}. Stamp earned.`);
    } else {
      setWrong(name);
      setMsg(`That’s ${name}, not quite. Hint: ${quest.hint}`);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setWrong(null), 700);
    }
  };

  const restart = () => { setStamped([]); setOpen(null); setWrong(null); setMsg(""); };

  return (
    <section id="field-notes" className="world">
      <header className="world-head">
        <p className="hand">field notes</p>
        <h3>Where in the world is the story?</h3>
        <p>
          Read the clue, then find the country on the map. Every right answer stamps your
          passport and unlocks a project. Drag to pan, use + to zoom.
        </p>
      </header>

      <div className="map-frame">
        <MapSection stamped={stamped} wrong={wrong} active={open} onCountryClick={handleClick} />
      </div>

      <div className="world-lower">
        <div className="clue-card">
          <span className="clue-label">{quest ? `CLUE ${stamped.length + 1} OF ${countries.length}` : "PASSPORT FULL"}</span>
          {quest ? (
            <>
              <p className="clue-text">{quest.clue}</p>
              <button type="button" className="game-btn" onClick={() => stamp(quest.country)}>
                Show me the answer
              </button>
            </>
          ) : (
            <>
              <p className="clue-text">
                You found every story. Click a stamp or a blue country to reopen it, or play again.
              </p>
              <button type="button" className="game-btn" onClick={restart}>Start over</button>
            </>
          )}
          <p className="game-msg" aria-live="polite">{msg}</p>
        </div>

        <div className="passport">
          <span className="clue-label">PASSPORT</span>
          <div className="stamps">
            {countries.map((c, i) => {
              const got = stamped.some((s) => same(s, c));
              return (
                <button
                  type="button"
                  key={c}
                  className={`stamp ${got ? "got" : ""}`}
                  style={{ "--r": `${i % 2 ? 7 : -8}deg` }}
                  onClick={() => got && setOpen(c)}
                  disabled={!got}
                  aria-label={got ? `${c} stamp` : "Locked stamp"}
                >
                  {got ? c : "?"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {unlocked.length > 0 && (
        <div className="unlocked">
          {unlocked.map((p) => (
            <a key={p.id} className="unlock-card" href={`/project/${p.id}`}>
              <span className="clue-label">STORY UNLOCKED</span>
              <strong>{p.title}</strong>
              <span>{p.desc}</span>
              <em>Open project</em>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}