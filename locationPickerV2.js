function setupDistrictCityPicker(){
  const districtSelect = document.getElementById("district");
  const cityInput = document.getElementById("locSearch");
  const dropdown = document.getElementById("locDropdown");
  const hidden = document.getElementById("location");

  if(!districtSelect || !cityInput || !dropdown || !hidden) return;

  const data = karnatakaDistrictCities();

  // Fill districts
  const districts = Object.keys(data).sort();
  districtSelect.innerHTML =
    `<option value="">Select District</option>` +
    districts.map(d => `<option value="${d}">${d}</option>`).join("");

  let currentCities = [];

  function renderCities(list){
    dropdown.innerHTML = "";

    if(!districtSelect.value){
      dropdown.style.display = "none";
      return;
    }

    if(!list.length){
      dropdown.innerHTML = `<div class="loc-empty">No cities found</div>`;
      dropdown.style.display = "block";
      return;
    }

    dropdown.innerHTML = list.map(city => `
      <div class="loc-item" data-city="${city}">
        <div class="loc-city">${city}</div>
        <div class="loc-dist">${districtSelect.value}</div>
      </div>
    `).join("");

    dropdown.style.display = "block";

    dropdown.querySelectorAll(".loc-item").forEach(item=>{
      item.addEventListener("click", ()=>{
        const city = item.getAttribute("data-city");

        cityInput.value = city;
        hidden.value = `${city}, ${districtSelect.value}`; // ✅ stored value
        dropdown.style.display = "none";
      });
    });
  }

  districtSelect.addEventListener("change", ()=>{
    const dist = districtSelect.value;

    cityInput.value = "";
    hidden.value = "";

    if(!dist){
      currentCities = [];
      dropdown.style.display = "none";
      return;
    }

    currentCities = data[dist] || [];
    renderCities(currentCities);
  });

  cityInput.addEventListener("focus", ()=>{
    if(currentCities.length) renderCities(currentCities);
  });

  cityInput.addEventListener("input", ()=>{
    const q = cityInput.value.trim().toLowerCase();
    const filtered = currentCities.filter(c => c.toLowerCase().includes(q));
    renderCities(filtered);
  });

  // close dropdown
  document.addEventListener("click", (e)=>{
    if(!e.target.closest(".loc-picker")){
      dropdown.style.display = "none";
    }
  });
}
