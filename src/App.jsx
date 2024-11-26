import React from "react";
import "./styles/App.scss";
import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";
function App() {
  return (
    <div className="body">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
