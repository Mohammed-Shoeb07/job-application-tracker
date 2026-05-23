import { useEffect, useState } from "react";

function AddApplication({
  onAddApplication,
  onUpdateApplication,
  editingApplication,
}) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    location: "",
    date_applied: "",
    notes: "",
  });

  useEffect(() => {
    if (editingApplication) {
      setFormData(editingApplication);
    }
  }, [editingApplication]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingApplication) {
      onUpdateApplication(formData);
    } else {
      const newApplication = {
        ...formData,
      };

      onAddApplication(newApplication);
    }

    setFormData({
      company: "",
      role: "",
      status: "Applied",
      location: "",
      date_applied: "",
      notes: "",
    });
  }

  return (
    <div>
      <h2>{editingApplication ? "Edit Application" : "Add Application"}</h2>

      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company</label>

          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Example: Google"
            required
          />
        </div>

        <div className="form-group">
          <label>Role</label>

          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Example: Software Developer Intern"
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option>Applied</option>
            <option>Interviewed</option>
            <option>Offer</option>
            <option>Not Selected</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Example: St. John's, NL"
            required
          />
        </div>

        <div className="form-group">
          <label>Date Applied</label>

          <input
            type="date"
            name="date_applied"
            value={formData.date_applied}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Notes</label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any notes..."
          />
        </div>

        <button type="submit">
          {editingApplication ? "Update Application" : "Save Application"}
        </button>
      </form>
    </div>
  );
}

export default AddApplication;
