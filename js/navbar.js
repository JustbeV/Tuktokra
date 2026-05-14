/* ====================================
   NAVBAR JAVASCRIPT
   ==================================== */

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);

    if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Navbar Sticky Behavior
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;

    // Add scroll shadow when scrolled
    if (scrollTop > 0) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Navbar Logo Click - Go to Home
const navLogo = document.querySelector('.nav-logo');

if (navLogo) {
    navLogo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    navLogo.style.cursor = 'pointer';
}

// Prevent navbar from closing when clicking on active link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Check if it's the same page
        const href = link.getAttribute('href');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            e.preventDefault();
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Submenu indicator (for future expansion)
const navItems = document.querySelectorAll('.nav-menu > li');

navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    // Add visual feedback on hover
    item.addEventListener('mouseenter', () => {
        link.style.transition = 'all 0.3s ease';
    });

    item.addEventListener('mouseleave', () => {
        link.style.transition = 'all 0.3s ease';
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Alt + H to toggle hamburger menu (mobile-friendly shortcut)
    if (e.altKey && e.key === 'h') {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            hamburger.click();
        }
    }

    // Arrow keys for nav
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink && navLinks.length > 0) {
            const currentIndex = Array.from(navLinks).indexOf(activeLink);
            let nextIndex;

            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % navLinks.length;
            } else {
                nextIndex = currentIndex - 1 < 0 ? navLinks.length - 1 : currentIndex - 1;
            }

            navLinks[nextIndex].focus();
        }
    }
});

// Reduce motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    navLinks.forEach(link => {
        link.style.transition = 'none';
    });
}

// Mobile detection
const isMobile = window.innerWidth <= 768;

// Handle window resize
window.addEventListener('resize', () => {
    const newIsMobile = window.innerWidth <= 768;
    
    if (isMobile !== newIsMobile) {
        // Reset menu if transitioning between mobile and desktop
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add search functionality (optional enhancement)
function initializeNavSearch() {
    // This can be expanded to add a search bar in the navbar
    // Placeholder for future implementation
    console.log('Search functionality ready for implementation');
}

// Export navbar functions
window.navbarUtils = {
    toggleMenu: () => hamburger.click(),
    closeMenu: () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    },
    openMenu: () => {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
    }
};
