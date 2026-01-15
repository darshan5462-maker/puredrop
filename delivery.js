/*const user = getCurrentUser();
if (!user || user.role !== "delivery") {
  window.location.href = "login.html";
}

document.getElementById("deliveryName").innerText = user.name;
document.getElementById("deliveryLocation").innerText = "📍 " + user.location;

function renderDeliveryOrders(){
  const orders = getOrders();
  const list = document.getElementById("deliveryOrders");

  // orders in same location
  const nearOrders = orders.filter(o => o.location.toLowerCase() === user.location.toLowerCase());

  // stats
  document.getElementById("totalInLocation").innerText = nearOrders.length;
  document.getElementById("acceptedCount").innerText = nearOrders.filter(o => o.status==="Accepted" && o.assignedDelivery===user.name).length;
  document.getElementById("deliveredCount").innerText = nearOrders.filter(o => o.status==="Delivered" && o.assignedDelivery===user.name).length;

  if (nearOrders.length === 0){
    list.innerHTML = `<p class="muted">No orders in your location right now.</p>`;
    return;
  }

  list.innerHTML = nearOrders.reverse().map(o => `
    <div class="order-card">
      <b>${o.plan}</b>
      <div class="muted">Customer: ${o.customerName}</div>
      <div class="muted">Qty: ${o.quantity} • Total: <b>₹${o.total}</b></div>
      <div class="muted">📍 ${o.location}</div>
      <div class="muted">🕒 ${o.createdAt}</div>

      <span class="status ${statusClass(o.status)}">${o.status}</span>

      ${renderButtons(o)}
    </div>
  `).join("");
}

function renderButtons(order){
  // Pending: any delivery boy can accept/reject
  if(order.status === "Pending"){
    return `
      <button class="btn small" onclick="acceptOrder(${order.id})">Accept</button>
      <button class="btn-outline small" onclick="rejectOrder(${order.id})">Reject</button>
    `;
  }

  // Accepted: only same delivery boy can deliver
  if(order.status === "Accepted" && order.assignedDelivery === user.name){
    return `<button class="btn small" onclick="markDelivered(${order.id})">Mark Delivered</button>`;
  }

  // other delivery boy accepted
  if(order.status === "Accepted"){
    return `<p class="muted">Already accepted by ${order.assignedDelivery}</p>`;
  }

  return "";
}

function acceptOrder(id){
  const orders = getOrders();
  const order = orders.find(o => o.id === id);

  if (!order || order.status !== "Pending") return;

  order.status = "Accepted";
  order.assignedDelivery = user.name;

  saveOrders(orders);
  alert("✅ Order Accepted!");
  renderDeliveryOrders();
}

function rejectOrder(id){
  const orders = getOrders();
  const order = orders.find(o => o.id === id);

  if (!order || order.status !== "Pending") return;

  order.status = "Rejected";
  order.assignedDelivery = user.name;

  saveOrders(orders);
  alert("❌ Order Rejected!");
  renderDeliveryOrders();
}

function markDelivered(id){
  const orders = getOrders();
  const order = orders.find(o => o.id === id);

  if (!order || order.status !== "Accepted") return;
  if (order.assignedDelivery !== user.name) return alert("Not your order!");

  order.status = "Delivered";

  saveOrders(orders);
  alert("📦 Delivered Successfully!");
  renderDeliveryOrders();
}

function statusClass(status){
  if(status==="Pending") return "pending";
  if(status==="Accepted") return "accepted";
  if(status==="Delivered") return "delivered";
  if(status==="Rejected") return "rejected";
  return "pending";
}

renderDeliveryOrders();
function scrollToOrders(){
  document.querySelector(".mt")?.scrollIntoView({behavior:"smooth"});
} */
const user = getCurrentUser();
if (!user || user.role !== "delivery") window.location.href = "login.html";

document.getElementById("deliveryName").innerText = user.name;
document.getElementById("deliveryLocation").innerText = "📍 " + user.location;

