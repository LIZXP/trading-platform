import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./Components/MainPage";
import "./App.css";
import AppMain from "./Components/AppMain/AppMain";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route path="/" element={<AppMain />} />
        <Route path="/trading-platform" />
      </Routes>
    </div>
  );
}

export default App;
