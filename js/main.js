/* ====================================
   MAIN JAVASCRIPT
   ==================================== */

// Utility Functions
const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

const throttle = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func.apply(this, args);
    };
};

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Load Data from JSON
let siteData = {};

async function loadData() {
    try {
        const response = await fetch('data.json');
        siteData = await response.json();
        populateStats();
        populateNavigation();
        populateFeaturedHikes();
        populateExpeditions();
        populateHikeRequirements();
        populateGuides();
        populatePreparationTips();
        populateGallery();
        populateTestimonials();
        populateEvents();
        populateContactInfo();
        populateFAQ();
        populateFooter();
        populateAboutPage();
    } catch (error) {
        console.log('Data file not found, using default values');
    }
}

// Populate Navigation
function populateNavigation() {
    if (!siteData.navigation) return;
    
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo && siteData.siteInfo) {
        navLogo.innerHTML = `<span class="logo-icon">${siteData.siteInfo.logo}</span>${siteData.siteInfo.siteName}`;
    }
    
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.innerHTML = siteData.navigation.map(item => 
            `<li><a href="${item.url}" class="nav-link">${item.label}</a></li>`
        ).join('');
    }
}

// Populate Featured Hikes
function populateFeaturedHikes() {
    if (!siteData.featuredHikes) return;
    
    const hikesGrid = document.querySelector('.hikes-grid');
    if (!hikesGrid) return;
    
    hikesGrid.innerHTML = siteData.featuredHikes.map(hike => {
        const difficultyClass = hike.difficulty.toLowerCase().includes('hard') ? 'hard' : hike.difficulty.toLowerCase().includes('moderate') ? 'moderate' : 'easy';
        const difficultyLabel = hike.difficulty.charAt(0).toUpperCase() + hike.difficulty.slice(1);
        const backgroundImage = hike.image ? `linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.42)), url('${hike.image}')` : 'linear-gradient(135deg, #2c5f2d 0%, #1a3a1b 100%)';

        return `
        <article class="hike-card">
            <div class="hike-image" style="background-image: ${backgroundImage}; background-size: cover; background-position: center;">
                <span class="difficulty-badge difficulty-${difficultyClass}">${difficultyLabel}</span>
            </div>
            <div class="hike-content">
                <h3>${hike.title}</h3>
                <p class="hike-meta">🕐 ${hike.duration} • 🗻 ${hike.elevation} • 📍 ${hike.distance}</p>
                <p class="hike-description">${hike.description}</p>
                <a href="guides.html" class="btn-link">Learn More →</a>
            </div>
        </article>
    `;
    }).join('');
}

// Populate Expeditions
function populateExpeditions() {
    if (!siteData.expeditions) return;
    
    const expeditionsContainers = document.querySelectorAll('.expeditions-list, .hikes-list');
    if (expeditionsContainers.length === 0) return;
    
    const expeditionCards = siteData.expeditions.map(exp => {
        const difficulty = exp.difficulty || 'easy';
        const difficultyClass = difficulty === 'moderate' ? 'medium' : difficulty;
        const difficultyLabel = difficulty === 'hard'
            ? 'Advanced'
            : difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        const estimatedSpend = exp.estimatedBudget || exp.price || 0;
        const formattedSpend = typeof estimatedSpend === 'number' ? estimatedSpend.toLocaleString() : estimatedSpend;
        const budgetItems = exp.budgetItems || exp.inclusions || [];

        return `
        <article class="expedition-card" data-difficulty="${exp.difficulty}">
            <div class="expedition-date">
                <span class="month">${exp.dateMonth}</span>
                <span class="day">${exp.dateDay}</span>
            </div>
            <div class="expedition-details">
                <div class="expedition-header">
                    <h3>${exp.title}</h3>
                    <span class="difficulty-badge difficulty-${difficultyClass}">${difficultyLabel}</span>
                </div>
                <p class="expedition-location">📍 ${exp.location}</p>
                <p class="expedition-description">${exp.description}</p>
                <div class="expedition-info">
                    <div class="info-item">
                        <span class="info-label">Duration:</span>
                        <span class="info-value">${exp.duration}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Distance:</span>
                        <span class="info-value">${exp.distance}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Elevation:</span>
                        <span class="info-value">${exp.elevation}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Group Size:</span>
                        <span class="info-value">${exp.groupSize}</span>
                    </div>
                </div>
                <div class="expedition-inclusions">
                    <h4>You may spend on:</h4>
                    <ul>${budgetItems.map(item => `<li>${item}</li>`).join('')}</ul>
                </div>
                ${exp.note ? `<p class="expedition-note">${exp.note}</p>` : ''}
                <div class="expedition-pricing">
                    <span class="price">₱${formattedSpend}</span>
                    <span class="per-person">estimated spend</span>
                </div>
                <a href="guides.html" class="btn btn-primary">Check Details</a>
            </div>
        </article>
    `;
    }).join('');

    expeditionsContainers.forEach(container => {
        container.innerHTML = expeditionCards;
    });
}

