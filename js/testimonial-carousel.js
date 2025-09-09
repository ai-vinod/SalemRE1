document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-carousel-track');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const nextButton = document.querySelector('.testimonial-next-btn');
    const prevButton = document.querySelector('.testimonial-prev-btn');
    const dots = Array.from(document.querySelectorAll('.testimonial-dot'));
    
    // Touch swipe variables
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (!track || cards.length === 0) return;
    
    let cardWidth = cards[0].getBoundingClientRect().width;
    let cardGap = parseInt(window.getComputedStyle(track).columnGap || 0);
    let cardIndex = 0;
    let cardsPerView = getCardsPerView();
    
    // Get number of cards per view based on screen size
    function getCardsPerView() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth < 768) return 1; // Always show 1 card on mobile
        if (viewportWidth < 992) return 1; // Show 1 card on tablets too for consistency
        return 1; // Show 1 card on all devices for better user experience
    }
    
    // Set initial position
    function setCardPosition() {
        cardWidth = cards[0].getBoundingClientRect().width;
        cardGap = parseInt(window.getComputedStyle(track).columnGap || 0);
        cardsPerView = getCardsPerView();
        const offset = cardIndex * (cardWidth + cardGap);
        track.style.transform = `translateX(-${offset}px)`;
    }
    
    // Initialize positions
    setCardPosition();
    
    // Handle window resize
    window.addEventListener('resize', setCardPosition);
    
    // Move to next slide
    function moveToNextSlide() {
        if (cardIndex >= cards.length - cardsPerView) {
            // Loop back to the beginning
            cardIndex = 0;
        } else {
            cardIndex++;
        }
        const offset = cardIndex * (cardWidth + cardGap);
        track.style.transform = `translateX(-${offset}px)`;
        updateArrows();
    }
    
    // Move to previous slide
    function moveToPrevSlide() {
        if (cardIndex <= 0) {
            // Loop back to the end
            cardIndex = cards.length - cardsPerView;
        } else {
            cardIndex--;
        }
        const offset = cardIndex * (cardWidth + cardGap);
        track.style.transform = `translateX(-${offset}px)`;
        updateArrows();
    }
    
    // Update arrows visibility and dots
    function updateArrows() {
        // Always keep arrows visible since we have looping functionality
        prevButton.style.opacity = '1';
        nextButton.style.opacity = '1';
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === cardIndex);
        });
    }
    
    // Initial arrow state
    updateArrows();
    
    // Event listeners for arrows
    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPrevSlide);
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            cardIndex = index;
            const offset = cardIndex * (cardWidth + cardGap);
            track.style.transform = `translateX(-${offset}px)`;
            updateArrows();
        });
    });
    
    // Auto-play functionality
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            moveToNextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play on hover
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);
    
    // Pause auto-play when user interacts with controls
    nextButton.addEventListener('mouseenter', stopAutoPlay);
    prevButton.addEventListener('mouseenter', stopAutoPlay);
    dots.forEach(dot => dot.addEventListener('mouseenter', stopAutoPlay));
    
    nextButton.addEventListener('mouseleave', startAutoPlay);
    prevButton.addEventListener('mouseleave', startAutoPlay);
    dots.forEach(dot => dot.addEventListener('mouseleave', startAutoPlay));
    
    // Touch swipe functionality for mobile
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay(); // Pause autoplay on touch
    }, {passive: true});
    
    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay(); // Resume autoplay after touch
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance required for swipe
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next slide
            moveToNextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous slide
            moveToPrevSlide();
        }
    }
});