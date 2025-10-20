// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .about-text, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.project-card, .about-text, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
// Trigger once on load
window.addEventListener('load', animateOnScroll);

// Add neon glow effect to elements on hover
document.querySelectorAll('.btn, .skill, .tag, .contact-icon').forEach(el => {
    el.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 15px currentColor';
    });
    
    el.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Custom cursor functionality using the provided images
document.addEventListener('DOMContentLoaded', function() {
    // Change cursor to clicking state on mousedown
    document.addEventListener('mousedown', function() {
        document.body.classList.add('clicking');
    });
    
    // Revert to normal cursor on mouseup
    document.addEventListener('mouseup', function() {
        document.body.classList.remove('clicking');
    });
    
    // Revert to normal cursor when leaving the window
    document.addEventListener('mouseleave', function() {
        document.body.classList.remove('clicking');
    });
});