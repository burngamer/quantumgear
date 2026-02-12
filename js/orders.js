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
let orders = JSON.parse(localStorage.getItem('userOrders')) || [];
let editIndex = -1;

const orderForm = document.getElementById('order-form');
const ordersBody = document.getElementById('orders-body');

// 1. ADD OR UPDATE ORDER
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newOrder = {
        name: document.getElementById('prod-name').value,
        desc: document.getElementById('prod-desc').value,
        date: document.getElementById('due-date').value,
        priority: document.getElementById('priority').value,
        completed: false
    };

    if (editIndex === -1) {
        orders.push(newOrder);
    } else {
        orders[editIndex] = newOrder;
        editIndex = -1;
        document.getElementById('submit-btn').textContent = "Deploy Order";
    }

    saveAndRender();
    orderForm.reset();
});

// 2. RENDER TABLE
function renderOrders(filter = 'All') {
    ordersBody.innerHTML = '';
    let filtered = orders.filter(o => filter === 'All' || o.priority === filter);

    filtered.forEach((order, index) => {
        const row = document.createElement('tr');
        if (order.completed) row.classList.add('completed-row');

        row.innerHTML = `
            <td>${order.name}</td>
            <td>${order.desc}</td>
			<td>$${order.price}</td>
            <td>${order.date}</td>			
            <td class="priority-${order.priority}">${order.priority}</td>
            <td>${order.completed ? 'Delivered' : 'In Transit'}</td>
            <td>
                <button class="status-btn" onclick="toggleStatus(${index})">✔</button>
                <button class="status-btn" onclick="prepareEdit(${index})">Edit</button>
                <button class="status-btn" style="border-color: #ff4d4d; color: #ff4d4d;" onclick="deleteOrder(${index})">Delete</button>
            </td>
        `;
        ordersBody.appendChild(row);
    });
    updateSummary();
}

// 3. ACTIONS
function deleteOrder(index) {
    orders.splice(index, 1);
    saveAndRender();
}

function toggleStatus(index) {
    orders[index].completed = !orders[index].completed;
    saveAndRender();
}

function prepareEdit(index) {
    const order = orders[index];
    document.getElementById('prod-name').value = order.name;
    document.getElementById('prod-desc').value = order.desc;
    document.getElementById('due-date').value = order.date;
    document.getElementById('priority').value = order.priority;
    
    editIndex = index;
    document.getElementById('submit-btn').textContent = "Update Order";
}

function updateSummary() {
    document.getElementById('total-count').textContent = orders.length;
    document.getElementById('pending-count').textContent = orders.filter(o => !o.completed).length;
    document.getElementById('completed-count').textContent = orders.filter(o => o.completed).length;
}

function filterOrders(priority) {
    renderOrders(priority);
}

function saveAndRender() {
    localStorage.setItem('userOrders', JSON.stringify(orders));
    renderOrders();
}

// Initial Load
renderOrders();