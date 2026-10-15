import React from "react";

function RightPanel() {
  // 1. Unified array containing correct project definitions
  const projectItems = [
    { id: 1, title: "001", desc: "Project 001", bg: "#74b9ff" },
    { id: 2, title: "002", desc: "Project 002", bg: "#a29bfe" },
  ];

  return (
    <div style={{ padding: "2.5rem" }}>
      <h3 style={{ marginBottom: "2rem", fontWeight: "600", color: "#222", fontFamily: "sans-serif" }}>
        Workspace Directories
      </h3>
      
      {/* 2. Grid parent element wrapping the project items */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "2rem" 
      }}>
        {projectItems.map((item) => (
          <a 
            key={item.id} 
            href={`/project/${item.id}`} 
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {/* 3. Vertical layout stack matching square block with labels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              
              {/* 4. Perfect Square Tile Box */}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
                }}
              >
                {/* 5. Center-aligned text identifier */}
                <span style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}>
                  {item.title}
                </span>
              </div>

              {/* 6. Typography section sitting safely underneath */}
              <div style={{ paddingLeft: "4px", fontFamily: "sans-serif" }}>
                <h5 style={{ margin: "0 0 2px 0", fontSize: "1rem", fontWeight: "600", color: "#333" }}>
                  {item.title}
                </h5>
                <span style={{ fontSize: "0.8rem", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {item.desc}
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
