const user = getCurrentUser();
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
