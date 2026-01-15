const user = getCurrentUser();
if(!user) window.location.href = "login.html";

document.getElementById("profileRole").innerText = "Role: " + user.role;

document.getElementById("pname").value = user.name;

// load locations
const locSelect = document.getElementById("plocation");
const locations = getLocations();
locSelect.innerHTML =
  `<option value="">Select Location</option>` +
  locations.map(l => `<option value="${l}">${l}</option>`).join("");

locSelect.value = user.location;

document.getElementById("profileForm").addEventListener("submit", (e)=>{
  e.preventDefault();

  const oldPass = document.getElementById("pold").value;
  const newPass = document.getElementById("pnew").value;

  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id);

  if(idx === -1) return alert("User not found");

  if(users[idx].password !== oldPass) return alert("❌ Old password incorrect");

  users[idx].name = document.getElementById("pname").value.trim();
  users[idx].location = locSelect.value;

  if(newPass.trim().length >= 4) users[idx].password = newPass;

  saveUsers(users);
  setCurrentUser(users[idx]);

  alert("✅ Profile updated!");
});
