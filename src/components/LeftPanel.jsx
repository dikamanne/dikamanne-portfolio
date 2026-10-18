import React from "react";
import MapSection from "./MapSection";
import './LeftPanel.css';

function LeftPanel({ availableCountries, activeCountry, setActiveCountry }) {
  return (
    <div className="left-column" style={{ gap: "1.5rem" }}>
      <div>
        <div className="left-column-header-section">
          <h2 className="left-column-header">Welcome to My Portfolio</h2>
          
          {activeCountry && (
            <button 
              className="active-country-button"
              onClick={() => setActiveCountry(null)}
            >
              Clear Filter ({activeCountry})
            </button>
          )}
        </div>
        <p className="left-column-desc" style={{ lineHeight: "1.6" }}>
          Click on the map to see what I've explored!
        </p>
      </div>
      
      
      

      <div className= "left-column-map-section" style={{ width: '100%', height: '250px' }}>
        <MapSection 
        availableCountries={availableCountries}
          activeCountry={activeCountry}
          onCountryClick={setActiveCountry}
        />
      </div>

    </div>
  );
}

export default LeftPanel;
