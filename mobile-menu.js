/**
 * Standalone Mobile Menu Script
 * This script handles the mobile menu functionality independently
 * to ensure it works across all pages.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile menu script loaded');
    
    // Get the mobile menu button and navigation links
    const menuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    // Check if elements exist
    if (!menuButton || !navLinks) {
        console.error('Mobile menu elements not found');
        console.log('menuButton:', menuButton);
        console.log('navLinks:', navLinks);
        return;
    }

    console.log('Mobile menu elements found');
    
    // Force initial state to be closed
    menuButton.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    
    // Add click event listener
    menuButton.addEventListener('click', function(event) {
        console.log('Mobile menu button clicked');
        event.preventDefault();
        event.stopPropagation();
        
        // Toggle active classes
        menuButton.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Update aria-expanded attribute
        const isExpanded = menuButton.classList.contains('active');
        menuButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        
        console.log('Menu toggled, active state:', navLinks.classList.contains('active'));
    });
    
    // Add touchstart event listener for iOS devices
    menuButton.addEventListener('touchstart', function(event) {
        // Only handle touchstart if it's a tap (not a scroll)
        if (event.touches.length === 1) {
            event.preventDefault();
            event.stopPropagation();
            
            // Toggle active classes
            menuButton.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Update aria-expanded attribute
            const isExpanded = menuButton.classList.contains('active');
            menuButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            
            console.log('Menu toggled via touch, active state:', navLinks.classList.contains('active'));
        }
    }, {passive: false});
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && !event.target.closest('.mobile-menu-button') && navLinks.classList.contains('active')) {
            menuButton.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
            console.log('Clicked outside, closing menu');
        }
    });

    // Close menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            menuButton.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
            console.log('Link clicked, closing menu');
        });
    });
});