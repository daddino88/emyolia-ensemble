/**
 * EMYOLIA ENSEMBLE - JavaScript
 * Musica Rinascimentale del XV-XVII secolo
 */

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');

    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// ===================================
// GALLERY MODAL FUNCTIONALITY
// ===================================
const galleryModal = document.getElementById('galleryModal');
if (galleryModal) {
    galleryModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const imageSrc = button.getAttribute('data-img');
        const modalImage = document.getElementById('modalImage');

        if (modalImage && imageSrc) {
            modalImage.src = imageSrc;
        }
    });
}

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const messaggio = document.getElementById('messaggio').value;

        // Create mailto link
        const subject = encodeURIComponent(`Richiesta contatto da ${nome}`);
        let body = encodeURIComponent(
            `Nome: ${nome}\n` +
            `Email: ${email}\n` +
            `Telefono: ${telefono}\n\n` +
            `Messaggio:\n${messaggio}`
        );

        // Open email client
        window.location.href = `mailto:emyoliaensemble@gmail.com?subject=${subject}&body=${body}`;

        // Show success message
        alert('Grazie per averci contattato! Il tuo client email si aprirà per inviare il messaggio.');

        // Optional: Reset form
        contactForm.reset();
    });
}

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
window.addEventListener('DOMContentLoaded', function() {
    // Add reveal class to sections for scroll animation
    const sections = document.querySelectorAll('#chi-siamo, #musicisti, #disco, #curriculum, #galleria, #contatti');
    sections.forEach(section => {
        const children = section.querySelectorAll('.section-header, .musician-card, .timeline-item, .gallery-item, .contact-form-container, .contact-card, .social-card');
        children.forEach(child => {
            child.classList.add('reveal');
        });
    });

    // Initial check
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// ===================================
// NAVBAR ACTIVE LINK ON SCROLL
// ===================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let current = '';
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                imageObserver.unobserve(img);
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// PARALLAX EFFECT FOR HERO (DISABLED)
// ===================================
// Parallax effect disabled to keep hero image fixed
/*
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    }
});
*/

// ===================================
// PRELOAD HERO IMAGE
// ===================================
window.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const heroImage = new Image();
        heroImage.src = 'foto/IMG_0705.jpg';
    }
});

// ===================================
// FORM VALIDATION ENHANCEMENT
// ===================================
(function() {
    'use strict';

    // Fetch all forms that need custom Bootstrap validation
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
})();

// ===================================
// MOBILE MENU AUTO CLOSE ON SCROLL
// ===================================
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop + 50) {
        // Scrolling down
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%cEMYOLIA ENSEMBLE', 'font-size: 24px; font-weight: bold; color: #1e3a5f;');
console.log('%cMusica Rinascimentale del XV-XVII secolo', 'font-size: 14px; color: #d4874a;');
console.log('🎵 Website by Claude Code');

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedReveal = debounce(revealOnScroll, 15);
window.removeEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', debouncedReveal);

// ===================================
// ANALYTICS READY (uncomment when needed)
// ===================================
/*
// Google Analytics Event Tracking
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.classList.contains('instagram') ? 'Instagram' :
                        this.classList.contains('facebook') ? 'Facebook' : 'Spotify';

        // gtag('event', 'social_click', {
        //     'event_category': 'Social Media',
        //     'event_label': platform
        // });
    });
});

// Track Spotify embed interactions
document.querySelector('.spotify-embed iframe')?.addEventListener('load', function() {
    // gtag('event', 'spotify_embed_loaded', {
    //     'event_category': 'Media',
    //     'event_label': 'Spotify Player'
    // });
});
*/