// Populate Hike Requirements
function populateHikeRequirements() {
    if (!siteData.hikeRequirements) return;

    const requirementsGrid = document.querySelector('.requirements-grid');
    if (!requirementsGrid) return;

    requirementsGrid.innerHTML = siteData.hikeRequirements.map(section => `
        <div class="requirement-card">
            <h3>${section.title}</h3>
            <ul>${section.items.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
    `).join('');
}

// Populate Guides
function populateGuides() {
    if (!siteData.guides) return;
    
    const guidesContainer = document.querySelector('.guides-container, .guides-grid');
    if (!guidesContainer) return;
    
    guidesContainer.innerHTML = siteData.guides.map(guide => {
        const difficulty = guide.difficulty || 'easy';
        const difficultyClass = difficulty === 'moderate' ? 'medium' : difficulty;
        const difficultyLabel = difficulty === 'hard'
            ? 'Advanced'
            : difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        const trailInfo = guide.trailInfo || {};

        return `
        <article class="guide-card">
            <div class="guide-header">
                <h3>${guide.title}</h3>
                <span class="guide-difficulty difficulty-${difficultyClass}">${difficultyLabel}</span>
            </div>
            <div class="guide-details-grid">
                <div class="detail-item">
                    <span class="detail-icon">📍</span>
                    <div>
                        <p class="detail-label">Location</p>
                        <p class="detail-value">${guide.location}</p>
                    </div>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">⛏</span>
                    <div>
                        <p class="detail-label">Elevation</p>
                        <p class="detail-value">${guide.elevation}</p>
                    </div>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">⏱</span>
                    <div>
                        <p class="detail-label">Duration</p>
                        <p class="detail-value">${guide.duration}</p>
                    </div>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">📏</span>
                    <div>
                        <p class="detail-label">Distance</p>
                        <p class="detail-value">${guide.distance}</p>
                    </div>
                </div>
            </div>
            <div class="guide-section">
                <h4>Trail Description</h4>
                <p>${guide.description}</p>
            </div>
            <div class="guide-section">
                <h4>Suggested Flow</h4>
                <ol>${guide.itinerary.map(item => `<li>${item}</li>`).join('')}</ol>
            </div>
            <div class="guide-section">
                <h4>What to Bring</h4>
                <ul>${guide.essentials.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>
            <div class="guide-section">
                <h4>Trail Information</h4>
                <div class="info-grid">
                    ${Object.entries(trailInfo).map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`).join('')}
                </div>
            </div>
            <div class="guide-section">
                <h4>Safety Reminders</h4>
                <ul>${guide.safety.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>
            <a href="hikes.html" class="btn btn-primary">View Cost Guide</a>
        </article>
    `;
    }).join('');
}

// Populate Preparation Tips
function populatePreparationTips() {
    if (!siteData.preparationTips) return;

    const tipsGrid = document.querySelector('.tips-grid');
    if (!tipsGrid) return;

    tipsGrid.innerHTML = siteData.preparationTips.map(tip => `
        <div class="tip-card">
            <h3>${tip.title}</h3>
            <p>${tip.description}</p>
        </div>
    `).join('');
}

// Populate Gallery
function populateGallery() {
    if (!siteData.gallery) return;
    
    const galleryMasonry = document.querySelector('.gallery-masonry');
    if (galleryMasonry) {
        galleryMasonry.innerHTML = siteData.gallery.map(item => `
        <div class="gallery-box" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        </div>
    `).join('');
    }

    const galleryPreview = document.querySelector('.gallery-preview .gallery-grid');
    if (galleryPreview) {
        galleryPreview.innerHTML = siteData.gallery.slice(0, 4).map(item => `
        <a class="gallery-item" href="gallery.html" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <span>${item.title}</span>
            </div>
        </a>
    `).join('');
    }
    
    // Store gallery data globally for lightbox
    window.galleryData = siteData.gallery;

    if (window.galleryUtils && typeof window.galleryUtils.refreshGalleryItems === 'function') {
        window.galleryUtils.refreshGalleryItems();
    }
}

// Populate Testimonials
function populateTestimonials() {
    if (!siteData.testimonials) return;
    
    const testimonialsContainer = document.querySelector('.testimonials-grid');
    if (!testimonialsContainer) return;
    
    testimonialsContainer.innerHTML = siteData.testimonials.map(testimonial => `
        <article class="testimonial-card">
            <div class="testimonial-content">
                <div class="testimonial-rating">
                    ${'★'.repeat(testimonial.rating)}
                </div>
                <p class="testimonial-text">"${testimonial.text}"</p>
            </div>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="author-avatar">
                <p class="author-name">${testimonial.name}</p>
            </div>
        </article>
    `).join('');
}

// Populate Events
function populateEvents() {
    if (!siteData.upcomingEvents) return;
    
    const eventsContainer = document.querySelector('.events-grid');
    if (!eventsContainer) return;
    
    eventsContainer.innerHTML = siteData.upcomingEvents.map(event => `
        <article class="event-card">
            <div class="event-date-badge">
                <span class="date-month">${event.month}</span>
                <span class="date-day">${event.day}</span>
            </div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p class="event-location">📍 ${event.location}</p>
                <p class="event-description">${event.description}</p>
                <a href="contact.html" class="btn btn-primary">Learn More</a>
            </div>
        </article>
    `).join('');
}

// Populate Contact Info
function populateContactInfo() {
    if (!siteData.contactInfo) return;
    
    const contactInfoContainer = document.querySelector('.contact-info-grid');
    if (contactInfoContainer) {
        contactInfoContainer.innerHTML = `
            <div class="info-box">
                <div class="info-icon">📍</div>
                <div>
                    <h3>Address</h3>
                    <p>${siteData.contactInfo.address}</p>
                </div>
            </div>
            <div class="info-box">
                <div class="info-icon">📞</div>
                <div>
                    <h3>Phone</h3>
                    <p>${siteData.contactInfo.phone}</p>
                </div>
            </div>
            <div class="info-box">
                <div class="info-icon">📧</div>
                <div>
                    <h3>Email</h3>
                    <p>${siteData.contactInfo.email}</p>
                </div>
            </div>
            <div class="info-box">
                <div class="info-icon">🕒</div>
                <div>
                    <h3>Hours</h3>
                    <p>${siteData.contactInfo.hours}</p>
                </div>
            </div>
        `;
    }
    
    const socialLinksContainer = document.querySelector('.social-links-contact');
    if (socialLinksContainer) {
        socialLinksContainer.innerHTML = siteData.contactInfo.socialLinks.map(link => `
            <a href="${link.url}" class="social-link" target="_blank" rel="noopener noreferrer">
                <span class="social-icon">${link.icon}</span>
                <span>${link.platform}</span>
            </a>
        `).join('');
    }

    const socialPlatforms = document.querySelector('.social-platforms');
    if (socialPlatforms) {
        socialPlatforms.innerHTML = siteData.contactInfo.socialLinks.map(link => `
            <div class="platform-card">
                <div class="platform-icon">${link.icon}</div>
                <h3>${link.platform}</h3>
                <p>Follow Tuktokra on ${link.platform} for local hiking updates, photos, and community notes.</p>
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Open ${link.platform}</a>
            </div>
        `).join('');
    }

    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.innerHTML = `
            <p>📍 ${siteData.contactInfo.address}</p>
            <p style="font-size: 0.9em; color: #666; margin-top: 10px;">Map location can be added here later.</p>
        `;
    }

    if (siteData.formLabels) {
        document.querySelectorAll('[data-label-key]').forEach(label => {
            const key = label.getAttribute('data-label-key');
            if (!siteData.formLabels[key]) return;

            const requiredMark = label.textContent.includes('*') ? ' *' : '';
            label.textContent = `${siteData.formLabels[key]}${requiredMark}`;
        });
    }
}

// Populate FAQ
function populateFAQ() {
    if (!siteData.faq) return;
    
    const faqContainers = document.querySelectorAll('.faq-list');
    
    faqContainers.forEach(container => {
        container.innerHTML = siteData.faq.map(item => `
            <div class="faq-item">
                <button class="faq-question">
                    ${item.question}
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');
    });
    
    // Reattach event listeners
    setupFAQListeners();
}

