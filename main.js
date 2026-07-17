/**
 * SK CONSTRUCTION - PREMIUM JAVASCRIPT
 * Modern, Optimized, SEO-Friendly
 * Version: 2.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================================
    // 1. PAGE LOADER
    // ============================================================
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        window.addEventListener('load', function() {
            pageLoader.classList.add('hidden');
            setTimeout(() => {
                document.querySelectorAll('.section-reveal').forEach(el => {
                    el.classList.add('visible');
                });
            }, 200);
        });
        setTimeout(() => {
            if (!pageLoader.classList.contains('hidden')) {
                pageLoader.classList.add('hidden');
            }
        }, 3000);
    }

    // ============================================================
    // 2. SCROLL PROGRESS BAR
    // ============================================================
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.width = progress + '%';
        });
    }

    // ============================================================
    // 3. HEADER - Glass Effect
    // ============================================================
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ============================================================
    // 4. MOBILE MENU
    // ============================================================
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');

    if (mobileBtn && navbar) {
        mobileBtn.addEventListener('click', function() {
            const isActive = navbar.classList.toggle('active');
            this.classList.toggle('active');
            this.setAttribute('aria-expanded', isActive);
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                mobileBtn.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && !mobileBtn.contains(e.target)) {
                navbar.classList.remove('active');
                mobileBtn.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                mobileBtn.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
                mobileBtn.focus();
            }
        });
    }

    // ============================================================
    // 5. ACTIVE NAV LINK
    // ============================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                            link.setAttribute('aria-current', 'page');
                        } else {
                            link.removeAttribute('aria-current');
                        }
                    });
                }
            });
        }, { rootMargin: '-100px 0px -100px 0px', threshold: 0.1 });

        sections.forEach(section => navObserver.observe(section));
    }

    // ============================================================
    // 6. SMOOTH SCROLL
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 7. BACK TO TOP
    // ============================================================
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backBtn.classList.add('visible');
            } else {
                backBtn.classList.remove('visible');
            }
        });
        backBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================================
    // 8. ANIMATED COUNTERS
    // ============================================================
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    let current = 0;
                    const increment = Math.ceil(target / 60);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            el.textContent = current + '+';
                        }
                    }, 30);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    // ============================================================
    // 9. PROJECT FILTER
    // ============================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-item');

    if (filterBtns.length && projects.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');

                const filter = this.getAttribute('data-filter');
                projects.forEach(project => {
                    const category = project.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        project.style.display = 'block';
                        project.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }

    // ============================================================
    // 10. PROJECT LIGHTBOX
    // ============================================================
    const lightbox = document.getElementById('projectLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxLocation = document.getElementById('lightboxLocation');
    const lightboxStatus = document.getElementById('lightboxStatus');
    const lightboxArea = document.getElementById('lightboxArea');
    const lightboxBudget = document.getElementById('lightboxBudget');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && projects.length) {
        projects.forEach(project => {
            project.addEventListener('click', function() {
                const img = this.querySelector('img');
                const title = this.getAttribute('data-title') || this.querySelector('.project-overlay h4')?.textContent || 'Project';
                const location = this.getAttribute('data-location') || 'Samastipur';
                const status = this.getAttribute('data-status') || 'Completed';
                const area = this.getAttribute('data-area') || 'N/A';
                const budget = this.getAttribute('data-budget') || 'Contact for quote';

                if (lightboxImage) lightboxImage.src = img ? img.src : '';
                if (lightboxTitle) lightboxTitle.textContent = title;
                if (lightboxLocation) lightboxLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${location}`;
                if (lightboxStatus) lightboxStatus.innerHTML = `<i class="fas fa-info-circle"></i> Status: ${status}`;
                if (lightboxArea) lightboxArea.innerHTML = `<i class="fas fa-arrows-alt"></i> Area: ${area}`;
                if (lightboxBudget) lightboxBudget.innerHTML = `<i class="fas fa-rupee-sign"></i> Budget: ${budget}`;

                lightbox.classList.add('active');
                lightbox.removeAttribute('hidden');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = function() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('hidden', '');
            document.body.style.overflow = '';
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // ============================================================
    // 11. TESTIMONIAL SLIDER
    // ============================================================
    const track = document.getElementById('testimonialTrack');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const dotsContainer = document.getElementById('sliderDots');

    if (track && cards.length) {
        let currentIndex = 0;
        let autoSlideInterval;
        const isMobile = window.innerWidth < 768;
        const cardsPerView = isMobile ? 1 : window.innerWidth < 992 ? 2 : 3;
        const totalSlides = Math.ceil(cards.length / cardsPerView);

        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('data-index', i);
                dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
                dot.addEventListener('click', function() {
                    goToSlide(parseInt(this.getAttribute('data-index')));
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateSlider() {
            const cardWidth = cards[0]?.offsetWidth || 300;
            const gap = 20;
            const offset = currentIndex * (cardWidth + gap) * cardsPerView;
            track.style.transform = `translateX(-${offset}px)`;

            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.slider-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        }

        function goToSlide(index) {
            const maxIndex = totalSlides - 1;
            currentIndex = Math.max(0, Math.min(maxIndex, index));
            updateSlider();
        }

        function slide(direction) {
            goToSlide(currentIndex + direction);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => { slide(-1); resetAutoSlide(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { slide(1); resetAutoSlide(); });

        const sliderContainer = document.querySelector('.testimonials-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') { slide(-1); resetAutoSlide(); }
                if (e.key === 'ArrowRight') { slide(1); resetAutoSlide(); }
            });
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % totalSlides;
                goToSlide(nextIndex);
            }, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            sliderContainer.addEventListener('mouseleave', startAutoSlide);
        }

        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newCardsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
                if (newCardsPerView !== cardsPerView) {
                    const newTotal = Math.ceil(cards.length / newCardsPerView);
                    currentIndex = Math.min(currentIndex, newTotal - 1);
                    if (dotsContainer) {
                        dotsContainer.innerHTML = '';
                        for (let i = 0; i < newTotal; i++) {
                            const dot = document.createElement('button');
                            dot.className = 'slider-dot' + (i === currentIndex ? ' active' : '');
                            dot.setAttribute('data-index', i);
                            dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
                            dot.addEventListener('click', function() {
                                goToSlide(parseInt(this.getAttribute('data-index')));
                            });
                            dotsContainer.appendChild(dot);
                        }
                    }
                    updateSlider();
                }
            }, 250);
        });

        updateSlider();
        startAutoSlide();
    }

    // ============================================================
    // 12. FAQ ACCORDION
    // ============================================================
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(i => {
                        i.classList.remove('active');
                        const btn = i.querySelector('.faq-question');
                        if (btn) btn.setAttribute('aria-expanded', 'false');
                    });
                    if (!isActive) {
                        item.classList.add('active');
                        this.setAttribute('aria-expanded', 'true');
                    }
                });
                question.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            }
        });
    }

    // ============================================================
    // 13. CONTACT FORM
    // ============================================================
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const inputs = this.querySelectorAll('[required]');
            inputs.forEach(input => {
                const group = input.closest('.form-group');
                const error = group ? group.querySelector('.error-message') : null;
                if (!input.value.trim()) {
                    isValid = false;
                    if (group) group.classList.add('error');
                    if (error) error.textContent = 'यह फ़ील्ड आवश्यक है';
                } else {
                    if (group) group.classList.remove('error');
                    if (error) error.textContent = '';
                }
                if (input.type === 'tel' && input.value.trim()) {
                    const phone = input.value.replace(/\D/g, '');
                    if (phone.length !== 10) {
                        isValid = false;
                        if (group) group.classList.add('error');
                        if (error) error.textContent = 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें';
                    }
                }
            });

            if (!isValid) {
                const firstError = this.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const input = firstError.querySelector('input, select');
                    if (input) input.focus();
                }
                return;
            }

            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            const name = document.getElementById('contactName')?.value || '';
            const phone = document.getElementById('contactPhone')?.value || '';
            const email = document.getElementById('contactEmail')?.value || '';
            const service = document.getElementById('contactService')?.value || '';
            const message = document.getElementById('contactMessage')?.value || '';

            const whatsappMsg = `Hello SK Construction!%0A%0A*📋 New Enquiry*%0A%0A👤 Name: ${name}%0A📱 Phone: ${phone}%0A📧 Email: ${email}%0A🏗️ Service: ${service}%0A💬 Message: ${message}`;
            const whatsappUrl = `https://wa.me/919523234108?text=${whatsappMsg}`;
            
            window.open(whatsappUrl, '_blank');

            if (formSuccess) {
                formSuccess.hidden = false;
                setTimeout(() => { formSuccess.hidden = true; }, 5000);
            }

            setTimeout(() => {
                form.reset();
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
            }, 1000);
        });

        const formInputs = form.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                const group = this.closest('.form-group');
                const error = group ? group.querySelector('.error-message') : null;
                if (this.hasAttribute('required') && !this.value.trim()) {
                    if (group) group.classList.add('error');
                    if (error) error.textContent = 'यह फ़ील्ड आवश्यक है';
                } else {
                    if (group) group.classList.remove('error');
                    if (error) error.textContent = '';
                }
                if (this.type === 'tel' && this.value.trim()) {
                    const phone = this.value.replace(/\D/g, '');
                    if (phone.length !== 10) {
                        if (group) group.classList.add('error');
                        if (error) error.textContent = 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें';
                    }
                }
            });
            input.addEventListener('input', function() {
                const group = this.closest('.form-group');
                if (group && group.classList.contains('error')) {
                    group.classList.remove('error');
                    const error = group.querySelector('.error-message');
                    if (error) error.textContent = '';
                }
            });
        });
    }

    // ============================================================
    // 14. THEME TOGGLE
    // ============================================================
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('sk-theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('sk-theme', 'light');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('sk-theme', 'dark');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // ============================================================
    // 15. LANGUAGE SWITCHER
    // ============================================================
    const langBtn = document.getElementById('langSwitcher');
    const langLabel = document.getElementById('langLabel');
    if (langBtn && langLabel) {
        const browserLang = navigator.language || navigator.languages?.[0] || 'en';
        let currentLang = browserLang.startsWith('hi') ? 'hi' : 'en';
        langLabel.textContent = currentLang === 'hi' ? 'हिंदी' : 'English';
        langBtn.addEventListener('click', function() {
            currentLang = currentLang === 'hi' ? 'en' : 'hi';
            langLabel.textContent = currentLang === 'hi' ? 'हिंदी' : 'English';
            localStorage.setItem('sk-lang', currentLang);
        });
        const savedLang = localStorage.getItem('sk-lang');
        if (savedLang) {
            currentLang = savedLang;
            langLabel.textContent = currentLang === 'hi' ? 'हिंदी' : 'English';
        }
    }

    // ============================================================
    // 16. SECTION REVEAL
    // ============================================================
    const revealElements = document.querySelectorAll('.section-reveal');
    if (revealElements.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
            revealObserver.observe(el);
        });
    }

    // ============================================================
    // 17. BUTTON RIPPLE EFFECT
    // ============================================================
    document.querySelectorAll('.btn-ripple').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            this.style.setProperty('--ripple-x', x + '%');
            this.style.setProperty('--ripple-y', y + '%');
        });
    });

    // ============================================================
    // 18. IMAGE LAZY LOADING
    // ============================================================
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.src;
        });
    } else {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        if (lazyImages.length) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        lazyObserver.unobserve(img);
                    }
                });
            });
            lazyImages.forEach(img => lazyObserver.observe(img));
        }
    }

    // ============================================================
    // 19. KEYBOARD NAVIGATION
    // ============================================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    // ============================================================
    // 20. RATING SYSTEM
    // ============================================================
    (function() {
        const STORAGE_KEY = 'sk_construction_ratings';
        let ratings = [];

        // Load ratings from localStorage
        function loadRatings() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    ratings = JSON.parse(stored);
                }
            } catch (e) {
                ratings = [];
            }
            if (!Array.isArray(ratings)) ratings = [];
        }

        // Save ratings to localStorage
        function saveRatings() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
            } catch (e) {
                console.error('Failed to save ratings:', e);
            }
        }

        // Add a new rating
        function addRating(name, stars, comment) {
            const rating = {
                id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
                name: name.trim(),
                stars: parseInt(stars),
                comment: comment.trim(),
                date: new Date().toISOString(),
                verified: true
            };
            ratings.unshift(rating);
            saveRatings();
            renderRatings();
            updateStats();
            return rating;
        }

        // Delete a rating
        function deleteRating(id) {
            ratings = ratings.filter(r => r.id !== id);
            saveRatings();
            renderRatings();
            updateStats();
        }

        // Calculate statistics
        function getStats() {
            if (ratings.length === 0) {
                return {
                    total: 0,
                    average: 0,
                    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
                };
            }
            const total = ratings.length;
            const sum = ratings.reduce((acc, r) => acc + r.stars, 0);
            const average = sum / total;
            const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            ratings.forEach(r => {
                if (distribution[r.stars] !== undefined) {
                    distribution[r.stars]++;
                }
            });
            return { total, average, distribution };
        }

        // Render stars as HTML
        function renderStars(stars, max = 5) {
            let html = '';
            const full = Math.floor(stars);
            const half = stars - full >= 0.5 ? 1 : 0;
            for (let i = 0; i < full; i++) {
                html += '<i class="fas fa-star"></i>';
            }
            if (half) {
                html += '<i class="fas fa-star-half-alt"></i>';
            }
            const remaining = max - full - half;
            for (let i = 0; i < remaining; i++) {
                html += '<i class="far fa-star"></i>';
            }
            return html;
        }

        // Render rating breakdown bars
        function renderBreakdown() {
            const container = document.getElementById('ratingBreakdown');
            if (!container) return;
            const stats = getStats();
            const maxCount = Math.max(...Object.values(stats.distribution), 1);
            
            let html = '';
            for (let i = 5; i >= 1; i--) {
                const count = stats.distribution[i] || 0;
                const percentage = (count / maxCount) * 100;
                html += `
                    <div class="rating-bar-row">
                        <span class="star-label">${i} ★</span>
                        <div class="bar-track">
                            <div class="bar-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span class="bar-count">${count}</span>
                    </div>
                `;
            }
            container.innerHTML = html;
        }

        // Update statistics display
        function updateStats() {
            const stats = getStats();
            const avgEl = document.getElementById('avgRating');
            const starsEl = document.getElementById('avgStars');
            const totalEl = document.getElementById('totalReviews');

            if (avgEl) {
                avgEl.textContent = stats.total > 0 ? stats.average.toFixed(1) : '0.0';
            }
            if (starsEl) {
                starsEl.innerHTML = stats.total > 0 ? renderStars(stats.average) : 
                    '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
            }
            if (totalEl) {
                totalEl.textContent = `${stats.total} Review${stats.total !== 1 ? 's' : ''}`;
            }
            renderBreakdown();
        }

        // Render reviews list
        function renderRatings() {
            const container = document.getElementById('reviewsContainer');
            if (!container) return;

            if (ratings.length === 0) {
                container.innerHTML = `
                    <div class="no-reviews">
                        <i class="fas fa-star"></i>
                        <p>अभी कोई रेटिंग नहीं है। पहली रेटिंग देने वाले बनें!</p>
                    </div>
                `;
                return;
            }

            let html = '';
            ratings.forEach(r => {
                const date = new Date(r.date);
                const dateStr = date.toLocaleDateString('hi-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                });
                html += `
                    <div class="review-item" data-id="${r.id}">
                        <div class="review-header">
                            <span class="reviewer-name">${r.name}</span>
                            <span class="review-stars">${renderStars(r.stars)}</span>
                            <span class="review-date">${dateStr}</span>
                        </div>
                        ${r.comment ? `<p class="review-comment">${r.comment}</p>` : ''}
                        <div class="review-actions">
                            <button onclick="window.deleteRating('${r.id}')" aria-label="Delete review">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        }

        // ===== RATING FORM HANDLING =====
        const ratingForm = document.getElementById('ratingForm');
        const ratingName = document.getElementById('ratingName');
        const ratingComment = document.getElementById('ratingComment');
        const starInputs = document.querySelectorAll('input[name="stars"]');
        const starText = document.getElementById('starText');
        const starError = document.getElementById('starError');
        const ratingSuccess = document.getElementById('ratingSuccess');

        // Star rating hover text
        const starLabels = {
            '5': '5 Stars - Excellent! 🌟',
            '4': '4 Stars - Very Good! 👍',
            '3': '3 Stars - Good 👌',
            '2': '2 Stars - Fair 😐',
            '1': '1 Star - Poor 😞'
        };

        starInputs.forEach(input => {
            input.addEventListener('change', function() {
                if (starText) {
                    starText.textContent = starLabels[this.value] || 'Select a rating';
                    starText.style.color = '#FBBF24';
                }
                if (starError) starError.textContent = '';
            });
        });

        // Form submission
        if (ratingForm) {
            ratingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate name
                let isValid = true;
                const nameGroup = ratingName.closest('.form-group');
                const nameError = nameGroup ? nameGroup.querySelector('.error-message') : null;
                
                if (!ratingName.value.trim()) {
                    isValid = false;
                    if (nameGroup) nameGroup.classList.add('error');
                    if (nameError) nameError.textContent = 'कृपया अपना नाम दर्ज करें';
                } else {
                    if (nameGroup) nameGroup.classList.remove('error');
                    if (nameError) nameError.textContent = '';
                }

                // Validate stars
                const selectedStar = document.querySelector('input[name="stars"]:checked');
                if (!selectedStar) {
                    isValid = false;
                    if (starError) starError.textContent = 'कृपया रेटिंग चुनें';
                } else {
                    if (starError) starError.textContent = '';
                }

                if (!isValid) return;

                // Add rating
                const stars = parseInt(selectedStar.value);
                addRating(ratingName.value, stars, ratingComment.value);

                // Show success message
                if (ratingSuccess) {
                    ratingSuccess.hidden = false;
                    setTimeout(() => {
                        ratingSuccess.hidden = true;
                    }, 4000);
                }

                // Reset form
                ratingForm.reset();
                if (starText) {
                    starText.textContent = 'Select a rating';
                    starText.style.color = '';
                }
                if (nameGroup) nameGroup.classList.remove('error');
                if (nameError) nameError.textContent = '';
            });
        }

        // Make deleteRating globally accessible
        window.deleteRating = deleteRating;

        // Initialize rating system
        loadRatings();
        updateStats();
        renderRatings();
    })();

    // ============================================================
    // 21. CONSOLE LOG
    // ============================================================
    console.log('🏗️ SK Construction - Premium Website');
    console.log('📞 Contact: +91-9955604576');
    console.log('🌐 https://skconstruction.in');
    console.log('✨ Built with ❤️ for Samastipur');

    // ============================================================
    // 22. PERFORMANCE - Reduce layout shifts
    // ============================================================
    document.querySelectorAll('img[width][height]').forEach(img => {
        const w = img.getAttribute('width');
        const h = img.getAttribute('height');
        if (w && h) {
            img.style.aspectRatio = w + '/' + h;
        }
    });

    console.log('✅ SK Construction Website Loaded Successfully');
});
