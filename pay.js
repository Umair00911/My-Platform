document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (mobileMenuBtn && navbarMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navbarMenu.classList.toggle('show');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navbarMenu.classList.contains('show')) {
                    navbarMenu.classList.remove('show');
                }
            }
        });
    });
    
    // Animation for protection cards
    const protectionCards = document.querySelectorAll('.protection-card');
    protectionCards.forEach((card, index) => {
        // Add delay based on index for staggered animation
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Animation for steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        // Add delay based on index for staggered animation
        step.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Payment method card interactions
    const methodCards = document.querySelectorAll('.method-card');
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.method-icon');
            icon.style.transform = 'scale(1.2)';
            icon.style.color = (--primary-dark);
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.method-icon');
            icon.style.transform = 'scale(1)';
            icon.style.color = '';
        });
    });
    
    // Testimonial card interactions
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.author-avatar');
            avatar.style.transform = 'scale(1.1)';
            avatar.style.boxShadow = '0 4px 15px rgba(7, 190, 136, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.author-avatar');
            avatar.style.transform = 'scale(1)';
            avatar.style.boxShadow = '';
        });
    });
    
    // CTA button hover effects
    const ctaButtons = document.querySelectorAll('.cta .btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('primary-btn')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
            } else {
                this.style.backgroundColor = 'rgba(255,255,255,0.1)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.backgroundColor = '';
        });
    });
    
    // Initialize animations when elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all sections and interactive elements
    document.querySelectorAll('section, .protection-card, .step, .method-card, .testimonial-card').forEach(element => {
        observer.observe(element);
    });
    
    // Form submission handling (example)
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would handle form submission here
            alert('Form submitted successfully! A Devver representative will contact you shortly.');
            this.reset();
        });
    });
});