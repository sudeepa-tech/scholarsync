import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api",
});

export async function loginUser(credentials) {
  const response = await api.post("/auth/login/", credentials);
  return response.data;
}

export async function registerUser(payload) {
  const response = await api.post("/auth/register/", payload);
  return response.data;
}

export async function fetchStudents(userId, searchTerm = "") {
  const response = await api.get("/students/", {
    params: {
      user_id: userId,
      search: searchTerm,
    },
  });
  return response.data;
}

export async function createStudent(userId, payload) {
  const response = await api.post("/students/add/", payload, {
    params: { user_id: userId },
  });
  return response.data;
}

export async function updateStudent(userId, studentId, payload) {
  const response = await api.put(`/students/update/${studentId}/`, payload, {
    params: { user_id: userId },
  });
  return response.data;
}

export async function removeStudent(userId, studentId) {
  const response = await api.delete(`/students/delete/${studentId}/`, {
    params: { user_id: userId },
  });
  return response.data;
}

export function getApiError(error, fallbackMessage) {
  const responseData = error?.response?.data;
  const message =
    responseData?.error ||
    responseData?.email?.[0] ||
    responseData?.full_name?.[0] ||
    responseData?.password?.[0] ||
    fallbackMessage;

  return Array.isArray(message) ? message[0] : message;
}
