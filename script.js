window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    // Prevent scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.about-content, .about-image').forEach(el => {
    observer.observe(el);
});
document.addEventListener('DOMContentLoaded', () => {
const track = document.querySelector('.team-carousel-track');
const cards = document.querySelectorAll('.team-card');
const nextBtn = document.querySelector('.team-carousel-btn.next');
const prevBtn = document.querySelector('.team-carousel-btn.prev');
const dotsContainer = document.querySelector('.team-carousel-dots');

let currentIndex = 0;
const cardWidth = 300 + 32; // Card width + gap
const visibleCards = Math.floor(window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1);
const maxIndex = Math.max(0, cards.length - visibleCards);

// Initialize dots
cards.forEach((_, index) => {
const dot = document.createElement('div');
dot.classList.add('team-dot');
if (index === 0) dot.classList.add('active');
dotsContainer.appendChild(dot);

dot.addEventListener('click', () => goToSlide(index));
});

function updateDots() {
document.querySelectorAll('.team-dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
});
}

function goToSlide(index) {
currentIndex = Math.min(Math.max(0, index), maxIndex);
const offset = -currentIndex * cardWidth;
track.style.transform = `translateX(${offset}px)`;
updateDots();
}

nextBtn.addEventListener('click', () => {
if (currentIndex < maxIndex) goToSlide(currentIndex + 1);
});

prevBtn.addEventListener('click', () => {
if (currentIndex > 0) goToSlide(currentIndex - 1);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
if (e.key === 'ArrowRight' && currentIndex < maxIndex) {
    goToSlide(currentIndex + 1);
} else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    goToSlide(currentIndex - 1);
}
});

// Add touch support
let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', e => {
touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', e => {
touchEndX = e.changedTouches[0].screenX;
handleSwipe();
});

function handleSwipe() {
const swipeThreshold = 50;
const diff = touchStartX - touchEndX;

if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && currentIndex < maxIndex) {
        goToSlide(currentIndex + 1);
    } else if (diff < 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
    }
}
}

// Handle window resize
window.addEventListener('resize', () => {
const newVisibleCards = Math.floor(window.innerWidth >= 1200 ? 3 : window.innerWidth >= 768 ? 2 : 1);
const newMaxIndex = Math.max(0, cards.length - newVisibleCards);
if (currentIndex > newMaxIndex) {
    goToSlide(newMaxIndex);
}
});
});

// Gallery scroll functions
function scrollLeft() {
const track = document.querySelector('.gallery-carousel-track');
track.scrollBy({
left: -300,
behavior: 'smooth'
});
}

function scrollRight() {
const track = document.querySelector('.gallery-carousel-track');
track.scrollBy({
left: 300,
behavior: 'smooth'
});
}

let touchStartX = 0;
let touchEndX = 0;

track.addEventListener('touchstart', e => {
touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', e => {
touchEndX = e.changedTouches[0].screenX;
handleSwipe();
});

function handleSwipe() {
const swipeThreshold = 50;
const diff = touchStartX - touchEndX;

if (Math.abs(diff) > swipeThreshold) {
if (diff > 0 && currentIndex < cards.length - 1) {
    goToSlide(currentIndex + 1);
} else if (diff < 0 && currentIndex > 0) {
    goToSlide(currentIndex - 1);
}
}
}

document.addEventListener('keydown', (e) => {
if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
goToSlide(currentIndex + 1);
} else if (e.key === 'ArrowLeft' && currentIndex > 0) {
goToSlide(currentIndex - 1);
}
});
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Create email body
    const emailBody = `
        Name: ${data.name}
        Email: ${data.email}
        Organization: ${data.organisation}
        Subject: ${data.subject}
        Message: ${data.message}
    `;

    // Create mailto link
    const mailtoLink = `mailto:parmarshashank6@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Show success message
    alert("Thank you for your message! Your default email client will open to send the message.");
    event.target.reset();
}
