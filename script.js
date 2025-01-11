document.addEventListener('DOMContentLoaded', function() {
    // Carousel code
    const track = document.querySelector('.carousel-track');
    if (track) {
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

        if (prevButton && nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                moveToSlide();
                stopSliding();
                startSliding();
            });

            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                moveToSlide();
                stopSliding();
                startSliding();
            });

            window.addEventListener('resize', moveToSlide);
            startSliding();
        }
    }

    // Menu code
    const menuButton = document.querySelector('.menu');
    const closeButton = document.querySelector('.close-menu');
    const overlay = document.getElementById('menuOverlay');

    if (menuButton && closeButton && overlay) {
        menuButton.addEventListener('click', () => {
            overlay.classList.add('show'); // Show the menu
        });

        closeButton.addEventListener('click', () => {
            overlay.classList.remove('show'); // Hide the menu
        });
    }
});
