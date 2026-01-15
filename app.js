// REGISTER
/*const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = {
      id: Date.now(),
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
      location: document.getElementById("location").value,
    };

    const users = getUsers();

    if (users.find(u => u.email === user.email)) {
      alert("Email already registered!");
      return;
    }

    users.push(user);
    saveUsers(users);

    alert("Registered Successfully ✅");
    window.location.href = "login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid Login ❌");
      return;
    }

    setCurrentUser(user);

    alert("Login Success ✅");

    if (user.role === "customer") window.location.href = "customer.html";
    else window.location.href = "delivery.html";
  });
}*/
// ---------------- REGISTER ----------------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  // load locations into dropdown
  const locSelect = document.getElementById("location");
  if (locSelect) {
    const locations = getLocations();
    locSelect.innerHTML =
      `<option value="">Select Location</option>` +
      locations.map(l => `<option value="${l}">${l}</option>`).join("");
  }

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = {
      id: Date.now(),
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim().toLowerCase(),
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
      location: document.getElementById("location").value,
    };

    const users = getUsers();

    if (users.find(u => u.email === user.email)) {
      alert("Email already registered!");
      return;
    }

    if (!user.role) return alert("Please select role");
    if (!user.location) return alert("Please select city from list");


    users.push(user);
    saveUsers(users);

    alert("Registered Successfully ✅");
    window.location.href = "login.html";
  });
}

// ---------------- LOGIN ----------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid Login ❌");
      return;
    }

    setCurrentUser(user);
    alert("Login Success ✅");

    if (user.role === "customer") window.location.href = "customer.html";
    else window.location.href = "delivery.html";
  });
}

