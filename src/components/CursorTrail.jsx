import { useEffect } from "react";
import "./CursorTrail.css";

const colors = ["#6e1423", "#f3ede1", "#8a8584", "#c9a96e"];

export default function CursorTrail() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;

    let last = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - last < 70) return;
      last = now;
      const s = document.createElement("span");
      s.className = "spark";
      s.textContent = Math.random() > 0.5 ? "✦" : "•";
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      s.style.color = colors[Math.floor(Math.random() * colors.length)];
      s.style.setProperty("--dx", Math.random() * 40 - 20 + "px");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}