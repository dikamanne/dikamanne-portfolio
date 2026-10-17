
import React from "react";

// reading from dynamic passed props 
function RightPanel({ projects }) {
  return (
    <div style={{ padding: "2.5rem 2.5rem 5rem 2.5rem" }}>
      <h3 style={{ marginBottom: "2rem", fontWeight: "600", color: "#222", fontFamily: "sans-serif" }}>
        Projects 
      </h3>
      
      {/* grid parent element wrapping the project items */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "2rem" 
      }}>
        {projects.map((item) => (
          <a 
            key={item.id} 
            href={`/project/${item.id}`} 
            style={{ textDecoration: "none", color: "inherit" }}
          >
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              
              {/* tile - want when i hover a black and white gif plays*/}
              <div 
                style={{
                  aspectRatio: "1 / 1",
                  backgroundColor: item.bg,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer"
                }}
                
              >
                
              </div>

              {/* item description */}
              <div style={{ paddingLeft: "4px", fontFamily: "sans-serif" }}>
                
                <span style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {item.title}
                </span>
              </div>

            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default RightPanel;
