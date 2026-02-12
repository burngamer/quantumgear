const track = document.getElementById('carousel-track');

// 1. Inject Products into Carousel
function initCarousel() {
    track.innerHTML = products.map(product => {
        // Fix the path: change "../images/" to "./images/" for the Home page
        const fixedPath = product.image.replace('../images/', './images/');
        
        return `
            <div class="carousel-slide">
                <img src="${fixedPath}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
        `;
    }).join('');
}

initCarousel();

// 2. Carousel Movement Logic
let index = 0;
const slides = document.querySelectorAll('.carousel-slide');

function moveSlide(step) {
    index = (index + step + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById('homeNextBtn').addEventListener('click', () => moveSlide(1));
document.getElementById('homePrevBtn').addEventListener('click', () => moveSlide(-1));

// Auto-slide every 4 seconds
setInterval(() => moveSlide(1), 4000);

/* --- Keep your existing Theme & Hamburger logic below --- */
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
function displayActivity() {
    const list = document.getElementById('activity-list');
    if (!list) return; // Prevents errors if not on home page
    
    const logs = JSON.parse(localStorage.getItem('activityLog')) || [];
    
    if (logs.length === 0) {
        list.innerHTML = `<li class="activity-item">System idle... No recent activity.</li>`;
        return;
    }
    
    list.innerHTML = logs.map(log => `
        <li class="activity-item">
            <span class="time">[${log.time}]</span> ${log.text}
        </li>
    `).join('');
}

// Call this function when the page loads
displayActivity();