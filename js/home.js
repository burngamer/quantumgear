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
async function fetchWeatherData() {
    const weatherContainer = document.getElementById('weather-container');
    
    try {
        // Updated URL for Agia Paraskevi, Athens
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=38.0046&longitude=23.8152&current_weather=true');
        const data = await response.json();
        
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        const code = data.current_weather.weathercode;

        // Map weather codes to tech-themed status
        let status = "Clear Skies";
        if (code > 0 && code <= 3) status = "Partly Cloudy";
        if (code >= 45 && code <= 48) status = "Fog Detected";
        if (code >= 51) status = "Precipitation Detected";

        weatherContainer.innerHTML = `
            <div class="weather-info">
                <div class="temp-display">${temp}°C</div>
                <div class="weather-details">
                    <p><strong>Status:</strong> ${status}</p>
                    <p><strong>Wind Speed:</strong> ${wind} km/h</p>
                    <p><strong>Sector:</strong> Agia Paraskevi, Athens</p>
                </div>
            </div>
            <p class="api-note">Live telemetry fetched via Open-Meteo API</p>
        `;
    } catch (error) {
        console.error("Weather error:", error);
        weatherContainer.innerHTML = `<p>Error: Satellite Link Offline.</p>`;
    }
}

// Initialize the fetch
fetchWeatherData();
