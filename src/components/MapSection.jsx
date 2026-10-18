import React, { useRef, useEffect } from 'react';
import { worldMapSvg } from '../assets/map';

export default function MapSection({ availableCountries, activeCountry, onCountryClick }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const paths = mapContainerRef.current.querySelectorAll('path');
    const container = mapContainerRef.current;

    const handlePathClick = (event) => {
      const path = event.currentTarget;
      const countryIdentifier = path.getAttribute('name') || path.getAttribute('id') || path.getAttribute('class')
      
      if (countryIdentifier && onCountryClick) {
        onCountryClick(countryIdentifier)
      }
    
    };

    // Apply event listeners and initial/reactive state styling
    paths.forEach((path) => {
      const countryIdentifier = path.getAttribute('name') || path.getAttribute('id');
      const isAvailable = availableCountries.includes(countryIdentifier);
      const isActive = activeCountry === countryIdentifier;

      // Update classes or inline data attributes for conditional CSS mapping
      if (isAvailable) {
        path.setAttribute('data-available', 'true');
        path.addEventListener('click', handlePathClick);
      } else {
        path.removeAttribute('data-available');
      }

      if (isActive) {
        path.setAttribute('data-active', 'true');
      } else {
        path.removeAttribute('data-active');
      }
    });

    // Cleanup listeners properly on unmount or prop change
    return () => {
      paths.forEach((path) => {
        path.removeEventListener('click', handlePathClick);
      });
    };
  }, [availableCountries, activeCountry, onCountryClick]);

 


  

  return (
    <div 
      className="map-section"
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '250px', 
        background: '#e0f2fe', 
        borderRadius: '2px', 
        overflow: 'hidden' 
      }} 
      >
        <style>{`
        .map-section svg {
          width: 100% !important;
          height: 250px !important;
          object-fit: contain; /* Keeps the aspect ratio from stretching the map distortionally */
          background-color: grey
        }

        .map-section path[data-available="true"] {
        fill: #a9a9a9;
        stroke: #363737;
        stroke-width: 0.75px;
        pointer-events: auto;
        cursor:pointer;
        }

        .map-section path[data-available="true"]:hover {
        fill: #363737
        }

        .map-section path:hover {
        fill: #9a9498
        }

        .map-section path[data-active="true] {
        fill: #cbc1ae !important
        stroke: #ffffff
        }

        

        


    
      `}</style>

      <div
      ref={mapContainerRef}
       style={{ width: '100%', height: '110%' }}
       dangerouslySetInnerHTML={{ __html: worldMapSvg }}
      />
      
    </div>
  );
}



