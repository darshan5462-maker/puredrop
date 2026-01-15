function applyTheme(){
  const t = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", t);
}

function toggleTheme(){
  const current = localStorage.getItem("theme") || "light";
  const next = current === "light" ? "dark" : "light";
  localStorage.setItem("theme", next);
  applyTheme();
}

applyTheme();
