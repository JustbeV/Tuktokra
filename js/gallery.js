/* ====================================
   GALLERY JAVASCRIPT
   ==================================== */

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let allGalleryItems = [];

function getGalleryItems() {
    const galleryBoxes = document.querySelectorAll('.gallery-box');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryBoxes.length > 0) {
        return Array.from(galleryBoxes);
    }

    return Array.from(galleryItems);
}

function observeGalleryImages() {
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
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
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('.gallery-box img, .gallery-item img').forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

function observeGalleryItems() {
    if (!('IntersectionObserver' in window)) return;

    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                if (img && !img.src && img.dataset.src) {
                    img.src = img.dataset.src;
                }
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.gallery-box, .gallery-item').forEach(el => {
        itemObserver.observe(el);
    });
}

function refreshGalleryItems() {
    allGalleryItems = getGalleryItems();

    allGalleryItems.forEach(item => {
        item.style.cursor = 'pointer';
    });

    observeGalleryImages();
    observeGalleryItems();
}

// Open lightbox
function openLightbox(index) {
    refreshGalleryItems();
    if (!lightbox || allGalleryItems.length === 0) return;

    currentImageIndex = index;
    const item = allGalleryItems[index];
    const img = item.querySelector('img');
    const info = item.querySelector('.gallery-info') || item.querySelector('.gallery-overlay');

    if (img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;

        if (info) {
            const title = info.querySelector('h3') || info.querySelector('h4');
            const description = info.querySelector('p');

            lightboxTitle.textContent = title ? title.textContent : 'Gallery Image';
            lightboxDescription.textContent = description ? description.textContent : '';
        }
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % allGalleryItems.length;
    openLightbox(currentImageIndex);
}

// Show previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + allGalleryItems.length) % allGalleryItems.length;
    openLightbox(currentImageIndex);
}

document.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-box, .gallery-item');
    if (!item) return;

    refreshGalleryItems();
    const index = allGalleryItems.indexOf(item);
    if (index !== -1) {
        openLightbox(index);
    }
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            e.preventDefault();
            closeLightbox();
            break;
        case 'ArrowRight':
            e.preventDefault();
            showNextImage();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            showPrevImage();
            break;
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            showNextImage();
        } else {
            showPrevImage();
        }
    }
}

// Gallery hover effects
document.addEventListener('mouseover', (e) => {
    const item = e.target.closest('.gallery-box, .gallery-item');
    if (item) {
        item.style.transform = 'scale(1.05)';
    }
});

document.addEventListener('mouseout', (e) => {
    const item = e.target.closest('.gallery-box, .gallery-item');
    if (item && !item.contains(e.relatedTarget)) {
        item.style.transform = 'scale(1)';
    }
});

// Category filter animation
const filterBtns = document.querySelectorAll('.filter-btn');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            document.querySelectorAll('[data-category]').forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.opacity = '0';
                    item.style.display = '';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease';
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

// Accessibility - Keyboard focus management
document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Tab') {
        e.preventDefault();
        const focusableElements = lightbox.querySelectorAll('button, a, img');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (e.shiftKey) {
            if (activeElement === firstElement) {
                lastElement.focus();
            }
        } else if (activeElement === lastElement) {
            firstElement.focus();
        }
    }
});

function updateImageCounter() {
    if (allGalleryItems.length > 0 && lightbox.classList.contains('active')) {
        const counter = `${currentImageIndex + 1} / ${allGalleryItems.length}`;
        console.log(`Image: ${counter}`);
    }
}

window.galleryUtils = {
    openLightbox,
    closeLightbox,
    showNextImage,
    showPrevImage,
    refreshGalleryItems,
    updateImageCounter
};

refreshGalleryItems();
