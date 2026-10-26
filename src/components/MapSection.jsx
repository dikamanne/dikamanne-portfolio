import React, { useRef, useEffect, useState } from "react";
import { worldMapSvg } from "../assets/map";
import "./MapSection.css";

const ident = (p) => (p.getAttribute("name") || p.getAttribute("id") || p.getAttribute("class") || "").trim();
const has = (list, name) => list.some((c) => c && c.toLowerCase() === name.toLowerCase());

export default function MapSection({ stamped = [], wrong = null, active = null, onCountryClick }) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const base = useRef(null);
  const drag = useRef(null);
  const moved = useRef(false);
  const [vb, setVb] = useState(null);

  // read the svg's original viewBox once
  useEffect(() => {
    const svg = wrapRef.current.querySelector("svg");
    if (!svg) return;
    svgRef.current = svg;
    const v = svg.getAttribute("viewBox");
    let b;
    if (v) {
      const [x, y, w, h] = v.split(/[\s,]+/).map(Number);
      b = { x, y, w, h };
    } else {
      b = { x: 0, y: 0, w: parseFloat(svg.getAttribute("width")) || 1000, h: parseFloat(svg.getAttribute("height")) || 500 };
    }
    base.current = b;
    setVb(b);
  }, []);

  // apply zoom/pan
  useEffect(() => {
    if (svgRef.current && vb) svgRef.current.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  }, [vb]);

  // paint state onto the paths
  useEffect(() => {
    wrapRef.current.querySelectorAll("path").forEach((p) => {
      const id = ident(p);
      const set = (attr, on) => (on ? p.setAttribute(attr, "true") : p.removeAttribute(attr));
      set("data-stamped", id && has(stamped, id));
      set("data-active", id && active && id.toLowerCase() === active.toLowerCase());
      set("data-wrong", id && wrong && id.toLowerCase() === wrong.toLowerCase());
    });
  }, [stamped, wrong, active]);

  const clamp = (v) => {
    const b = base.current;
    return {
      ...v,
      x: Math.min(Math.max(v.x, b.x), b.x + b.w - v.w),
      y: Math.min(Math.max(v.y, b.y), b.y + b.h - v.h),
    };
  };

  const zoom = (f) =>
    setVb((v) => {
      const b = base.current;
      const w = Math.min(b.w, Math.max(b.w / 40, v.w * f));
      const h = (w * b.h) / b.w;
      return clamp({ x: v.x + (v.w - w) / 2, y: v.y + (v.h - h) / 2, w, h });
    });

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY };
    moved.current = false;
  };
  const onPointerMove = (e) => {
    if (!drag.current || !svgRef.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved.current = true;
    if (!moved.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    setVb((v) => {
      const unit = Math.max(v.w / rect.width, v.h / rect.height);
      return clamp({ ...v, x: v.x - dx * unit, y: v.y - dy * unit });
    });
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const endDrag = () => { drag.current = null; };

  const onClick = (e) => {
    if (moved.current) { moved.current = false; return; }
    const path = e.target.closest("path");
    if (!path) return;
    const id = ident(path);
    if (id && onCountryClick) onCountryClick(id);
  };

  return (
    <div className="map-section">
      <div
        ref={wrapRef}
        className="map-svg"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: worldMapSvg }}
      />
      <div className="map-controls">
        <button type="button" onClick={() => zoom(0.6)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => zoom(1 / 0.6)} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => setVb(base.current)} aria-label="Reset map">⟲</button>
      </div>
    </div>
  );
}