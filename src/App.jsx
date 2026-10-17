import { useState } from 'react'
import './App.css'
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import React from 'react';
import './index.css'; 
import NavBar from "./components/NavBar.jsx";
import LeftPanel from './components/LeftPanel.jsx';
import RightPanel from './components/RightPanel.jsx';
import projectItems from './components/ProjectItems.js'; 

export default function App() {
  // filter state
  const [activeCountry, setActiveCountry] = useState(null);

  
  const availableCountries = [...new Set(projectItems.map(item => item.country))];

  const filteredProjects = activeCountry
    ? projectItems.filter(item => item.country.toLowerCase() === activeCountry.toLowerCase())
    : projectItems;

  return (
    <div className="App" style={{ paddingTop: "10px", overflow: "hidden", height: "100vh", display: "flex", flexDirection: "column"}}>
      <NavBar />

      <Container fluid style={{ paddingTop: "40px", height: "calc(100vh - 40px)" }}>
        <Row style ={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          margin: 0,
          flexWrap: "nowrap"
        }}>
          
          <Col style={{
            width: "40%",
            flex: "0 0 40%", 
            height: "100%",
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#fefbea",
            overflow: "hidden"
          }}>
            
            <LeftPanel 
              availableCountries={availableCountries}
              activeCountry={activeCountry}
              setActiveCountry={setActiveCountry}
            />
          </Col>
          
          <Col style={{
            width: "60%",
            flex: "1 1 60%",
            height: "100%",
            overflowY: "auto", 
            backgroundColor: "#e0dbc1",
            overscrollBehaviorY: "contain"
          }}>
          
            <RightPanel projects={filteredProjects} />
          </Col>

        </Row>
      </Container>
    </div>
  );
}
