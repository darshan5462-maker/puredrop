function renderPlans(){
  const plans = getPlans();
  const wrap = document.getElementById("plansAdmin");

  wrap.innerHTML = plans.map(p => `
    <div class="order-card">
      <b>${p.name}</b>
      <div class="muted">Unit: ${p.unit}</div>
      <div class="row">
        <input type="number" id="price-${p.id}" value="${p.price}" />
      </div>
    </div>
  `).join("");
}

function savePlanChanges(){
  let plans = getPlans();
  plans = plans.map(p => ({
    ...p,
    price: Number(document.getElementById(`price-${p.id}`).value || p.price)
  }));
  savePlans(plans);
  alert("✅ Prices updated!");
}

function renderLocations(){
  const locations = getLocations();
  const wrap = document.getElementById("locList");

  wrap.innerHTML = locations.map((loc, i)=>`
    <div class="order-card">
      <b>📍 ${loc}</b>
      <button class="btn-outline small" onclick="removeLocation(${i})">Remove</button>
    </div>
  `).join("");
}

function addLocation(){
  const val = document.getElementById("newLoc").value.trim();
  if(!val) return alert("Enter location");

  const locations = getLocations();
  if(locations.includes(val)) return alert("Already exists");

  locations.push(val);
  saveLocations(locations);
  document.getElementById("newLoc").value = "";
  renderLocations();
}

function removeLocation(index){
  const locations = getLocations();
  locations.splice(index, 1);
  saveLocations(locations);
  renderLocations();
}

renderPlans();
renderLocations();
