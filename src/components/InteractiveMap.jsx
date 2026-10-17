// 📄 Path: src/InteractiveMap.jsx
import React from 'react';

// Central map layout matrix (X/Y coordinate bounds matching your visual map size)
const MAP_PIN_COORDINATES = {
  Nigeria: { x: 410, y: 210 },
  Taiwan:  { x: 590, y: 175 },
  // If you add a new country to your JS file later, simply add its coordinates here once!
};

export default function InteractiveMap({ availableCountries, activeCountry, onCountryClick }) {
  return (

  
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      background: '#e0f2fe', // Ocean blue background
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      <svg viewBox="0 0 800 400" width="100%" height="100%">
       
        <rect x="50" y="50" width="700" height="300" fill="#f0fdf4" rx="8" /> // this is replaced with svg world map

        
        {availableCountries.map((countryName) => {
          const pin = MAP_PIN_COORDINATES[countryName]; //instead of pin have this pin be directed to the clickable svg part
          
          
          if (!pin) return null; 

          const isSelected = activeCountry === countryName; //countryName be svg clickable and same as projectItems country tag

          return (
            <g 
              key={countryName} 
              onClick={() => onCountryClick(countryName)}
              style={{ transform: `translate(${pin.x}px, ${pin.y}px)`, cursor: 'pointer' }}
            >
              {/* Invisible touch anchor to make clicking easy on mobile devices */}
              <circle r="20" fill="transparent" />
              
              {/* Pin design */}
              <circle 
                r="10" 
                fill={isSelected ? '#22c55e' : '#ef4444'} 
                stroke="#ffffff"
                strokeWidth="2"
                style={{ transition: 'all 0.2s ease' }}
              />
              
              {/* Label */}
              <text 
                y="-16" 
                textAnchor="middle" 
                style={{ fontSize: '12px', fontWeight: 'bold', fill: '#1e293b' }}
              >
                {countryName}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
