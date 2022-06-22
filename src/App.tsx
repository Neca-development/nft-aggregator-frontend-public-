import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./componenets/Header/Header";
import Collections from "./pages/Collections/Collections";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Collections />} />
      </Routes>
    </div>
  );
}

export default App;
