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

// ==================== GALLERY CAROUSEL ====================
// Google Sheets Configuration
// Replace this URL with your own Google Sheets published CSV URL
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsYET4acryMuqkxZgYG7flMAwheo07Kf-yujv7rZUByzs_DJZdSyL30bqF_0t0K2KPS94SDc4lMiut/pub?output=csv';

// Use CORS proxy to bypass CORS restrictions
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Function to load gallery from Google Sheets
async function loadGallery() {
    const track = document.getElementById('galleryTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const loadingElement = document.querySelector('.gallery-loading');
    
    if (!track || !dotsContainer || !loadingElement) {
        console.error('Gallery elements not found in DOM');
        return;
    }
    
    try {
        const fetchUrl = CORS_PROXY + encodeURIComponent(GOOGLE_SHEETS_URL);
        console.log('Fetching from:', fetchUrl);
        const response = await fetch(fetchUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        console.log('CSV Response:', csvText);
        
        // Parse CSV - handle different line endings and empty lines
        const lines = csvText.trim().split(/\r?\n/);
        console.log('Total lines:', lines.length);
        console.log('First line (header):', lines[0]);
        
        const dataLines = lines.slice(1); // Skip header row
        console.log('Data lines:', dataLines);
        
        const images = dataLines
            .filter(line => line.trim() && !line.startsWith(','))
            .map((line, index) => {
                console.log(`Processing line ${index}:`, line);
                // Split by comma, but handle quoted strings
                const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
                if (!matches || matches.length === 0) {
                    console.log(`No matches for line ${index}`);
                    return null;
                }
                
                const imageUrl = matches[0].replace(/"/g, '').trim();
                const altText = matches[1] ? matches[1].replace(/"/g, '').trim() : 'Sold Item';
                
                console.log(`Parsed: URL="${imageUrl}", Alt="${altText}"`);
                return { imageUrl, altText };
            })
            .filter(item => {
                if (!item) return false;
                if (!item.imageUrl) {
                    console.log('Filtered out: no imageUrl');
                    return false;
                }
                if (!item.imageUrl.startsWith('http')) {
                    console.log('Filtered out: URL does not start with http:', item.imageUrl);
                    return false;
                }
                return true;
            });

        console.log('Final parsed images:', images);

        if (images.length === 0) {
            loadingElement.innerHTML = '<p>No items to display yet. Add image URLs to your Google Sheet!</p>';
            loadingElement.classList.remove('hidden');
            return;
        }

        // Build gallery HTML
        track.innerHTML = images.map((item, index) => `
            <div class="gallery-item">
                <div class="gallery-image">
                    <img src="${item.imageUrl}" alt="${item.altText}" loading="lazy" onload="console.log('Image ${index} loaded')" onerror="console.error('Image ${index} failed to load:', '${item.imageUrl}')">
                    <div class="sold-badge">
                        <i class="fas fa-check-circle"></i>
                        <span>SOLD</span>
                    </div>
                </div>
            </div>
        `).join('');

        console.log('Gallery HTML built, hiding loading...');
        // Hide loading
        loadingElement.classList.add('hidden');

        // Initialize carousel after images are added
        console.log('Initializing carousel...');
        setTimeout(() => initializeCarousel(), 100);
        
    } catch (error) {
        console.error('Error loading gallery:', error);
        loadingElement.innerHTML = `<p>Unable to load gallery: ${error.message}</p><p>Check browser console for details.</p>`;
        loadingElement.classList.remove('hidden');
    }
}

// Initialize carousel functionality
function initializeCarousel() {
    const track = document.getElementById('galleryTrack');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dotsContainer = document.getElementById('carouselDots');

    if (slides.length === 0) return;

    // Create dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);
    let currentIndex = 0;

    // Move to slide function
    const moveToSlide = (targetIndex) => {
        if (targetIndex < 0) targetIndex = slides.length - 1;
        if (targetIndex >= slides.length) targetIndex = 0;

        track.style.transform = `translateX(-${targetIndex * 100}%)`;
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[targetIndex].classList.add('active');
        
        currentIndex = targetIndex;
    };

    // Next button
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    // Previous button
    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });

    // Auto-play carousel
    let autoplayInterval = setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, 5000);

    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 5000);
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            moveToSlide(currentIndex + 1);
        }
        if (touchEndX - touchStartX > 50) {
            moveToSlide(currentIndex - 1);
        }
    }
}

// Load gallery when page loads
document.addEventListener('DOMContentLoaded', loadGallery);

// ==================== CONSOLE MESSAGE ====================
console.log('%cPasarSkin', 'color: #679e5c; font-size: 24px; font-weight: bold;');
console.log('%cWebsite loaded successfully! 🎮', 'color: #f7c63e; font-size: 14px;');
console.log('%cContact us: Instagram @PasarSkin | WhatsApp +62 851-1780-0670', 'color: #b8b8b8; font-size: 12px;');
