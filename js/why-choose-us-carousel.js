document.addEventListener('DOMContentLoaded', function() {
    // Initialize Why Choose Us carousel
    initWhyChooseUsCarousel();
});

function initWhyChooseUsCarousel() {
    const section = document.querySelector('.why-choose-us');
    if (!section) return;
    
    const benefitsContainer = section.querySelector('.why-choose-us-carousel-container');
    if (!benefitsContainer) return;
    
    const track = benefitsContainer.querySelector('.why-choose-us-carousel-track');
    const cards = Array.from(track.children);
    if (cards.length <= 1) return;
    
    const prevButton = benefitsContainer.querySelector('.why-choose-us-prev-btn');
    const nextButton = benefitsContainer.querySelector('.why-choose-us-next-btn');
    
    // Set up the carousel
    let cardWidth = cards[0].getBoundingClientRect().width;
    let cardGap = 20; // Default gap
    let cardIndex = 0;
    let cardsPerView = getCardsPerView();
    
    // Get number of cards per view based on screen size
    function getCardsPerView() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth < 768) return 1;
        if (viewportWidth < 992) return 2;
        return 2; // Show 2 items on desktop
    }
    
    // Set initial position
    function setCardPosition() {
        cardWidth = cards[0].getBoundingClientRect().width;
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
    
    // Update arrows visibility
    function updateArrows() {
        // Always keep arrows visible since we have looping functionality
        prevButton.style.opacity = '1';
        nextButton.style.opacity = '1';
    }
    
    // Initial arrow state
    updateArrows();
    
    // Event listeners
    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPrevSlide);
}