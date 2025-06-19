import Service from "./Service";

export function getAuthToken() {
  return localStorage.getItem("authToken");
}

export function setAuthToken(token) {
  localStorage.setItem("authToken", token);
}

export function setAuthUser(user) {
  localStorage.setItem("authUser", JSON.stringify(user));
}

export function removeAuthToken() {
  localStorage.removeItem("authToken");
}

export function removeAuthUser() {
  localStorage.removeItem("authUser");
}

export function getAuthUser(){
  return localStorage.getItem('authUser');
}

export function loginUser(credentials) {
   
  return Service.post("auth/login", credentials).then((response) => {
    const user = response.data;
    setAuthToken(user.token);
    return user;
  });
}

export function getAuthenticatedUser() {
  const token = getAuthToken();

  if (!token) {
    return Promise.reject("No se encontro token");
  }

}

export function logout() {
  removeAuthToken();
  removeAuthUser();
}







