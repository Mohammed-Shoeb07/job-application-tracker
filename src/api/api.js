import axios from "axios";

const API_URL = "https://job-application-tracker-api-lckq.onrender.com";

export async function getApplications() {
  const response = await axios.get(`${API_URL}/applications`);
  return response.data.data;
}

export async function createApplication(application) {
  const response = await axios.post(`${API_URL}/applications`, application);
  return response.data;
}

export async function removeApplication(id) {
  const response = await axios.delete(`${API_URL}/applications/${id}`);
  return response.data;
}

export async function updateApplication(id, application) {
  const response = await axios.put(
    `${API_URL}/applications/${id}`,
    application,
  );

  return response.data;
}
