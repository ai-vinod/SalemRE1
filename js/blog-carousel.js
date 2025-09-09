document.addEventListener('DOMContentLoaded', function() {
    // Blog carousel functionality
    const track = document.querySelector('.blog-carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.blog-next-btn');
    const prevButton = document.querySelector('.blog-prev-btn');
    const dotsNav = document.querySelector('.blog-carousel-dots');
    const dots = Array.from(dotsNav.children);
    
    // Set up the carousel
    const slideWidth = slides[0].getBoundingClientRect().width;
    const slideMargin = parseInt(window.getComputedStyle(slides[0]).marginRight);
    
    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = (slideWidth + slideMargin) * index + 'px';
    };
    
    slides.forEach(setSlidePosition);
    
    // Move to target slide
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('active');
        targetSlide.classList.add('active');
    };
    
    // Update dots
    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('active');
        targetDot.classList.add('active');
    };
    
    // Hide/show arrows
    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    };
    
    // When I click left, move slides to the left
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.active');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.active');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);
        
        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
            hideShowArrows(slides, prevButton, nextButton, prevIndex);
        }
    });
    
    // When I click right, move slides to the right
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.active');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.active');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);
        
        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
            hideShowArrows(slides, prevButton, nextButton, nextIndex);
        }
    });
    
    // When I click the nav indicators, move to that slide
    dotsNav.addEventListener('click', e => {
        // what indicator was clicked on?
        const targetDot = e.target.closest('span');
        
        if (!targetDot) return;
        
        const currentSlide = track.querySelector('.active');
        const currentDot = dotsNav.querySelector('.active');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];
        
        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
    });
    
    // Set first slide as active
    slides[0].classList.add('active');
});