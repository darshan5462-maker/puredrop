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

    const role = document.getElementById("role").value;

    const user = {
      id: Date.now(),
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim().toLowerCase(),
      password: document.getElementById("password").value,
      role: role,
      location: document.getElementById("location").value,
    };

    // ✅ basic validations
    if (!user.name || !user.email || !user.password) return alert("Fill all fields");
    if (!user.role) return alert("Please select role");
    if (!user.location) return alert("Please select city");

    // ✅ Address only for CUSTOMER
    if (role === "customer") {
      user.address = {
        house: document.getElementById("house").value.trim(),
        street: document.getElementById("street").value.trim(),
        landmark: document.getElementById("landmark").value.trim(),
        pincode: document.getElementById("pincode").value.trim(),
      };

      if (!user.address.house || !user.address.street || !user.address.pincode) {
        return alert("Please fill full address (House, Street, Pincode)");
      }
    }

    const users = getUsers();

    // ✅ check email already exists
    if (users.find(u => u.email === user.email)) {
      return alert("Email already registered!");
    }

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

