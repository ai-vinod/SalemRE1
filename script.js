/**
 * Salem Real Estate Portal - Main JavaScript
 * Handles all interactive elements including:
 * - Header scroll behavior
 * - Mobile menu toggle
 * - Hero carousel
 * - Testimonial carousel
 * - Form validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStickyHeader();
    initMobileMenu();
    initHeroCarousel();
    initTestimonialCarousel();
    initBlogCarousel();
    initFormValidation();
});

/**
 * Sticky Header
 * Changes header appearance on scroll
 */
function initStickyHeader() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Menu Toggle
 * Handles the mobile menu open/close functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

/**
 * Hero Carousel
 * Handles the hero banner image carousel with auto-rotation
 */
function initHeroCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let interval;
    const autoPlayDelay = 5000; // 5 seconds

    // Function to move to a specific slide
    function moveToSlide(index) {
        // Ensure index is within bounds
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentIndex = index;
    }

    // Set up auto-rotation
    function startAutoPlay() {
        interval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(interval);
    }

    // Event listeners for controls
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
            stopAutoPlay();
            startAutoPlay();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
            stopAutoPlay();
            startAutoPlay();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Pause auto-rotation when hovering over carousel
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Start the carousel
    startAutoPlay();
}

/**
 * Testimonial Carousel
 * Handles the testimonial section carousel
 */
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (slides.length === 0) return;

    let currentIndex = 0;
    let interval;
    const autoPlayDelay = 6000; // 6 seconds

    // Function to move to a specific testimonial
    function moveToSlide(index) {
        // Ensure index is within bounds
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentIndex = index;
    }

    // Set up auto-rotation
    function startAutoPlay() {
        interval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(interval);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Start the carousel
    startAutoPlay();
}

/**
 * Form Validation
 * Validates the contact form before submission
 */
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        
        // Reset previous error states
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('error'));
        
        let isValid = true;
        
        // Validate name (required)
        if (!nameInput.value.trim()) {
            nameInput.parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate email (required and format)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
            emailInput.parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate phone (required and format)
        const phonePattern = /^[\d\+\-\(\)\s]{10,15}$/;
        if (!phoneInput.value.trim() || !phonePattern.test(phoneInput.value)) {
            phoneInput.parentElement.classList.add('error');
            isValid = false;
        }
        
        // If valid, simulate form submission
        if (isValid) {
            // In a real application, you would submit the form data to a server here
            // For this demo, we'll just show a success message
            const formContainer = contactForm.parentElement;
            
            // Hide the form
            contactForm.style.display = 'none';
            
            // Create and show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. Our team will get back to you shortly.</p>
            `;
            
            formContainer.appendChild(successMessage);
            
            // Reset form for future use
            contactForm.reset();
            
            // Optional: Restore form after a delay (for demo purposes)
            setTimeout(() => {
                successMessage.remove();
                contactForm.style.display = 'block';
            }, 5000);
        }
    });
}

/**
 * Lazy Loading Images
 * Uses Intersection Observer to lazy load images
 */
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Additional utility functions

/**
 * Smooth Scroll
 * Smoothly scrolls to the target element when clicking on anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth scroll

/**
 * Blog Carousel
 * Handles the blog section carousel/slider functionality
 */
function initBlogCarousel() {
    const track = document.querySelector('.blog-carousel-track');
    if (!track) return;
    
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.blog-next-btn');
    const prevButton = document.querySelector('.blog-prev-btn');
    const dotsNav = document.querySelector('.blog-carousel-dots');
    const dots = Array.from(dotsNav.children);
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    const slideMargin = parseInt(getComputedStyle(slides[0]).marginRight) || 30;
    const moveAmount = slideWidth + slideMargin;
    
    // Set initial position
    let currentIndex = 0;
    
    // Arrange slides next to one another
    slides.forEach((slide, index) => {
        slide.style.left = index * moveAmount + 'px';
    });
    
    // Move to slide function
    const moveToSlide = (index) => {
        if (index < 0) index = 0;
        if (index > slides.length - 3) index = slides.length - 3;
        
        currentIndex = index;
        track.style.transform = `translateX(-${moveAmount * index}px)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === Math.floor(index / 3));
        });
    };
    
    // Click events for buttons
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 3);
    });
    
    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 3);
    });
    
    // Click events for dots
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('.blog-dot');
        if (!targetDot) return;
        
        const targetIndex = dots.findIndex(dot => dot === targetDot) * 3;
        moveToSlide(targetIndex);
    });
    
    // Initialize first slide
    moveToSlide(0);
    
    // Responsive adjustments
    window.addEventListener('resize', () => {
        // Recalculate dimensions
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        const newSlideMargin = parseInt(getComputedStyle(slides[0]).marginRight) || 30;
        const newMoveAmount = newSlideWidth + newSlideMargin;
        
        // Rearrange slides
        slides.forEach((slide, index) => {
            slide.style.left = index * newMoveAmount + 'px';
        });
        
        // Update current position
        track.style.transform = `translateX(-${newMoveAmount * currentIndex}px)`;
    });
}
initSmoothScroll();