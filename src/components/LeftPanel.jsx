import React from "react";

function LeftPanel() {
  return (
    <div className="d-flex flex-column h-100 p-4" style={{ gap: "1.5rem" }}>
      <div>
        <h2 className="fw-bold mb-3">Welcome to My Space</h2>
        <p className="text-muted" style={{ lineHeight: "1.6" }}>
          fixed section
        </p>
      </div>

      {/* Map Content Container */}
      <div 
        className="flex-grow-1 bg-light rounded d-flex align-items-center justify-content-center text-secondary border border-dashed"
        style={{ minHeight: "250px" }}
      >
        📍 Map Canvas Container
      </div>
    </div>
  );
}

export default LeftPanel;
