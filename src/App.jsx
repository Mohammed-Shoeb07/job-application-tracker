import { useEffect, useState } from "react";
import {
  createApplication,
  getApplications,
  removeApplication,
  updateApplication as updateApplicationFromApi,
} from "./api/api";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import MyApplications from "./pages/MyApplications";

function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [editingApplication, setEditingApplication] = useState(null);

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    async function loadApplications() {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  async function addApplication(newApplication) {
    try {
      setActionError("");

      await createApplication(newApplication);

      const data = await getApplications();
      setApplications(data);

      setCurrentView("list");
    } catch (error) {
      setActionError("Failed to save application.");
    }
  }

  async function updateApplication(updatedApplication) {
    try {
      setActionError("");

      await updateApplicationFromApi(updatedApplication.id, updatedApplication);

      const data = await getApplications();
      setApplications(data);

      setEditingApplication(null);
      setCurrentView("list");
    } catch (error) {
      setActionError("Failed to update application.");
    }
  }

  async function deleteApplication(id) {
    try {
      setActionError("");

      await removeApplication(id);

      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      setActionError("Failed to delete application.");
    }
  }

  function startEditApplication(application) {
    setEditingApplication(application);
    setCurrentView("add");
  }

  function goToAddApplication() {
    setEditingApplication(null);
    setCurrentView("add");
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title">
          <img src="/briefcase.svg" alt="Briefcase logo" />
          <h1>Job Application Tracker</h1>
        </div>

        <p>Track your internship and job applications in one place.</p>
      </header>

      <nav className="nav-buttons">
        <button onClick={() => setCurrentView("dashboard")}>Dashboard</button>
        <button onClick={goToAddApplication}>Add Application</button>
        <button onClick={() => setCurrentView("list")}>My Applications</button>
      </nav>

      <main className="main-content">
        {loading && <p>Loading applications...</p>}
        {error && <p className="error-message">{error}</p>}
        {actionError && <p className="error-message">{actionError}</p>}

        {!loading && currentView === "dashboard" && (
          <Dashboard applications={applications} />
        )}

        {currentView === "add" && (
          <AddApplication
            onAddApplication={addApplication}
            onUpdateApplication={updateApplication}
            editingApplication={editingApplication}
          />
        )}

        {currentView === "list" && (
          <MyApplications
            applications={applications}
            onDeleteApplication={deleteApplication}
            onEditApplication={startEditApplication}
          />
        )}
      </main>
    </div>
  );
}

export default App;
