import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SpellDetail from "./components/SpellDetail";
import About from "./components/About";
import "./App.css";

function App() {
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const res = await fetch("https://www.dnd5eapi.co/api/spells");
        const data = await res.json();

    
        const randomized = data.results.sort(() => 0.5 - Math.random()).slice(0, 50);

      
        const details = await Promise.all(
          randomized.map(async (spell) => {
            const detailRes = await fetch(`https://www.dnd5eapi.co${spell.url}`);
            const detailData = await detailRes.json();
            return detailData.classes.some(c => c.name === "Wizard") ? detailData : null;
          })
        );

        const wizardSpells = details.filter(Boolean).slice(0, 10);
        setSpells(wizardSpells);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchSpells();
  }, []);

  return (
    <div className="app-container">
     
      <div className="sidebar glass">
        <h2>Wizard SpellDash</h2>
        <Link to="/">Dashboard</Link>
        <Link to="/about">About</Link>
      </div>

     
      <div className="dashboard">
        <Routes>
          <Route path="/" element={<Dashboard spells={spells} loading={loading} />} />
          <Route path="/spell/:id" element={<SpellDetail spells={spells} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;