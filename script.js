


// ======================================
// SMART CANTEEN MANAGEMENT SYSTEM 2.0
// ======================================

// 1. FOOD MENU


const foods = [
    // CANTEEN 1 - MAIN CANTEEN
    { name: "Dosa", category: "Breakfast", price: 30, portion: "2 pieces", stock: 50, canteen: "Canteen 1", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600" },
    { name: "Idli", category: "Breakfast", price: 20, portion: "3 pieces", stock: 60, canteen: "Canteen 1", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600" },
    { name: "Pongal", category: "Breakfast", price: 35, portion: "1 plate", stock: 30, canteen: "Canteen 1", image: "https://loremflickr.com/600/400/indian,pongal" },
    { name: "Vada", category: "Breakfast", price: 15, portion: "2 pieces", stock: 40, canteen: "Canteen 1", image: "https://loremflickr.com/600/400/medu,vada" },
    { name: "Poori", category: "Breakfast", price: 40, portion: "3 pieces + curry", stock: 25, canteen: "Canteen 1", image: "https://loremflickr.com/600/400/poori,indian" },
    { name: "Veg Meals", category: "Lunch", price: 60, portion: "1 full plate", stock: 80, canteen: "Canteen 1", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600" },
    { name: "Chicken Biryani", category: "Lunch", price: 100, portion: "1 plate", stock: 40, canteen: "Canteen 1", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600" },
    { name: "Lemon Rice", category: "Lunch", price: 40, portion: "1 plate", stock: 40, canteen: "Canteen 1", image: "https://loremflickr.com/600/400/lemon,rice" },
    { name: "Curd Rice", category: "Lunch", price: 35, portion: "1 bowl", stock: 35, canteen: "Canteen 1", image: "https://loremflickr.com/600/400/curd,rice" },
    { name: "Sambar Rice", category: "Lunch", price: 45, portion: "1 plate", stock: 35, canteen: "Canteen 1", image: "https://loremflickr.com/600/400/sambar,rice" },
    { name: "Egg Fried Rice", category: "Lunch", price: 70, portion: "1 plate", stock: 30, canteen: "Canteen 1", image: "https://loremflickr.com/600/400/egg,fried,rice" },

    // CANTEEN 2 - SNACK CORNER
    { name: "Samosa", category: "Snacks", price: 15, portion: "2 pieces", stock: 50, canteen: "Canteen 2", image: "https://loremflickr.com/600/400/samosa" },
    { name: "Veg Puff", category: "Snacks", price: 20, portion: "1 piece", stock: 40, canteen: "Canteen 2", image: "https://loremflickr.com/600/400/vegetable,puff" },
    { name: "Bajji", category: "Snacks", price: 20, portion: "4 pieces", stock: 30, canteen: "Canteen 2", image: "https://loremflickr.com/600/400/pakora" },
    { name: "Sandwich", category: "Snacks", price: 40, portion: "1 sandwich", stock: 25, canteen: "Canteen 2", image: "https://loremflickr.com/600/400/sandwich" },

    // CANTEEN 3 - JUICE CORNER
    { name: "Juice", category: "Beverages", price: 25, portion: "250 ml", stock: 60, canteen: "Canteen 3", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600" },
    { name: "Tea", category: "Beverages", price: 10, portion: "1 cup", stock: 100, canteen: "Canteen 3", image: "https://loremflickr.com/600/400/indian,tea" },
    { name: "Coffee", category: "Beverages", price: 15, portion: "1 cup", stock: 100, canteen: "Canteen 3", image: "https://loremflickr.com/600/400/coffee" },
    { name: "Lime Soda", category: "Beverages", price: 20, portion: "300 ml", stock: 40, canteen: "Canteen 3", image: "https://loremflickr.com/600/400/lime,soda" },
    { name: "Buttermilk", category: "Beverages", price: 15, portion: "250 ml", stock: 50, canteen: "Canteen 3", image: "https://loremflickr.com/600/400/buttermilk" }
];


// 2. VARIABLES

let cart = [];
let orders = JSON.parse(
    localStorage.getItem("orders") || "[]"
);
function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
}
const menuEl = document.getElementById("menu");
const searchEl = document.getElementById("search");
const categoryEl = document.getElementById("category");
const nameEl = document.getElementById("userName");
const orderListEl = document.getElementById("orderList");
const totalEl = document.getElementById("total");

let selected = {};

// 3. TOKEN GENERATION

function generateToken() {
    return "SC" + Date.now().toString().slice(-6);
}

// 4. DISPLAY MENU


function renderMenu() {

    const searchText = searchEl.value.trim().toLowerCase();
    const selectedCategory = categoryEl.value;

    const selectedCanteen =
        document.getElementById("canteenSelect").value;

    const filtered = foods
        .map((food, index) => ({ food, index }))
        .filter(({ food }) => {

            const matchesCanteen =
                food.canteen === selectedCanteen;

            const matchesSearch =
                food.name.toLowerCase().includes(searchText);

            const matchesCategory =
                selectedCategory === "All" ||
                food.category === selectedCategory;

            return matchesCanteen &&
                   matchesSearch &&
                   matchesCategory;
        });

    menuEl.innerHTML = "";

    if (filtered.length === 0) {
        menuEl.innerHTML = '<p class="empty">No food found.</p>';
        return;
    }

    filtered.forEach(({ food, index }) => {

        const quantity = selected[index] || 1;

        menuEl.innerHTML += `
            <div class="card">

                <img src="${food.image}" alt="${food.name}"
                     onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">

                <div class="noimg">${food.name}</div>

                <div class="info">
                    <h3>${food.name}</h3>
                    <span class="meta">
                        ${food.category} · ${food.portion}
                    </span>
                    <span class="price">₹${food.price}</span>
                    <span class="stock">
                        ${food.stock > 0
                            ? "Available: " + food.stock
                            : "Sold out"}
                    </span>

                    <div class="qty">
                        <button onclick="changeQty(${index},-1)">-</button>
                        <span>${quantity}</span>
                        <button onclick="changeQty(${index},1)">+</button>
                    </div>

                    <button class="add"
                        onclick="addToOrder(${index})"
                        ${food.stock <= 0 ? "disabled" : ""}>
                        Add to order
                    </button>
                </div>
            </div>
        `;
    });
}

// 5. CHANGE QUANTITY

function changeQty(index, change) {
    const food = foods[index];
    const current = selected[index] || 1;

    selected[index] = Math.max(1, Math.min(food.stock, current + change));
    renderMenu();
}

// 6. ADD TO CART

function addToOrder(index) {
    const food = foods[index];
    const quantity = selected[index] || 1;

    const existing = cart.find(item => item.index === index);
    const alreadyAdded = existing ? existing.qty : 0;

    if (alreadyAdded + quantity > food.stock) {
        alert("Not enough stock available!");
        return;
    }

    if (existing) {
        existing.qty += quantity;
    } else {
        cart.push({ index: index, qty: quantity });
    }

    selected[index] = 1;

    renderOrder();
    renderMenu();
}

// 7. DISPLAY CART

function renderOrder() {
    orderListEl.innerHTML = "";

    if (cart.length === 0) {
        orderListEl.innerHTML = "<li>No items added yet.</li>";
    }

    cart.forEach(item => {
        const food = foods[item.index];

        orderListEl.innerHTML += `
            <li>
                <span>${food.name} × ${item.qty}</span>
                <span>
                    ₹${food.price * item.qty}
                    <button onclick="removeFromOrder(${item.index})">-</button>
                </span>
            </li>
        `;
    });

    const total = cart.reduce(
        (sum, item) => sum + foods[item.index].price * item.qty, 0
    );

    totalEl.textContent = total;
    updatePaymentTotal();
}

// 8. REMOVE ITEM

function removeFromOrder(index) {
    const item = cart.find(item => item.index === index);

    if (!item) return;

    item.qty--;

    if (item.qty <= 0) {
        cart = cart.filter(item => item.index !== index);
    }

    renderOrder();
    renderMenu();
}

// 9. PLACE ORDER


function placeOrder() {

    const student = nameEl.value.trim();

    const registerNumber =
        document.getElementById("registerNumber").value.trim();

    const paymentMethod =
        document.getElementById("paymentMethod").value;

    if (!student) {
        alert("Please enter your name.");
        return;
    }

    if (!registerNumber) {
        alert("Please enter your register number.");
        return;
    }

    if (cart.length === 0) {
        alert("Please add food to your cart.");
        return;
    }

    const token = generateToken();

    const total = cart.reduce(
        (sum, item) =>
            sum + foods[item.index].price * item.qty, 0
    );

    const items = cart.map(item => ({
        name: foods[item.index].name,
        quantity: item.qty,
        price: foods[item.index].price
    }));

    const newOrder = {
        token: token,
        student: student,
        registerNumber: registerNumber,
        items: items,
        total: total,
        paymentMethod: paymentMethod,
        status: "Ordered",
        date: new Date().toLocaleString()
    };

    orders.push(newOrder);
    saveOrders();

    document.getElementById("tokenNumber").textContent = token;

    document.getElementById("confirmationDetails").textContent =
        "Student: " + student +
        " | Total: ₹" + total +
        " | Payment: " + paymentMethod;

    document.getElementById("confirmation").style.display = "block";

    // Reduce food stock
    cart.forEach(item => {
        foods[item.index].stock -= item.qty;
    });

    // Clear cart
    cart = [];

    renderOrder();
    renderMenu();

    alert("Order placed successfully! Your token is " + token);
      document.getElementById("placeOrder")
    .addEventListener("click", placeOrder);
}


    // Display token
{
    document.getElementById("tokenDisplay").innerHTML =
        `<h3>Your Token Number: ${token}</h3>`;

    document.getElementById("tokenNumber").textContent = token;

    document.getElementById("confirmationDetails").textContent =
        "Student: " + student + " | Total: ₹" + total;

    document.getElementById("confirmation").style.display = "block";
    // DISPLAY ORDER RECEIPT

document.getElementById("receipt").style.display = "block";

document.getElementById("receiptName").textContent =
    "Student Name: " + studentName;

document.getElementById("receiptToken").textContent =
    "Token Number: " + token;

document.getElementById("receiptItems").innerHTML =
    orderDetails.map(item =>
        `<p>${escapeHTML(item.name)} × ${item.quantity} - ₹${item.price * item.quantity}</p>`
    ).join("");

document.getElementById("receiptTotal").textContent =
    "Total Amount: ₹" + orderTotal;

document.getElementById("receiptPayment").textContent =
    "Payment Method: " + paymentMethod;
    // Display order receipt
document.getElementById("receipt").style.display = "block";

document.getElementById("receiptName").textContent =
    "Student Name: " + studentName;

document.getElementById("receiptToken").textContent =
    "Token Number: " + token;

document.getElementById("receiptItems").innerHTML =
    orderDetails.map(item =>
        `<p>${escapeHTML(item.name)} × ${item.quantity} - ₹${item.price * item.quantity}</p>`
    ).join("");

document.getElementById("receiptTotal").textContent =
    "Total Amount: ₹" + orderTotal;

document.getElementById("receiptPayment").textContent =
    "Payment Method: " + paymentMethod;

    // Reduce stock

    cart.forEach(item => {
        foods[item.index].stock -= item.qty;
    });

    // Clear cart

    cart = [];

    renderOrder();
    renderMenu();

    alert("Order placed successfully! Your token is " + token);
}

// CONNECT BUTTON

document.getElementById("placeOrder").addEventListener("click", placeOrder);

// 10. TRACK ORDER

function trackOrder() {

    const token = document.getElementById("trackToken")
        .value.trim().toUpperCase();

    const result = document.getElementById("trackingResult");

    if (!token) {
        result.textContent = "Please enter your token number.";
        return;
    }

    const foundOrder = orders.find(
        order => order.token.toUpperCase() === token
    );

    if (!foundOrder) {
        result.textContent = "Order not found. Please check your token.";
        return;
    }

    const items = foundOrder.items.map(item =>
        `${escapeHTML(item.name)} × ${item.quantity}`
    ).join(", ");

    result.innerHTML = `
        <h3>Order Details</h3>
        <p><strong>Student:</strong> ${escapeHTML(foundOrder.student)}</p>
        <p><strong>Register Number:</strong> ${escapeHTML(foundOrder.registerNumber || "Not available")}</p>
        <p><strong>Token:</strong> ${escapeHTML(foundOrder.token)}</p>
        <p><strong>Food Items:</strong> ${items}</p>
        <p><strong>Total:</strong> ₹${foundOrder.total}</p>
        <p><strong>Status:</strong> ${escapeHTML(foundOrder.status)}</p>
    `;
}

// 11. FEEDBACK

function submitFeedback() {
    const rating = document.getElementById("rating").value;
    const feedback = document.getElementById("feedback").value.trim();

    if (!feedback) {
        alert("Please enter your feedback.");
        return;
    }

    let feedbackList = JSON.parse(localStorage.getItem("feedback") || "[]");

    feedbackList.push({
        rating: rating,
        feedback: feedback,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("feedback", JSON.stringify(feedbackList));

    document.getElementById("feedbackMessage").textContent =
        "Thank you for your feedback!";

    document.getElementById("feedback").value = "";
}

// 12. EXPORT ORDERS

function exportOrders() {
    if (orders.length === 0) {
        alert("No orders available to download.");
        return;
    }

    let csv = "Token,Student,Food,Total,Status,Date\n";

    orders.forEach(order => {
        const foodNames = order.items.map(item =>
            item.name + " x " + item.quantity
        ).join("; ");

        csv += `"${order.token}","${order.student}","${foodNames}",${order.total},"${order.status}","${order.date}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "canteen_orders.csv";
    link.click();

    URL.revokeObjectURL(link.href);
}

// 13. ROLE SELECTOR
// =====================================
// STUDENT / ADMIN DASHBOARD SWITCH
// =====================================

function switchDashboard(role) {

    const student = document.getElementById("studentDashboard");
    const admin = document.getElementById("adminDashboard");

    if (role === "admin") {

        student.style.display = "none";
        admin.style.display = "block";

        displayAdminOrders();

    } else {

        student.style.display = "block";
        admin.style.display = "none";

    }
}

// 14. SEARCH AND CATEGORY

searchEl.addEventListener("input", renderMenu);
categoryEl.addEventListener("change", renderMenu);

nameEl.addEventListener("input", function() {
    const greeting = document.getElementById("greeting");

    greeting.textContent = this.value.trim()
        ? "Hello, " + this.value.trim() + "! What would you like today?"
        : "Welcome! Order your food below.";
});

// 15. INITIALIZE WEBSITE

// Fill category dropdown
[...new Set(foods.map(food => food.category))].forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryEl.appendChild(option);
});

renderMenu();
renderOrder();

console.log("Smart Canteen loaded successfully!");


// =====================================
// ADMIN AND CUSTOMER LOGIN
// =====================================

function loginUser() {

    const role = document.getElementById("loginRole").value;
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    if (
        role === "admin" &&
        username === "admin" &&
        password === "admin123"
    ) {

        document.getElementById("loginPage").style.display = "none";

        message.textContent = "";

        switchDashboard("admin");

    }

    else if (
        role === "customer" &&
        username === "customer" &&
        password === "customer123"
    ) {

        document.getElementById("loginPage").style.display = "none";

        message.textContent = "";

        switchDashboard("customer");

    }

    else {

        message.style.color = "red";
        message.textContent = "Invalid Username or Password!";

    }
}
localStorage.setItem("loggedInUser", JSON.stringify({
    username: username,
    role: "admin"
}));
localStorage.setItem("loggedInUser", JSON.stringify({
    username: username,
    role: "customer"
}));
window.onload = function () {

    const savedUser = localStorage.getItem("loggedInUser");

    if (savedUser) {

        const user = JSON.parse(savedUser);

        document.getElementById("loginPage").style.display = "none";

        switchDashboard(user.role);
    }
};function logout() {

    localStorage.removeItem("loggedInUser");

    document.getElementById("adminDashboard").style.display = "none";
    document.getElementById("studentDashboard").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}