function renderDeliveryOrders(){
  const orders = getOrders();
  const list = document.getElementById("deliveryOrders");

  const nearOrders = orders.filter(o => o.location.toLowerCase() === user.location.toLowerCase());

  document.getElementById("totalInLocation").innerText = nearOrders.length;
  document.getElementById("acceptedCount").innerText = nearOrders.filter(o => o.status==="Accepted" && o.assignedDelivery===user.name).length;
  document.getElementById("deliveredCount").innerText = nearOrders.filter(o => o.status==="Delivered" && o.assignedDelivery===user.name).length;

  if (nearOrders.length === 0){
    list.innerHTML = `<p class="muted">No orders in your location right now.</p>`;
    return;
  }
  // New order notification (Pending count change)
const pendingCount = nearOrders.filter(o => o.status === "Pending").length;
if(pendingCount > lastCount){
  notifyNewOrder();
}
lastCount = pendingCount;


  list.innerHTML = nearOrders.reverse().map(o => `
    <div class="order-card">
      <b>${o.plan}</b>
      <div class="muted">Customer: <b>${o.customerName}</b></div>
      <div class="muted">Qty: ${o.quantity} • Total: <b>₹${o.total}</b></div>
      <div class="muted">Payment: <b>${o.payment || "Cash"}</b></div>
      <div class="muted">📍 ${o.location}</div>
      <div class="muted">🕒 ${o.createdAt}</div>

      <div class="track">
        <div class="track-title">Tracking:</div>
        <div class="track-step">${o.tracking || "Order Placed"}</div>
      </div>

      <span class="status ${statusClass(o.status)}">${o.status}</span>

      ${renderButtons(o)}
    </div>
  `).join("");
}
let lastCount = 0;

function beep(){
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 700;
    gain.gain.value = 0.12;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    setTimeout(()=>{ osc.stop(); ctx.close(); }, 250);
  }catch(e){}
}

function notifyNewOrder(){
  beep();
  alert("🔔 New Order Received in your location!");
}


function renderButtons(order){
  if(order.status === "Pending"){
    return `
      <button class="btn small" onclick="acceptOrder(${order.id})">Accept</button>
      <button class="btn-outline small" onclick="rejectOrder(${order.id})">Reject</button>
    `;
  }

  if(order.status === "Accepted" && order.assignedDelivery === user.name){
    return `
      <button class="btn small" onclick="outForDelivery(${order.id})">Out for Delivery</button>
      <div class="otpBox">
        <input id="otp-${order.id}" placeholder="Enter Customer OTP" />
        <button class="btn small" onclick="verifyOTP(${order.id})">Verify & Deliver</button>
      </div>
    `;
  }

  if(order.status === "Out for Delivery" && order.assignedDelivery === user.name){
    return `
      <div class="otpBox">
        <input id="otp-${order.id}" placeholder="Enter Customer OTP" />
        <button class="btn small" onclick="verifyOTP(${order.id})">Verify & Deliver</button>
      </div>
    `;
  }

  if(order.status === "Accepted" || order.status === "Out for Delivery"){
    return `<p class="muted">Already accepted by ${order.assignedDelivery}</p>`;
  }

  return "";
}

function acceptOrder(id){
  const orders = getOrders();
  const order = orders.find(o => o.id === id);
  if (!order || order.status !== "Pending") return;

  order.status = "Accepted";
  order.tracking = "Delivery Boy Assigned";
  order.assignedDelivery = user.name;

  saveOrders(orders);
  alert("✅ Order Accepted!");
  renderDeliveryOrders();
}

function outForDelivery(id){
  const orders = getOrders();
  const order = orders.find(o => o.id === id);
  if (!order || order.status !== "Accepted") return;

  order.status = "Out for Delivery";
  order.tracking = "Out for Delivery 🚚";

  saveOrders(orders);
  renderDeliveryOrders();
}

function rejectOrder(id){
  const orders = getOrders();
  const order = orders.find(o => o.id === id);
  if (!order || order.status !== "Pending") return;

  order.status = "Rejected";
  order.tracking = "Rejected by Delivery";
  order.assignedDelivery = user.name;

  saveOrders(orders);
  alert("❌ Order Rejected!");
  renderDeliveryOrders();
}

function verifyOTP(id){
  const orders = getOrders();
  const order = orders.find(o => o.id === id);
  if (!order) return;

  const input = document.getElementById(`otp-${id}`)?.value?.trim();
  if (!input) return alert("Enter OTP");
  if (input !== order.otp) return alert("❌ Wrong OTP!");

  order.status = "Delivered";
  order.tracking = "Delivered ✅";

  saveOrders(orders);
  alert("✅ Delivered Successfully!");
  renderDeliveryOrders();
}

function statusClass(status){
  if(status==="Pending") return "pending";
  if(status==="Accepted" || status==="Out for Delivery") return "accepted";
  if(status==="Delivered") return "delivered";
  if(status==="Rejected") return "rejected";
  return "pending";
}

function scrollToOrders(){
  document.querySelector(".mt")?.scrollIntoView({behavior:"smooth"});
}

renderDeliveryOrders();


