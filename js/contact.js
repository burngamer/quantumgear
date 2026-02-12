const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const contactForm = document.getElementById('contact-form');

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
// 1. FORM SUBMISSION LOGIC
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page from refreshing

    // Capture values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validation Check (HTML5 handles most, but we can double check)
    if(name && email && subject && message) {
        // Confirmation Pop-up
        alert(`Transmission Received, ${name}!\n\nDetails Captured:\nEmail: ${email}\nSubject: ${subject}\n\nWe will contact you shortly.`);
        
        // Reset the form
        contactForm.reset();
    }
});