// Populate Footer
function populateFooter() {
    if (!siteData.footer) return;
    
    const footerDescription = document.querySelector('.footer-description');
    if (footerDescription) {
        footerDescription.textContent = siteData.footer.description;
    }
}

// Populate About Page
function populateAboutPage() {
    if (!siteData.aboutPage) return;
    
    const storyContent = document.querySelector('.story-content');
    if (storyContent) {
        const storyParagraphs = Array.isArray(siteData.aboutPage.story)
            ? siteData.aboutPage.story
            : [siteData.aboutPage.story];
        storyContent.innerHTML = storyParagraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
    }
    
    const mvvCards = document.querySelector('.mvv-grid');
    if (mvvCards) {
        const values = Array.isArray(siteData.aboutPage.values)
            ? `<ul>${siteData.aboutPage.values.map(value => `<li>${value}</li>`).join('')}</ul>`
            : `<p>${siteData.aboutPage.values}</p>`;

        mvvCards.innerHTML = `
            <div class="mvv-card">
                <h3>Our Mission</h3>
                <p>${siteData.aboutPage.mission}</p>
            </div>
            <div class="mvv-card">
                <h3>Our Vision</h3>
                <p>${siteData.aboutPage.vision}</p>
            </div>
            <div class="mvv-card">
                <h3>Our Values</h3>
                ${values}
            </div>
        `;
    }

    const reasonsContainer = document.querySelector('.reasons-flex');
    if (reasonsContainer && siteData.aboutPage.whyWeHike) {
        reasonsContainer.innerHTML = siteData.aboutPage.whyWeHike.map(reason => `
            <div class="reason-item">
                <h3>${reason.title}</h3>
                <p>${reason.description}</p>
            </div>
        `).join('');
    }

    const impactStats = document.querySelector('.impact-stats');
    if (impactStats && siteData.aboutPage.impactStats) {
        impactStats.innerHTML = siteData.aboutPage.impactStats.map(stat => `
            <div class="impact-stat">
                <h3 class="stat-number">${stat.value}</h3>
                <p>${stat.label}</p>
            </div>
        `).join('');
    }

    const environmentContent = document.querySelector('.environment-content');
    if (environmentContent && siteData.aboutPage.environment) {
        const environment = siteData.aboutPage.environment;

        environmentContent.innerHTML = `
            <h3>${environment.title}</h3>
            <p>${environment.description}</p>
            <div class="commitment-grid">
                ${environment.items.map(item => `
                    <div class="commitment-item">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    const teamContainer = document.querySelector('.team-grid[data-source="json"]');
    if (teamContainer && siteData.aboutPage.teamMembers) {
        teamContainer.innerHTML = siteData.aboutPage.teamMembers.map(member => `
            <div class="team-member">
                <img src="${member.image}" alt="${member.name}" class="member-avatar">
                <h3>${member.name}</h3>
                <p class="member-title">${member.role}</p>
                <p class="member-bio">${member.bio}</p>
            </div>
        `).join('');
    }

    const communityQuotes = document.querySelector('.testimonials-showcase');
    if (communityQuotes && siteData.testimonials) {
        communityQuotes.innerHTML = siteData.testimonials.map(testimonial => `
            <blockquote>
                <p>"${testimonial.text}"</p>
                <footer>${testimonial.name}</footer>
            </blockquote>
        `).join('');
    }
}

// Setup FAQ Event Listeners
function setupFAQListeners() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            
            // Close other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.querySelector('.faq-answer').classList.remove('show');
                    item.querySelector('.faq-question').classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            answer.classList.toggle('show');
            question.classList.toggle('active');
        });
    });
}

