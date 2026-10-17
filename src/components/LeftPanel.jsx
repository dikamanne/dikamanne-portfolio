import React from "react";
import InteractiveMap from "./InteractiveMap";

function LeftPanel({ availableCountries, activeCountry, setActiveCountry }) {
  return (
    <div className="d-flex flex-column h-100 p-4" style={{ gap: "1.5rem" }}>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-3">Welcome to My Space</h2>
          {/* button for active country */}
          {activeCountry && (
            <button 
              className="btn btn-sm btn-outline-secondary mb-3"
              onClick={() => setActiveCountry(null)}
            >
              Clear Filter ({activeCountry})
            </button>
          )}
        </div>
        <p className="text-muted" style={{ lineHeight: "1.6" }}>
          Click on the map to see what I've explored!
        </p>
      </div>

      {/* map */}
      <div 
        className="flex-grow-1 bg-light rounded d-flex align-items-center justify-content-center text-secondary border border-dashed"
        style={{ minHeight: "250px", overflow: "hidden" }}
      >
        {/* pass props */}
        <InteractiveMap 
          availableCountries={availableCountries}
          activeCountry={activeCountry}
          onCountryClick={setActiveCountry}
        />
      </div>
    </div>
  );
}

export default LeftPanel;
