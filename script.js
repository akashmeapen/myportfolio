// script.js - Neo-Brutalist Interactions
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Elements
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const themeBtn = document.getElementById('theme-btn');
    const themePill = document.getElementById('theme-pill');
    const themeLabel = document.getElementById('theme-label');
    const mobileLinks = mobileNav.querySelectorAll('a');
    const liveDemoButtons = document.querySelectorAll('.live-demo-btn');
    const videoModal = document.getElementById('video-modal');
    const videoModalClose = document.getElementById('video-modal-close');
    const videoModalPlayer = document.getElementById('video-modal-player');
    const videoModalSource = document.getElementById('video-modal-source');


    // Themes array to cycle through
    const themes = ['coral', 'acid', 'dark','milesmorales'];
    let currentThemeIndex = 0;

    const themeDisplayNames = {
        coral: 'Coral',
        acid: 'Lemon Lime',
        dark: 'Dark',
        milesmorales: 'Miles Morales'
    };

    function updateThemeLabel(theme) {
        if (themeLabel) {
            themeLabel.textContent = themeDisplayNames[theme] || theme;
        }
    }

    // Check LocalStorage for theme
    const savedTheme = localStorage.getItem('brutal-theme');
    if (savedTheme && themes.includes(savedTheme)) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        currentThemeIndex = themes.indexOf(savedTheme);
    }

    // Venom Glow Effect Function
    const addVenomGlow = (e) => { e.target.style.boxShadow = 'var(--venom-glow)'; };
    const removeVenomGlow = (e) => { e.target.style.boxShadow = ''; };

    function manageVenomGlow(theme) {
        const interactiveElements = document.querySelectorAll('.btn, .social-btn');
        if (theme === 'milesmorales') {
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', addVenomGlow);
                el.addEventListener('mouseleave', removeVenomGlow);
            });
        } else {
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', addVenomGlow);
                el.removeEventListener('mouseleave', removeVenomGlow);
                el.style.boxShadow = ''; // Reset inline styles
            });
        }
    }

    // Apply initially based on loaded theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'coral';
    manageVenomGlow(currentTheme);
    updateThemeLabel(currentTheme);

    // Theme Toggle Handler
    const cycleTheme = () => {
        // Cycle to next theme
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('brutal-theme', newTheme);

        // Check and apply venom glow effect
        manageVenomGlow(newTheme);
        updateThemeLabel(newTheme);

        // Re-render icons after slight style shift if needed
        setTimeout(() => {
            lucide.createIcons();
        }, 50);
    };

    if (themeBtn) {
        themeBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            cycleTheme();
        });
    }

    if (themePill) {
        themePill.addEventListener('click', cycleTheme);

        themePill.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                cycleTheme();
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('open');
            if (isOpen) {
                mobileNav.classList.remove('open');
                mobileBtn.innerHTML = `<i data-lucide="menu"></i>`;
                body.style.overflow = '';
            } else {
                mobileNav.classList.add('open');
                mobileBtn.innerHTML = `<i data-lucide="x"></i>`;
                body.style.overflow = 'hidden'; // prevent scrolling
            }
            lucide.createIcons();
        });

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileBtn.innerHTML = `<i data-lucide="menu"></i>`;
                body.style.overflow = '';
                lucide.createIcons();
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Link Scroll Spy
    const sections = document.querySelectorAll('section[id], div[id="resume"]');
    const navItems = document.querySelectorAll('.nav-links a, .mobile-nav a');

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-20% 0px -60% 0px", threshold: 0 });

    sections.forEach(sec => spyObserver.observe(sec));

    // Simple Intersection Observer to add a pop-in effect on cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const popInElements = document.querySelectorAll('.skill-card, .project-item, .contact-card, .info-card, .social-banner, .resume-banner');
    
    // Set initial state
    popInElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    popInElements.forEach(el => {
        scrollObserver.observe(el);
    });

    if (videoModal && videoModalClose && videoModalPlayer && videoModalSource && liveDemoButtons.length > 0) {
        const openVideoModal = (videoSrc) => {
            if (!videoSrc) return;
            videoModalSource.src = videoSrc;
            videoModalPlayer.load();
            videoModal.classList.add('open');
            videoModal.setAttribute('aria-hidden', 'false');
            body.style.overflow = 'hidden';
        };

        const closeVideoModal = () => {
            videoModal.classList.remove('open');
            videoModal.setAttribute('aria-hidden', 'true');
            videoModalPlayer.pause();
            videoModalPlayer.currentTime = 0;
            body.style.overflow = '';
        };

        liveDemoButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                openVideoModal(button.getAttribute('data-video-src'));
            });
        });

        videoModalClose.addEventListener('click', closeVideoModal);

        videoModal.addEventListener('click', (event) => {
            if (event.target === videoModal) {
                closeVideoModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && videoModal.classList.contains('open')) {
                closeVideoModal();
            }
        });
    }
});
