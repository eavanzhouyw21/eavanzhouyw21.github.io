// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                }
            });
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                });
            });
        });
    }

    // Initialize Carousel
    initializeCarousel();

    // Image Gallery Lightbox
    initializeGallery();

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .content-section, .mechanic-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Carousel Functionality
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoSlideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Function to start auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Function to stop auto-slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000); // Restart auto-slide after 8 seconds
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000); // Restart auto-slide after 8 seconds
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000); // Restart auto-slide after 8 seconds
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000);
        }
    });

    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (heroSection) {
        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevSlide(); // Swipe right = previous slide
            } else {
                nextSlide(); // Swipe left = next slide
            }
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000);
        }
    }

    // Initialize first slide and start auto-slide
    showSlide(0);
    startAutoSlide();

    // Pause auto-slide when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
}

// Image Gallery Lightbox System
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');
    
    if (galleryItems.length === 0) return;

    // Create lightbox overlay
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.innerHTML = `
        <div class="lightbox-container">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&larr;</button>
            <button class="lightbox-next">&rarr;</button>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
            <div class="lightbox-counter"></div>
        </div>
    `;
    document.body.appendChild(lightboxOverlay);

    // Add lightbox styles
    const lightboxStyles = document.createElement('style');
    lightboxStyles.textContent = `
        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .lightbox-overlay.active {
            display: flex;
            opacity: 1;
        }

        .lightbox-container {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .lightbox-image {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
        }

        .lightbox-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            z-index: 2001;
            padding: 10px;
            transition: opacity 0.3s ease;
        }

        .lightbox-close:hover {
            opacity: 0.7;
        }

        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            font-size: 1.5rem;
            padding: 15px 20px;
            cursor: pointer;
            border-radius: 5px;
            transition: background 0.3s ease;
        }

        .lightbox-prev {
            left: -60px;
        }

        .lightbox-next {
            right: -60px;
        }

        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 15px;
            font-size: 1.1rem;
        }

        .lightbox-counter {
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
            margin-top: 10px;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            .lightbox-prev,
            .lightbox-next {
                display: none;
            }
            
            .lightbox-close {
                top: -40px;
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(lightboxStyles);

    // Gallery functionality
    let currentGalleryGroup = [];
    let currentImageIndex = 0;

    const lightboxImage = lightboxOverlay.querySelector('.lightbox-image');
    const lightboxCaption = lightboxOverlay.querySelector('.lightbox-caption');
    const lightboxCounter = lightboxOverlay.querySelector('.lightbox-counter');
    const closeBtn = lightboxOverlay.querySelector('.lightbox-close');
    const prevBtn = lightboxOverlay.querySelector('.lightbox-prev');
    const nextBtn = lightboxOverlay.querySelector('.lightbox-next');

    // Open lightbox
    function openLightbox(galleryGroup, index) {
        currentGalleryGroup = galleryGroup;
        currentImageIndex = index;
        showImage();
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Show current image
    function showImage() {
        const currentItem = currentGalleryGroup[currentImageIndex];
        const img = currentItem.querySelector('img');
        const caption = currentItem.querySelector('.gallery-overlay span');
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : img.alt;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentGalleryGroup.length}`;
    }

    // Close lightbox
    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Navigation
    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % currentGalleryGroup.length;
        showImage();
    }

    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + currentGalleryGroup.length) % currentGalleryGroup.length;
        showImage();
    }

    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const galleryName = item.getAttribute('data-lightbox');
            const galleryGroup = Array.from(document.querySelectorAll(`[data-lightbox="${galleryName}"]`));
            const itemIndex = galleryGroup.indexOf(item);
            openLightbox(galleryGroup, itemIndex);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Close on overlay click
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxOverlay.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrev();
                    break;
                case 'ArrowRight':
                    showNext();
                    break;
            }
        }
    });
}

// Form handling (if contact forms are added later)
function initializeContactForm() {
    const contactForms = document.querySelectorAll('.contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form validation and submission logic here
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Disable button during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Reset after 2 seconds (replace with actual submission logic)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.textContent = 'Thank you! Your message has been sent.';
                this.appendChild(successMsg);
                
                // Clear form
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    if (successMsg.parentNode) {
                        successMsg.remove();
                    }
                }, 5000);
            }, 2000);
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Performance optimization: lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});