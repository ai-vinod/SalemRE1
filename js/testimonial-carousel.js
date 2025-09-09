document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-carousel-track');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const nextButton = document.querySelector('.testimonial-next-btn');
    const prevButton = document.querySelector('.testimonial-prev-btn');
    
    if (!track || cards.length === 0) return;
    
    let cardWidth = cards[0].getBoundingClientRect().width;
    let cardGap = parseInt(window.getComputedStyle(track).columnGap || 0);
    let cardIndex = 0;
    let cardsPerView = getCardsPerView();
    
    // Get number of cards per view based on screen size
    function getCardsPerView() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth < 768) return 1;
        if (viewportWidth < 992) return 2;
        return 3;
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
        if (cardIndex >= cards.length - cardsPerView) return;
        cardIndex++;
        const offset = cardIndex * (cardWidth + cardGap);
        track.style.transform = `translateX(-${offset}px)`;
        updateArrows();
    }
    
    // Move to previous slide
    function moveToPrevSlide() {
        if (cardIndex <= 0) return;
        cardIndex--;
        const offset = cardIndex * (cardWidth + cardGap);
        track.style.transform = `translateX(-${offset}px)`;
        updateArrows();
    }
    
    // Update arrows visibility
    function updateArrows() {
        prevButton.style.opacity = cardIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = cardIndex >= cards.length - cardsPerView ? '0.5' : '1';
    }
    
    // Initial arrow state
    updateArrows();
    
    // Event listeners
    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPrevSlide);
});