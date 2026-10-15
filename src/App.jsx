import { useState } from 'react'
import './App.css'
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import React from 'react';
import './index.css'; // Make sure the path to your CSS file is correct
import NavBar from "./components/NavBar.jsx";
import CalendarContainer from 'rsuite/esm/Calendar/CalendarContainer.js';
import LeftPanel from './components/LeftPanel.jsx';
import RightPanel from './components/RightPanel.jsx';

export default function App() {
  return (
    <div className="App" style={{ overflow: "hidden", height: "100vh" }}>
      <NavBar />

      <Container fluid style={{ paddingTop: "60px", height: "calc(100vh - 60px)" }}>
        <Row style ={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          margin: 0,
          flexWrap: "nowrap"
        }}>

          <Col style={{
            width: "40%",
            flex: "0 0 40%", // x- expand to fill empty space? no x- squish if space runs out? no x- starting size 35 
            height: "100%",
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#ffffff"
          }}>
            <LeftPanel />
          </Col>

          <Col style={{
            width: "60%",
            flex: "1 1 60%",
            height: "100%",
            overflowY: "auto" //forces independent vertical scroll
          }}>
            <RightPanel />
          </Col>



        </Row>
      </Container>
    </div>
  );
}




