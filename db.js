function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getOrders() {
  return JSON.parse(localStorage.getItem("orders") || "[]");
}

function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
