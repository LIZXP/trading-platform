import React from "react";
import { Routes, Route } from "react-router-dom";
import Body from "./Components/Body";
import MainPage from "./MainPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/trading-platform" element={<Body />} />
      </Routes>
    </div>
  );
}

export default App;
