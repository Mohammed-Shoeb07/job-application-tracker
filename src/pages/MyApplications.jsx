import { useState } from "react";

function MyApplications({
  applications,
  onDeleteApplication,
  onEditApplication,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplications = applications.filter((application) => {
    const company = application.company.toLowerCase();
    const role = application.role.toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesSearch = company.includes(search) || role.includes(search);

    const matchesStatus =
      statusFilter === "All" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2>My Applications</h2>

      <div className="applications-controls">
        <input
          type="text"
          placeholder="Search by company or role"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Offer">Offer</option>
          <option value="Not Selected">Not Selected</option>
        </select>
      </div>

      <div className="applications-list">
        {filteredApplications.map((application) => (
          <div key={application.id} className="application-card">
            <h3>{application.company}</h3>

            <p>
              <strong>Role:</strong> {application.role}
            </p>

            <p>
              <strong>Status:</strong> {application.status}
            </p>

            <p>
              <strong>Location:</strong> {application.location}
            </p>

            <p>
              <strong>Date Applied:</strong> {application.date_applied}
            </p>

            <p>
              <strong>Notes:</strong> {application.notes}
            </p>

            <div className="card-buttons">
              <button onClick={() => onEditApplication(application)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete this application?",
                  );

                  if (confirmed) {
                    onDeleteApplication(application.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;
