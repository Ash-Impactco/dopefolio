// Animation functions
document.addEventListener('DOMContentLoaded', () => {
    // Add animation delay to nav links
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        link.style.setProperty('--i', index);
    });

    // Animate sections on scroll
    const animateOnScroll = debounce(() => {
        document.querySelectorAll('.section').forEach(section => {
            if (isInViewport(section)) {
                section.style.opacity = '1';
            }
        });
    }, 100);

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
}); 
