import React from 'react';
import { worldMapSvg } from '../assets/map';

export default function MapSection() {
  return (
    <div 
      className="map-section"
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        background: '#e0f2fe', // Ocean blue background 
        borderRadius: '12px', 
        overflow: 'hidden' 
      }} 
      dangerouslySetInnerHTML={{ __html: worldMapSvg }}
    />
  );
}



