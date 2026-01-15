/*const user = getCurrentUser();
if (!user || user.role !== "customer") {
  window.location.href = "login.html";
}

document.getElementById("userName").innerText = user.name;
document.getElementById("userLocation").innerText = "📍 " + user.location;

function placeOrder(){
  const planValue = document.querySelector("input[name='plan']:checked").value;
  const [plan, price] = planValue.split("|");

  const quantity = parseInt(document.getElementById("quantity").value || "1");
  if (quantity <= 0) return alert("Enter valid quantity");

  const total = quantity * parseInt(price);

  const orders = getOrders();
  orders.push({
    id: Date.now(),
    customerId: user.id,
    customerName: user.name,
    location: user.location,
    plan,
    price: parseInt(price),
    quantity,
    total,
    status: "Pending",
    assignedDelivery: null,
    createdAt: new Date().toLocaleString()
  });

  saveOrders(orders);
  alert("✅ Order placed successfully!");
  renderOrders();
}

function renderOrders(){
  const orders = getOrders().filter(o => o.customerId === user.id);
  const list = document.getElementById("orderList");

  if (orders.length === 0){
    list.innerHTML = `<p class="muted">No orders yet. Place your first order ✅</p>`;
  } else {
    list.innerHTML = orders.reverse().map(o => `
      <div class="order-card">
        <b>${o.plan}</b>
        <div class="muted">Qty: ${o.quantity} • ₹${o.price} each</div>
        <div class="muted">Total: <b>₹${o.total}</b></div>
        <div class="muted">📍 ${o.location}</div>
        <div class="muted">🕒 ${o.createdAt}</div>

        <span class="status ${statusClass(o.status)}">${o.status}</span>
        ${o.assignedDelivery ? `<div class="muted">🚚 Delivery: ${o.assignedDelivery}</div>` : ""}
      </div>
    `).join("");
  }

  // summary
  document.getElementById("totalOrders").innerText = orders.length;
  document.getElementById("pendingOrders").innerText = orders.filter(o=>o.status==="Pending" || o.status==="Accepted").length;
  document.getElementById("deliveredOrders").innerText = orders.filter(o=>o.status==="Delivered").length;
}

function statusClass(status){
  if(status==="Pending") return "pending";
  if(status==="Accepted") return "accepted";
  if(status==="Delivered") return "delivered";
  if(status==="Rejected") return "rejected";
  return "pending";
}

renderOrders();
function scrollToOrders(){
  document.querySelector(".mt")?.scrollIntoView({behavior:"smooth"});
} */

const user = getCurrentUser();
if (!user || user.role !== "customer") window.location.href = "login.html";

document.getElementById("userName").innerText = user.name;
document.getElementById("userLocation").innerText = "📍 " + user.location;

function getSelectedPlan(){
  const planValue = document.querySelector("input[name='plan']:checked").value;
  const [plan, price] = planValue.split("|");
  return { plan, price: Number(price) };
}

function generateOTP(){
  return String(Math.floor(1000 + Math.random()*9000)); // 4 digit
}

function placeOrder(){
  const { plan, price } = getSelectedPlan();
  const quantity = parseInt(document.getElementById("quantity").value || "1");
  if (quantity <= 0) return alert("Enter valid quantity");

  // Payment
  const pay = document.querySelector("input[name='payment']:checked")?.value || "Cash";
  const total = quantity * price;
  const otp = generateOTP();

  const orders = getOrders();
  orders.push({
    id: Date.now(),
    customerId: user.id,
    customerName: user.name,
    location: user.location,
    address: user.address || null, 
    plan, price, quantity, total,
    payment: pay,

    // tracking
    status: "Pending",
    tracking: "Order Placed",
    otp,               // customer otp
    assignedDelivery: null,
    createdAt: new Date().toLocaleString()
  });

  saveOrders(orders);
  alert(`✅ Order placed!\nOTP: ${otp} (Show to Delivery Boy)`);
  renderOrders();
}

function renderOrders(){
  const orders = getOrders().filter(o => o.customerId === user.id);
  const list = document.getElementById("orderList");

  if (orders.length === 0){
    list.innerHTML = `<p class="muted">No orders yet. Place your first order ✅</p>`;
  } else {
    list.innerHTML = orders.reverse().map(o => `
      <div class="order-card">
        <b>${o.plan}</b>
        <div class="muted">Qty: ${o.quantity} • ₹${o.price} each</div>
        <div class="muted">Total: <b>₹${o.total}</b> • Payment: <b>${o.payment}</b></div>
        <div class="muted">📍 ${o.location}</div>
        <div class="muted">🕒 ${o.createdAt}</div>

        <div class="track">
          <div class="track-title">Tracking:</div>
          <div class="track-step">${o.tracking}</div>
        </div>

        <span class="status ${statusClass(o.status)}">${o.status}</span>

        ${o.status !== "Delivered" ? `<div class="otp">🔐 OTP: <b>${o.otp}</b></div>` : ""}
        ${o.assignedDelivery ? `<div class="muted">🚚 Delivery: ${o.assignedDelivery}</div>` : ""}
      </div>
    `).join("");
  }

  // summary
  document.getElementById("totalOrders").innerText = orders.length;
  document.getElementById("pendingOrders").innerText =
    orders.filter(o => o.status !== "Delivered" && o.status !== "Rejected").length;
  document.getElementById("deliveredOrders").innerText = orders.filter(o=>o.status==="Delivered").length;
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

// Load dynamic plans into radio list (from admin)
function injectPlans(){
  const plans = getPlans();
  const wrap = document.querySelector(".plans-mini");
  if(!wrap) return;

  wrap.innerHTML = plans.map((p, idx)=>`
    <label class="plan-radio">
      <input type="radio" name="plan" value="${p.name}|${p.price}" ${idx===0?"checked":""}>
      <div>
        <b>${p.name}</b>
        <div class="muted">₹${p.price} ${p.unit}</div>
      </div>
    </label>
  `).join("");
}

injectPlans();
renderOrders();
