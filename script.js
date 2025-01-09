const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;
let interval = 3000; // Time in milliseconds between slides
let slideInterval;

function moveToSlide() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function startSliding() {
    slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        moveToSlide();
    }, interval);
}

function stopSliding() {
    clearInterval(slideInterval);
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide();
    // Reset the interval when manually clicked
    stopSliding();
    startSliding();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide();
    // Reset the interval when manually clicked
    stopSliding();
    startSliding();
});

// Handle window resizing
window.addEventListener('resize', moveToSlide);

// Start the automatic carousel when the page loads
startSliding();

document.querySelector('.menu').addEventListener('click', function() {
    document.getElementById('menuOverlay').style.display = 'flex'; // Show the menu
});

document.querySelector('.close-menu').addEventListener('click', function() {
    document.getElementById('menuOverlay').style.display = 'none'; // Hide the menu
});