// Populate stats from JSON data
function populateStats() {
    if (siteData.stats) {
        const statElements = document.querySelectorAll('[data-key]');
        statElements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (siteData.stats[key]) {
                element.setAttribute('data-count', siteData.stats[key]);
            }
        });
    }
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters when they come into view
            if (entry.target.querySelector('[data-count]')) {
                animateCounters();
            }

            // Add reveal class for scroll animations
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-reveal class
document.querySelectorAll('.scroll-reveal, .stat-card, .hike-card, .reason-card').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter items
        document.querySelectorAll('[data-category], [data-difficulty]').forEach(item => {
            const itemCategory = item.getAttribute('data-category') || item.getAttribute('data-difficulty');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = '';
                setTimeout(() => item.classList.add('reveal'), 10);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formStatus = document.getElementById('formStatus');
        
        // Validate form
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showFormStatus('Please fill in all required fields', 'error', formStatus);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormStatus('Please enter a valid email address', 'error', formStatus);
            return;
        }

        // Simulate form submission
        showFormStatus('Sending message...', 'success', formStatus);
        
        setTimeout(() => {
            showFormStatus('Thank you! Your message has been sent successfully. We\'ll get back to you soon!', 'success', formStatus);
            contactForm.reset();

            // Clear message after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('success', 'error');
                formStatus.textContent = '';
            }, 5000);
        }, 1000);
    });
}

