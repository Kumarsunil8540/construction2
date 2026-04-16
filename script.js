// ===== DOM Elements =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to Top Button
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Back to Top Functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.stat-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 20);
    }
    
    // Intersection Observer for Counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ===== Language Selection with Animation =====
    const hindiBtn = document.getElementById('hindi_lan');
    const englishBtn = document.getElementById('english_lan');
    
    function handleLanguageSelection(lang, element) {
        // Add click animation
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 200);
        
        // Store in localStorage
        localStorage.setItem('selectedLanguage', lang);
        
        // Show loading toast
        showToast(`Loading ${lang === 'hindi' ? 'हिंदी' : 'English'} version...`, 'info');
        
        // Redirect after short delay
        setTimeout(() => {
            if (lang === 'hindi') {
                window.location.href = 'hindi_about.html';
            } else {
                window.location.href = 'english_about.html';
            }
        }, 500);
    }
    
    if (hindiBtn) {
        hindiBtn.addEventListener('click', () => handleLanguageSelection('hindi', hindiBtn));
    }
    
    if (englishBtn) {
        englishBtn.addEventListener('click', () => handleLanguageSelection('english', englishBtn));
    }
    
    // ===== Toast Notification System =====
    function showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#333'};
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 14px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // Add animation styles for toast
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== Parallax Effect on Hero Section =====
    const heroSection = document.getElementById('photo');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }
    
    // ===== Floating Buttons Hover Animation =====
    const floatButtons = document.querySelectorAll('.whatsapp-float, .call-float');
    floatButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
    
    // ===== Project Cards Hover Effect =====
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const img = card.querySelector('.project-img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        card.addEventListener('mouseleave', () => {
            const img = card.querySelector('.project-img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // ===== Feature Boxes Ripple Effect =====
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach(box => {
        box.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = e.clientX - box.offsetLeft + 'px';
            ripple.style.top = e.clientY - box.offsetTop + 'px';
            box.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple effect styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple-effect {
            position: absolute;
            width: 100px;
            height: 100px;
            background: rgba(255,178,44,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleExpand 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        }
        
        @keyframes rippleExpand {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .feature-box {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // ===== Service Cards Hover Effect =====
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h3')?.textContent || 'Service';
            showToast(`Explore our ${serviceName} services`, 'info');
        });
    });
    
    // ===== Typing Effect for Hero Text (Optional) =====
    const heroText = document.querySelector('#ques_div_lang h2');
    if (heroText && !heroText.hasAttribute('data-typed')) {
        const originalText = heroText.innerHTML;
        heroText.setAttribute('data-typed', 'true');
        // You can add typing effect if needed
    }
    
    // ===== Preloader (Optional) =====
    window.addEventListener('load', () => {
        // Hide preloader if exists
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
        
        // Show welcome toast
        setTimeout(() => {
            showToast('Welcome to SK Construction Company! 🏗️', 'success');
        }, 1000);
    });
    
    // ===== Form Validation (if any forms exist) =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Form submitted successfully! We will contact you soon.', 'success');
            form.reset();
        });
    });
    
    // ===== Mobile Menu Toggle (if needed) =====
    // Add mobile menu functionality if you have a hamburger menu
    
    // ===== Video Background Control (if any) =====
    // Pause video when not in viewport
    
    // ===== Newsletter Subscription =====
    const subscribeBtn = document.querySelector('.subscribe-btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            showToast('Thank you for subscribing!', 'success');
        });
    }
    
    // ===== Footer Year Update =====
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== Lazy Loading Images =====
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===== Console Welcome Message =====
    console.log('%c🏗️ Welcome to SK Construction Company! 🏗️', 'color: #FFB22C; font-size: 16px; font-weight: bold;');
    console.log('%cWe are Samastipur\'s most trusted construction company with 45+ years of experience.', 'color: #666; font-size: 12px;');
    
    // ===== PWA Installation Prompt (if applicable) =====
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button if you want
        const installBtn = document.getElementById('installApp');
        if (installBtn) {
            installBtn.style.display = 'flex';
            installBtn.addEventListener('click', () => {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        showToast('Thanks for installing our app!', 'success');
                    }
                    deferredPrompt = null;
                });
            });
        }
    });
});
