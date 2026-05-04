// ==================== DOM CONTENT LOADED ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MOBILE MENU TOGGLE ====================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // ==================== ACTIVE NAVIGATION LINK ====================
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
    
    // ==================== SMOOTH SCROLLING ====================
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
    
    // ==================== BACK TO TOP BUTTON ====================
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==================== CONTACT FORM SUBMISSION ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[placeholder*="नाम"]').value;
            const phone = this.querySelector('input[placeholder*="मोबाइल"]').value;
            const service = this.querySelector('select').value;
            const message = this.querySelector('textarea').value;
            
            const whatsappMsg = `Hello SK Construction!%0A%0A*New Enquiry*%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0AMessage: ${message}`;
            
            window.open(`https://wa.me/919523234108?text=${whatsappMsg}`, '_blank');
            
            alert('धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।');
            this.reset();
        });
    }
    
    // ==================== SCROLL REVEAL ANIMATION ====================
    const revealElements = document.querySelectorAll('.service-card, .feature-box, .gallery-item, .info-card, .testimonial-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        revealObserver.observe(el);
    });
    
    // ==================== FLOATING BUTTONS TRACKING ====================
    const whatsappBtn = document.getElementById('whatsappFloat');
    const callBtn = document.getElementById('callFloat');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            console.log('WhatsApp button clicked - Lead generated');
        });
    }
    
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            console.log('Call button clicked - Lead generated');
        });
    }
    
    console.log('SK Construction Website Loaded Successfully');
});
