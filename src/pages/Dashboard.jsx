import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ applications }) {
  const appliedCount = applications.filter(
    (app) => app.status === "Applied",
  ).length;

  const interviewedCount = applications.filter(
    (app) => app.status === "Interviewed",
  ).length;

  const offerCount = applications.filter(
    (app) => app.status === "Offer",
  ).length;

  const notSelectedCount = applications.filter(
    (app) => app.status === "Not Selected",
  ).length;

  const data = [
    { name: "Applied", value: appliedCount },
    { name: "Interviewed", value: interviewedCount },
    { name: "Offer", value: offerCount },
    { name: "Not Selected", value: notSelectedCount },
  ];

  const colors = ["#2563eb", "#f59e0b", "#10b981", "#ef4444"];

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Applied</h3>
          <p>{appliedCount}</p>
        </div>

        <div className="stat-card">
          <h3>Interviewed</h3>
          <p>{interviewedCount}</p>
        </div>

        <div className="stat-card">
          <h3>Offers</h3>
          <p>{offerCount}</p>
        </div>

        <div className="stat-card">
          <h3>Not Selected</h3>
          <p>{notSelectedCount}</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Application Status Chart</h3>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
