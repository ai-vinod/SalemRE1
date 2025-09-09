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
    // Detect iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Add iOS class to body if needed
    if (isIOS) {
        document.body.classList.add('ios-device');
        console.log('iOS device detected');
    }
    
    // Initialize all components with error handling
    try {
        console.log('Initializing sticky header');
        initStickyHeader();
        
        console.log('Initializing mobile menu');
        initMobileMenu();
        
        console.log('Initializing hero carousel');
        initHeroCarousel();
        
        console.log('Initializing testimonial carousel');
        initTestimonialCarousel();
        
        console.log('Initializing blog carousel');
        initBlogCarousel();
        
        console.log('Initializing Why Choose Us carousel');
        initWhyChooseUsCarousel();
        
        console.log('Initializing form validation');
        initFormValidation();
        
        console.log('Initializing blog pagination');
        initBlogPagination();
        
        console.log('Initializing radio buttons');
        initRadioButtons();
        
        console.log('All components initialized successfully');
    } catch (error) {
        console.error('Error initializing components:', error);
    }
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
    // Get the mobile menu toggle button and navigation links
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Check if elements exist
    if (!menuToggle || !navLinks) {
        console.error('Mobile menu elements not found');
        return;
    }

    console.log('Mobile menu elements found');
    
    // Force initial state to be closed
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    // Create a simple button element to replace the div for better accessibility
    const mobileButton = document.createElement('button');
    mobileButton.className = 'mobile-menu-button';
    mobileButton.setAttribute('aria-label', 'Toggle navigation menu');
    mobileButton.setAttribute('aria-expanded', 'false');
    mobileButton.innerHTML = '<span></span><span></span><span></span>';
    
    // Replace the existing toggle with the button
    menuToggle.parentNode.replaceChild(mobileButton, menuToggle);
    
    // Function to toggle menu state
    function toggleMenu(e) {
        // Prevent default behavior and stop propagation
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Toggle active classes
        mobileButton.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Update aria-expanded attribute
        const isExpanded = mobileButton.classList.contains('active');
        mobileButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        
        console.log('Menu toggled, active state:', navLinks.classList.contains('active'));
    }

    // Add all event listeners to the new button
    mobileButton.addEventListener('click', toggleMenu);
    mobileButton.addEventListener('touchstart', toggleMenu, {passive: false});
    
    // Fix for iOS Safari - prevent touchmove events on body when menu is open
    document.body.addEventListener('touchmove', function(e) {
        if (document.body.classList.contains('menu-open') && !e.target.closest('.nav-links')) {
            e.preventDefault();
        }
    }, {passive: false});
    
    // Prevent any default touch behavior on the menu toggle
    mobileButton.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, {passive: false});}

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-toggle') && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            console.log('Clicked outside, closing menu');
        }
    }, {passive: true});

    // Close menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            console.log('Nav link clicked, closing menu');
        }, {passive: true});
    });
    
    // Add touchstart event for mobile devices with passive: false to allow preventDefault
    menuToggle.addEventListener('touchstart', toggleMenu, {passive: false});
    
    // Add touchend event to ensure the menu toggle works on all mobile devices
    menuToggle.addEventListener('touchend', function(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('Touch end on menu toggle');
    }, {passive: false});
    
    // Prevent any default touch behavior on the menu toggle
    menuToggle.addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, {passive: false});
    
    // Ensure menu toggle is accessible
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Update aria attributes when menu state changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const isActive = menuToggle.classList.contains('active');
                menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            }
        });
    });
    
    observer.observe(menuToggle, { attributes: true });
}

/**
 * Hero Carousel
 * Handles the hero banner image carousel with auto-rotation
 */
function initHeroCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let interval;
    const autoPlayDelay = 2000; // 2 seconds

    // Function to move to a specific slide
    function moveToSlide(index) {
        // Ensure index is within bounds
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
        
        currentIndex = index;
    }

    // Set up auto-rotation
    function startAutoPlay() {
        // Clear any existing interval first
        if (interval) {
            clearInterval(interval);
        }
        
        interval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    // Auto-rotation only, no manual controls

    // Pause auto-rotation when hovering over carousel
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Initialize the first slide
    moveToSlide(0);
    
    // Start the carousel
    startAutoPlay();
    
    // Force start after a short delay (backup)
    setTimeout(startAutoPlay, 500);
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
 * Radio Buttons
 * Handles radio button selection and filter form functionality
 */
function initRadioButtons() {
    // Handle radio button selection
    const radioOptions = document.querySelectorAll('.radio-option');
    
    radioOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        
        // Make the entire label clickable
        option.addEventListener('click', function() {
            radio.checked = true;
            
            // Trigger a change event for any listeners
            const event = new Event('change', { bubbles: true });
            radio.dispatchEvent(event);
        });
        
        // Prevent double-triggering when clicking directly on the radio button
        radio.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Handle filter form submission
    const filterForm = document.querySelector('.filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally collect all form data and filter properties
            // For demo purposes, we'll just log the selected values
            console.log('Filter form submitted');
            
            // Get all selected radio values
            const propertyType = document.querySelector('input[name="property-type"]:checked')?.value || 'Any';
            const priceRange = document.querySelector('input[name="price-range"]:checked')?.value || 'Any';
            const location = document.querySelector('input[name="location"]:checked')?.value || 'Any';
            
            console.log('Property Type:', propertyType);
            console.log('Price Range:', priceRange);
            console.log('Location:', location);
            
            // In a real application, you would filter the properties based on these values
        });
        
        // Handle reset button
        const resetBtn = filterForm.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                filterForm.reset();
                console.log('Filter form reset');
            });
        }
    }
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
}

/**
 * Blog Pagination
 * Handles the blog pagination functionality
 */
function initBlogPagination() {
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevButton = document.querySelector('.pagination-prev');
    const nextButton = document.querySelector('.pagination-next');
    
    if (!paginationNumbers.length) return;
    
    // Add click event listeners to pagination numbers
    paginationNumbers.forEach((number, index) => {
        number.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all numbers
            paginationNumbers.forEach(num => num.classList.remove('active'));
            
            // Add active class to clicked number
            this.classList.add('active');
            
            // Update prev/next buttons based on current page
            updatePrevNextButtons(index, paginationNumbers.length);
        });
    });
    
    // Add click event listeners to prev/next buttons
    if (prevButton) {
        prevButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('disabled')) return;
            
            // Find current active page
            const currentActive = document.querySelector('.pagination-number.active');
            const currentIndex = Array.from(paginationNumbers).indexOf(currentActive);
            
            if (currentIndex > 0) {
                // Remove active class from current
                currentActive.classList.remove('active');
                
                // Add active class to previous
                paginationNumbers[currentIndex - 1].classList.add('active');
                
                // Update prev/next buttons
                updatePrevNextButtons(currentIndex - 1, paginationNumbers.length);
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('disabled')) return;
            
            // Find current active page
            const currentActive = document.querySelector('.pagination-number.active');
            const currentIndex = Array.from(paginationNumbers).indexOf(currentActive);
            
            if (currentIndex < paginationNumbers.length - 1) {
                // Remove active class from current
                currentActive.classList.remove('active');
                
                // Add active class to next
                paginationNumbers[currentIndex + 1].classList.add('active');
                
                // Update prev/next buttons
                updatePrevNextButtons(currentIndex + 1, paginationNumbers.length);
            }
        });
    }
    
    // Initialize prev/next buttons state
    updatePrevNextButtons(0, paginationNumbers.length);
}

// Helper function to update prev/next buttons state
function updatePrevNextButtons(currentIndex, totalPages) {
    const prevButton = document.querySelector('.pagination-prev');
    const nextButton = document.querySelector('.pagination-next');
    
    if (prevButton) {
        if (currentIndex === 0) {
            prevButton.classList.add('disabled');
        } else {
            prevButton.classList.remove('disabled');
        }
    }
    
    if (nextButton) {
        if (currentIndex === totalPages - 1) {
            nextButton.classList.add('disabled');
        } else {
            nextButton.classList.remove('disabled');
        }
    }
}
    
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

// Initialize functions
initSmoothScroll();
initBlogCarousel();