/* ====================================
   ANIMATIONS JAVASCRIPT
   ==================================== */

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.scroll-reveal, .stagger-item, .stat-card, .hike-card, .reason-card, .testimonial-card, .event-card, .platform-card, .guide-card, .team-member, .commitment-item, .requirement-card, .tip-card, .mvv-card, .reason-item');

const revealObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger animation delay
            const delay = index * 0.1;
            entry.target.style.animation = `slideUp 0.8s ease forwards`;
            entry.target.style.animationDelay = `${delay}s`;
            entry.target.classList.add('reveal');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    revealObserver.observe(element);
});

// Parallax Background Animation
const parallaxSections = document.querySelectorAll('.hero, .page-header, [data-parallax]');

window.addEventListener('scroll', throttle(() => {
    parallaxSections.forEach(section => {
        const scrollPosition = window.scrollY;
        const sectionTop = section.offsetTop;
        const distance = scrollPosition - sectionTop;

        if (distance > -window.innerHeight && distance < window.innerHeight) {
            const moveAmount = distance * 0.5;
            section.style.backgroundPosition = `center ${moveAmount}px`;
        }
    });
}, 20));

// Floating Elements Animation
const floatingElements = document.querySelectorAll('.hero::before, .page-header::before');

floatingElements.forEach(el => {
    el.style.animation = 'bgShift 15s ease-in-out infinite';
});

// Smooth counter animation with intersection observer
const counterElements = document.querySelectorAll('[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    entry.target.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    entry.target.textContent = target.toLocaleString();
                    entry.target.classList.add('counted');
                }
            };

            updateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

counterElements.forEach(el => counterObserver.observe(el));

// Hover animations for interactive elements
const hoverElements = document.querySelectorAll('.btn, .card, .platform-card, .guide-card, .expedition-card');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Text animation on page load
function animatePageTitle() {
    const title = document.querySelector('h1');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            title.style.transition = 'all 0.8s ease-out';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Stagger animation for lists
function animateList(listClass, delay = 100) {
    const items = document.querySelectorAll(listClass);
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * delay);
    });
}

// Gradient text animation
function createGradientText(element) {
    if (!element) return;
    
    element.style.background = 'linear-gradient(90deg, #2c5f2d, #d4af37, #2c5f2d)';
    element.style.backgroundSize = '200% auto';
    element.style.webkitBackgroundClip = 'text';
    element.style.webkitTextFillColor = 'transparent';
    element.style.animation = 'textGradient 3s linear infinite';
}

// Glow button effect
function addGlowEffect(buttonElement) {
    buttonElement.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(44, 95, 45, 0.8)';
    });

    buttonElement.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 4px 15px rgba(44, 95, 45, 0.4)';
    });
}

// Initialize glow effect on all primary buttons
document.querySelectorAll('.btn-primary').forEach(btn => addGlowEffect(btn));

// Ripple effect on button click
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Scroll-triggered animations for specific sections
const sectionAnimations = {
    '.hero': () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.animation = 'fadeIn 1s ease-out';
        }
    },
    '.featured-hikes': () => {
        const cards = document.querySelectorAll('.hike-card');
        cards.forEach((card, index) => {
            card.style.animation = `slideUp 0.8s ease-out forwards`;
            card.style.animationDelay = `${index * 0.15}s`;
        });
    },
    '.stats-section': () => {
        const stats = document.querySelectorAll('.stat-card');
        stats.forEach((stat, index) => {
            stat.style.animation = `scaleIn 0.6s ease-out forwards`;
            stat.style.animationDelay = `${index * 0.1}s`;
        });
    },
    '.testimonials': () => {
        const testimonials = document.querySelectorAll('.testimonial-card');
        testimonials.forEach((card, index) => {
            card.style.animation = `slideUp 0.8s ease-out forwards`;
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
};

// Trigger section animations when they come into view
Object.entries(sectionAnimations).forEach(([selector, animation]) => {
    const element = document.querySelector(selector);
    if (element) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(element);
    }
});

// Utility function for throttle
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func.apply(this, args);
    };
}

// Image hover zoom animation
document.querySelectorAll('.gallery-item img, .hike-image').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// FAQ open/close animation
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.faq-icon');

        if (answer.classList.contains('show')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            setTimeout(() => {
                answer.style.maxHeight = '0';
            }, 10);
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.style.maxHeight = '0';
            answer.classList.add('show');
            setTimeout(() => {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }, 10);
            icon.style.transform = 'rotate(45deg)';
        }
    });
});

// Progressive image loading animation
function progressiveImageLoad(img) {
    img.addEventListener('load', () => {
        img.style.animation = 'fadeIn 0.5s ease-in-out';
    });
}

document.querySelectorAll('img').forEach(progressiveImageLoad);

// Cursor animation on elements (optional)
const cursorFollowElements = document.querySelectorAll('a, button, .btn');

cursorFollowElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.cursor = 'pointer';
    });
});

// Mobile-optimized animations (reduce motion for mobile)
const mediaQuery = window.matchMedia('(max-width: 768px)');

function handleMediaChange(e) {
    if (e.matches) {
        // Mobile: reduce animation complexity
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationDuration = '0.3s';
        });
    } else {
        // Desktop: full animations
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationDuration = '0.8s';
        });
    }
}

mediaQuery.addListener(handleMediaChange);
handleMediaChange(mediaQuery);

// Respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0s');
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none !important';
        el.style.transition = 'none !important';
    });
}

// Performance monitoring
let animationCount = 0;
console.log('Animations initialized:', {
    revealElements: revealElements.length,
    counterElements: counterElements.length,
    parallaxSections: parallaxSections.length
});

// Export animation functions for external use
window.animationUtils = {
    animatePageTitle,
    animateList,
    createGradientText,
    addGlowEffect,
    createRipple,
    progressiveImageLoad
};
