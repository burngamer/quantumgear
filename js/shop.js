const productGrid = document.getElementById('product-grid');

// Function to display products
function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="price">$${product.price}</span>
                    <button class="buy-btn" onclick="addToCart(${product.id})">Add to Gear</button>
                </div>
            </div>
        </div>
    `).join('');
}
function logActivity(message) {
    let logs = JSON.parse(localStorage.getItem('activityLog')) || [];
    const newLog = {
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    logs.unshift(newLog);
    if (logs.length > 5) logs.pop();
    localStorage.setItem('activityLog', JSON.stringify(logs));
}
// Simple Cart Alert for now
function addToCart(id) {
    // 1. Find the product details from products.js
    const item = products.find(p => p.id === id);
    
    // 2. Calculate a "Due Date" (5 days from today)
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 5);
    const formattedDate = futureDate.toISOString().split('T')[0]; // Formats as YYYY-MM-DD

    // 3. Create the Order Object
    const newOrder = {
        name: item.name,
        desc: item.description,
        price: item.price, // Capturing the price from the store
        date: formattedDate,
        priority: "Medium",
        completed: false
    };

    // 4. Retrieve existing orders or start fresh
    let currentOrders = JSON.parse(localStorage.getItem('userOrders')) || [];
    
    // 5. Add the new item and save
    currentOrders.push(newOrder);
    localStorage.setItem('userOrders', JSON.stringify(currentOrders));
	logActivity(`Product: ${item.name} added to dispatch`);

    alert(`${item.name} has been deployed to your Orders terminal!`);
}

// Initial Call
displayProducts();

/* --- Keep your standard Theme & Hamburger logic below here --- */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 1. Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '☀️'; // Change icon to sun
}

// 2. Toggle theme on click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '🌙';
    }
});


const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
