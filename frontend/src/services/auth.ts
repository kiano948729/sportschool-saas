import api from "./api";

export async function getCurrentUser() {
  const response = await api("/api/user");

  return response.user;
}

export async function logout() {
  await api("/api/logout", {
    method: "POST",
  });
}