function showFormStatus(message, type, element) {
    element.textContent = message;
    element.className = `form-status ${type}`;
}

// Newsletter Form
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]').value.trim();
        
        if (!email) {
            alert('Please enter your email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate subscription
        alert('Thank you for subscribing! Check your email for confirmation.');
        form.reset();
    });
});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Parallax Scrolling Effect
const parallaxElements = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', throttle(() => {
    parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementOffset = element.offsetTop;
        const distance = scrollPosition - elementOffset;
        element.style.transform = `translateY(${distance * 0.5}px)`;
    });
}, 20));

// Active Navigation Link
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize active nav link on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// Smooth Page Transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0.95';
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Accessibility - Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Escape key to close modals, dropdowns, etc.
    if (e.key === 'Escape') {
        document.querySelectorAll('.lightbox.active').forEach(el => {
            el.classList.remove('active');
        });
    }

    // Tab key - ensure focus management
    if (e.key === 'Tab') {
        // Custom focus management can be added here
    }
});

// Loading State Management
function showLoadingState(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoadingState(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Error Handling
window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    // Can send error reports to server here
});

// Performance Monitoring
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}

// Cookie Consent (Example)
function checkCookieConsent() {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
        // Show cookie consent banner (would need HTML element)
        // For now, just set it
        localStorage.setItem('cookieConsent', 'true');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadData(); // Load data from JSON file
    checkCookieConsent();
    updateActiveNavLink();
    
    // Trigger animations on load
    document.querySelectorAll('.scroll-reveal').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('reveal');
        }, index * 100);
    });
});

// Export functions for use in other files
window.utils = {
    debounce,
    throttle,
    showFormStatus,
    showLoadingState,
    hideLoadingState,
    animateCounters
};
