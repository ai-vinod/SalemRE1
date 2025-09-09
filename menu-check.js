/**
 * Simple script to check if mobile menu elements are being properly selected
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Menu check script loaded');
    
    // Check for mobile menu button
    const menuButton = document.querySelector('.mobile-menu-button');
    console.log('menuButton found:', menuButton !== null);
    if (menuButton) {
        console.log('menuButton class:', menuButton.className);
        console.log('menuButton aria-expanded:', menuButton.getAttribute('aria-expanded'));
    }
    
    // Check for nav links
    const navLinks = document.querySelector('.nav-links');
    console.log('navLinks found:', navLinks !== null);
    if (navLinks) {
        console.log('navLinks class:', navLinks.className);
    }
    
    // Add event listener to mobile menu button if it exists
    if (menuButton && navLinks) {
        console.log('Adding click event listener to menuButton');
        menuButton.addEventListener('click', function(event) {
            console.log('Mobile menu button clicked');
            event.stopPropagation();
            menuButton.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Update aria-expanded attribute
            const isExpanded = menuButton.classList.contains('active');
            menuButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            
            console.log('After click:');
            console.log('menuButton class:', menuButton.className);
            console.log('menuButton aria-expanded:', menuButton.getAttribute('aria-expanded'));
            console.log('navLinks class:', navLinks.className);
            console.log('body class:', document.body.className);
        });
    }
});