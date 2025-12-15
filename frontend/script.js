// ===================================
// Navigation & Mobile Menu
// ===================================
const navbar = document.querySelector('.navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Navbar scroll effect with passive listener for better performance
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===================================
// Active Navigation Link
// ===================================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkItems.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

// ===================================
// Theme Toggle
// ===================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const root = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = root.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ===================================
// Smooth Scrolling (Lenis + Custom)
// ===================================
// Initialize Lenis with optimized settings
const lenis = new Lenis({
    duration: 1.2, // Optimized duration for smooth but responsive feel
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // EaseOutExpo
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false, // Disable on touch for native feel
    touchMultiplier: 2,
    infinite: false,
    lerp: 0.1, // Linear interpolation factor (lower = smoother but slower)
});

// Optimized RAF loop with performance monitoring
let rafId;
function raf(time) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
}

rafId = requestAnimationFrame(raf);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    lenis.destroy();
    cancelAnimationFrame(rafId);
    document.documentElement.style.scrollBehavior = 'auto';
}

// Pause Lenis when not needed (performance optimization)
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Scroll ended, can do cleanup if needed
    }, 150);
}, { passive: true });

// Handle Anchor Links with Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            // Use Lenis for smooth scroll to anchor
            lenis.scrollTo(target, {
                offset: -80, // Navbar height offset
                duration: 1.5, // Smooth anchor navigation
                easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 // EaseInOutCubic
            });

            // Close mobile menu if open
            if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// ===================================
// Skill Progress Animation
// ===================================
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkills() {
    const skillsSection = document.getElementById('skills');
    const skillsSectionTop = skillsSection.offsetTop;
    const skillsSectionHeight = skillsSection.offsetHeight;
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (scrollY > skillsSectionTop - windowHeight + 200 && !skillsAnimated) {
        skillBars.forEach(bar => {
            const progress = bar.style.getPropertyValue('--progress');
            bar.style.width = '0%';

            setTimeout(() => {
                bar.style.width = progress;
            }, 100);
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkills, { passive: true });

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success feedback
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

            console.log('Form submitted:', data);
        } catch (error) {
            // Error feedback
            submitBtn.textContent = '✗ Failed to send';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

            console.error('Form submission error:', error);
        }
    });
}

// ===================================
// Intersection Observer for Animations
// ===================================
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

// Observe project cards and skill categories
document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===================================
// Typing Effect for Hero Title
// ===================================
function createTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');

    titleLines.forEach((line, index) => {
        if (index === 1) { // Only apply to the name line
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';

            let charIndex = 0;
            const typingInterval = setInterval(() => {
                if (charIndex < text.length) {
                    line.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 100);
        }
    });
}

// Uncomment to enable typing effect
// window.addEventListener('load', createTypingEffect);

// ===================================
// Parallax Effect for Hero Orbs
// ===================================
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
}, { passive: true });

// ===================================
// Code Window Typing Animation
// ===================================
function animateCodeWindow() {
    const codeContent = document.querySelector('.window-content code');
    if (!codeContent) return;

    const originalHTML = codeContent.innerHTML;
    codeContent.innerHTML = '';

    let charIndex = 0;
    const typingSpeed = 20;

    function typeCode() {
        if (charIndex < originalHTML.length) {
            codeContent.innerHTML = originalHTML.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeCode, typingSpeed);
        }
    }

    // Start typing animation after a delay
    setTimeout(typeCode, 1000);
}

// Uncomment to enable code typing animation
// window.addEventListener('load', animateCodeWindow);

// ===================================
// Project Card Tilt Effect
// ===================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// Cursor Trail Effect (Optional)
// ===================================
function createCursorTrail() {
    const trail = [];
    const trailLength = 20;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: transform 0.1s ease-out;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];

            dot.style.left = x + 'px';
            dot.style.top = y + 'px';

            x += (nextDot.offsetLeft - x) * 0.3;
            y += (nextDot.offsetTop - y) * 0.3;
        });

        requestAnimationFrame(animateTrail);
    }

    animateTrail();
}

// Uncomment to enable cursor trail
// createCursorTrail();

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(updateActiveLink, 50), { passive: true });
window.addEventListener('scroll', debounce(animateSkills, 50), { passive: true });

// ===================================
// Performance Monitoring
// ===================================
if ('PerformanceObserver' in window) {
    try {
        // Monitor Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Monitor First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Monitor Cumulative Layout Shift
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsScore += entry.value;
                    console.log('CLS:', clsScore);
                }
            }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
        console.warn('Performance monitoring not fully supported:', e);
    }
}

// ===================================
// Error Handling
// ===================================
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // You can send errors to an analytics service here
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // You can send errors to an analytics service here
});

// ===================================
// Console Easter Egg
// ===================================
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
console.log('%cLike what you see? Let\'s work together!', 'font-size: 14px; color: #a1a1aa;');
console.log('%c📧 alex.johnson@example.com', 'font-size: 12px; color: #ec4899;');

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial active link update
    updateActiveLink();

    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');

    // Log Web Vitals if available
    if ('performance' in window && 'getEntriesByType' in performance) {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log('📊 Performance Metrics:');
            console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
            console.log('Load Complete:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }
    }

    console.log('Portfolio initialized successfully! 🚀');
});
