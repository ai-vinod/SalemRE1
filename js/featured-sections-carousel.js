document.addEventListener('DOMContentLoaded', function() {
    // Initialize featured promoters carousel
    initFeaturedCarousel('.promoters-grid', '.promoter-card');
    
    // Initialize featured projects carousel
    initFeaturedCarousel('.projects-grid', '.project-card');
});

function initFeaturedCarousel(gridSelector, cardSelector) {
    const grid = document.querySelector(gridSelector);
    if (!grid) return;
    
    const cards = Array.from(grid.querySelectorAll(cardSelector));
    if (cards.length <= 1) return;
    
    // Touch swipe variables
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Create carousel container
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'featured-carousel-container';
    
    // Create carousel track
    const carouselTrack = document.createElement('div');
    carouselTrack.className = 'featured-carousel-track';
    
    // Move cards to carousel track
    cards.forEach(card => {
        card.style.margin = '0';
        carouselTrack.appendChild(card);
    });
    
    // Add carousel track to container
    carouselContainer.appendChild(carouselTrack);
    
    // Create carousel controls
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'featured-carousel-controls';
    
    // Create prev button
    const prevButton = document.createElement('button');
    prevButton.className = 'featured-prev-btn';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    // Create next button
    const nextButton = document.createElement('button');
    nextButton.className = 'featured-next-btn';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    // Add buttons to controls
    controlsContainer.appendChild(prevButton);
    controlsContainer.appendChild(nextButton);
    
    // Add controls to container
    carouselContainer.appendChild(controlsContainer);
    
    // Replace grid with carousel
    grid.parentNode.replaceChild(carouselContainer, grid);
    
    // Set up carousel functionality
    let cardWidth = cards[0].getBoundingClientRect().width;
    let cardGap = 20; // Default gap
    let cardIndex = 0;
    let cardsPerView = getCardsPerView();
    
    // Get number of cards per view based on screen size
    function getCardsPerView() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth < 768) return 1;
        return 3; // Show 3 items on desktop to allow scrolling with 4 total items
    }
    
    // Set initial position
    function setCardPosition() {
        cardWidth = cards[0].getBoundingClientRect().width;
        cardsPerView = getCardsPerView();
        const offset = cardIndex * (cardWidth + cardGap);
        carouselTrack.style.transform = `translateX(-${offset}px)`;
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
        carouselTrack.style.transform = `translateX(-${offset}px)`;
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
        carouselTrack.style.transform = `translateX(-${offset}px)`;
        updateArrows();
    }
    
    // Update arrows visibility
    function updateArrows() {
        // Always keep arrows visible since we have looping functionality
        prevButton.style.opacity = '1';
        nextButton.style.opacity = '1';
    }
    
    // Initial arrow state
    updateArrows();
    
    // Event listeners for arrows
    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPrevSlide);
    
    // Touch swipe functionality for mobile
    carouselTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carouselTrack.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
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
}