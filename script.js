// ==================== NAVBAR FUNCTIONALITY ====================
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Toggle mobile menu
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== NAVBAR BACKGROUND ON SCROLL ====================
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    }

    lastScroll = currentScroll;
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and contact cards
document.querySelectorAll('.service-card, .contact-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==================== SCROLL INDICATOR ====================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Hide scroll indicator when scrolling down
window.addEventListener('scroll', () => {
    if (scrollIndicator) {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'all';
        }
    }
});

// ==================== CONTACT CARD ANIMATIONS ====================
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const platform = this.getAttribute('data-platform');
        if (platform === 'instagram') {
            this.style.borderTop = '3px solid #e1306c';
        } else if (platform === 'whatsapp') {
            this.style.borderTop = '3px solid #25d366';
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.borderTop = 'none';
    });
});

// ==================== EXTERNAL LINK TRACKING ====================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.closest('.contact-card')?.getAttribute('data-platform');
        if (platform) {
            console.log(`Opening ${platform} contact`);
        }
    });
});

// ==================== PRELOAD IMAGES ====================
window.addEventListener('load', () => {
    // Check if logo exists
    const logos = document.querySelectorAll('.logo img, .footer-logo img');
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            // If logo fails to load, hide the img and show text only
            this.style.display = 'none';
        });
    });
});

// ==================== RESPONSIVE UTILITIES ====================
function checkScreenSize() {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('active');
    }
}

window.addEventListener('resize', checkScreenSize);

// ==================== PARALLAX EFFECT FOR HERO ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ==================== CONSOLE MESSAGE ====================
console.log('%cPasarSkin', 'color: #ff6b35; font-size: 24px; font-weight: bold;');
console.log('%cWebsite loaded successfully! 🎮', 'color: #f77f00; font-size: 14px;');
console.log('%cContact us: Instagram @PasarSkin | WhatsApp +62 851-1780-0670', 'color: #b8b8b8; font-size: 12px;');
