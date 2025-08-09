/**
 * WinSoftHub Landing Page JavaScript
 * Lightweight futuristic animations and interactivity
 */

/**
 * Performance Optimization Functions
 */
function getOptimalParticleCount() {
    const width = window.innerWidth;
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Reduce particles on smaller screens and high DPI displays for better performance
    if (width < 480) return 8;
    if (width < 768) return 15;
    if (pixelRatio > 2) return 20;
    if (width > 1920) return 40;
    return 25;
}

/**
 * Cyber Particle System
 * Creates futuristic floating particles with neon colors
 */
function initCyberParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Optimize particle count based on device
    const particleCount = getOptimalParticleCount();
    const colors = ['#00f5ff', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        createCyberParticle(particlesContainer, colors);
    }
    
    // Create new particles periodically
    setInterval(() => {
        if (document.querySelectorAll('.particle').length < particleCount) {
            createCyberParticle(particlesContainer, colors);
        }
    }, 3000);
}

function createCyberParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 5 + 2; // 2-7px
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 10 + 15; // 15-25s
    const delay = Math.random() * 4; // 0-4s delay
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Apply styles
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = startX + 'px';
    particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    
    // Add neon glow to some particles
    if (Math.random() > 0.6) {
        particle.style.boxShadow = `0 0 15px ${color}`;
        particle.style.background = color;
    }
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

/**
 * Fade In Animations
 * Handles smooth fade-in animations for elements
 */
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

/**
 * Download Button Interactions
 * Enhanced download button with cyber effects
 */
function initDownloadButton() {
    const downloadButton = document.querySelector('.download-button');
    if (!downloadButton) return;
    
    // Add cyber ripple effect on click
    downloadButton.addEventListener('click', function(e) {
        createCyberRipple(e, this);
    });
    
    // Add subtle magnetic effect
    downloadButton.addEventListener('mousemove', function(e) {
        createSubtleMagneticEffect(e, this);
    });
    
    downloadButton.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
}

function createCyberRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'cyber-ripple';
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, transparent 70%)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'cyberRipple 0.8s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 800);
}

function createSubtleMagneticEffect(event, button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (event.clientX - centerX) * 0.05;
    const deltaY = (event.clientY - centerY) * 0.05;
    
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

/**
 * Dynamic CSS Animations
 * Add dynamic keyframes for cyber effects
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes cyberRipple {
        to {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    .animate {
        animation-play-state: running !important;
    }
`;
document.head.appendChild(style);

/**
 * Accessibility Enhancements
 * Respect user preferences for reduced motion
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-normal', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
    
    // Disable particle animations
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.animation = 'none';
    });
}

/**
 * Touch Device Optimizations
 * Enhanced experience for touch devices
 */
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch-specific styles
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        .touch-device .download-button:hover {
            transform: none;
        }
        
        .touch-device .download-button:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(touchStyle);
}

/**
 * Error Handling
 * Graceful fallbacks for unsupported features
 */
window.addEventListener('error', function(e) {
    console.warn('Non-critical error:', e.message);
    // Continue execution - don't let small errors break the experience
});

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initCyberParticles();
    initFadeInAnimations();
    initDownloadButton();
    
    console.log('WinSoftHub Landing Page Loaded Successfully!');
});
