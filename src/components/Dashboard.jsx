import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard({ spells, loading }) {
  if (loading) return <div className="loading glass">✨ Gathering arcane knowledge...</div>;


  const levelCounts = spells.reduce((acc, s) => {
    acc[s.level] = (acc[s.level] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(levelCounts),
    datasets: [
      {
        label: "Spells per Level",
        data: Object.values(levelCounts),
        backgroundColor: "#9ae1ff"
      }
    ]
  };


  const schoolCounts = spells.reduce((acc, s) => {
    const school = s.school.name;
    acc[school] = (acc[school] || 0) + 1;
    return acc;
  }, {});

  const schoolData = {
    labels: Object.keys(schoolCounts),
    datasets: [
      {
        data: Object.values(schoolCounts),
        backgroundColor: [
          "#9ae1ff", "#a0d9b1", "#f2a6a6", "#f2e2a6", "#cfa6f2", "#a6c8f2", "#f2b6a6"
        ]
      }
    ]
  };

  return (
    <>
      <div className="card-row">
        <div className="card glass"><h3>Total Spells</h3><p>{spells.length}</p></div>
        <div className="card glass"><h3>Avg Level</h3>
          <p>{(spells.reduce((a, s) => a + s.level, 0) / spells.length).toFixed(1)}</p>
        </div>
      </div>

      <div className="glass table-container">
        <h3>Wizard Spells</h3>
        <table>
          <thead>
            <tr><th>#</th><th>Name</th><th>Level</th><th>School</th></tr>
          </thead>
          <tbody>
            {spells.map((s, i) => (
              <tr key={s.index}>
                <td>{i + 1}</td>
                <td><Link to={`/spell/${s.index}`}>{s.name}</Link></td>
                <td>{s.level}</td>
                <td>{s.school.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
        <div className="chart-row">
            <div className="glass chart">
                <h3>Spell Level Distribution</h3>
                <Bar data={chartData} />
            </div>

            <div className="glass chart">
                <h3>Spells by School</h3>
                <Pie data={schoolData} />
            </div>
        </div>
    </>
  );
}

export default Dashboard;