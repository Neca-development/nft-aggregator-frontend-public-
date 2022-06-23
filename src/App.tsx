import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./componenets/Header/Header";
import Collections from "./pages/Collections/Collections";
import Favorite from "./pages/Favorite/Favorite";
import Giveaways from "./pages/Giveaways/Giveaways";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Collections />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/giveaways" element={<Giveaways />} />
      </Routes>
    </div>
  );
}

export default App;
