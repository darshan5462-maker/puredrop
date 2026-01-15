// ---------- USERS ----------
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// ---------- CURRENT USER ----------
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

// ---------- PLANS / PRICES (Admin editable) ----------
function defaultPlans() {
  return [
    { id: 1, name: "20L Can", price: 50, unit: "per can" },
    { id: 2, name: "Monthly Plan", price: 999, unit: "per month" },
    { id: 3, name: "Office Pack", price: 1999, unit: "per month" }
  ];
}
function getPlans() {
  const data = localStorage.getItem("plans");
  if (!data) {
    localStorage.setItem("plans", JSON.stringify(defaultPlans()));
    return defaultPlans();
  }
  return JSON.parse(data);
}
function savePlans(plans) {
  localStorage.setItem("plans", JSON.stringify(plans));
}

// ---------- ORDERS ----------
function getOrders() {
  return JSON.parse(localStorage.getItem("orders") || "[]");
}
function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// ---------- LOCATIONS (Admin editable, optional) ----------
function defaultLocations(){
  return ["Bengaluru", "Mysuru", "Mandya", "Tumakuru", "Shivamogga"];
}
function getLocations(){
  const data = localStorage.getItem("locations");
  if(!data){
    localStorage.setItem("locations", JSON.stringify(defaultLocations()));
    return defaultLocations();
  }
  return JSON.parse(data);
}
function saveLocations(locations){
  localStorage.setItem("locations", JSON.stringify(locations));
}
