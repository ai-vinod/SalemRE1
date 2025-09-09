document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-carousel-track');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    const nextButton = document.querySelector('.testimonial-next-btn');
    const prevButton = document.querySelector('.testimonial-prev-btn');
    
    if (!track || cards.length === 0) return;
    
    let cardWidth = cards[0].getBoundingClientRect().width;
    let cardIndex = 0;
    
    // Set initial position
    function setCardPosition() {
        cardWidth = cards[0].getBoundingClientRect().width;
        track.style.transform = `translateX(${-cardIndex * cardWidth}px)`;
    }
    
    // Initialize positions
    setCardPosition();
    
    // Handle window resize
    window.addEventListener('resize', setCardPosition);
    
    // Move to next slide
    function moveToNextSlide() {
        if (cardIndex >= cards.length - 1) return;
        cardIndex++;
        track.style.transform = `translateX(${-cardIndex * cardWidth}px)`;
        updateArrows();
    }
    
    // Move to previous slide
    function moveToPrevSlide() {
        if (cardIndex <= 0) return;
        cardIndex--;
        track.style.transform = `translateX(${-cardIndex * cardWidth}px)`;
        updateArrows();
    }
    
    // Update arrows visibility
    function updateArrows() {
        prevButton.style.opacity = cardIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = cardIndex === cards.length - 1 ? '0.5' : '1';
    }
    
    // Initial arrow state
    updateArrows();
    
    // Event listeners
    nextButton.addEventListener('click', moveToNextSlide);
    prevButton.addEventListener('click', moveToPrevSlide);
});