document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Feature tabs functionality
    const featureTabs = document.querySelectorAll('.feature-tab');
    const visualContents = document.querySelectorAll('.visual-content');
    
    featureTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            featureTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all visual contents
            visualContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show the corresponding visual content
            document.getElementById(`${tabId}-visual`).classList.add('active');
        });
    });
    
    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        carouselBtns.forEach(btn => btn.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        carouselBtns[index].classList.add('active');
        currentTestimonial = index;
    }
    
    carouselBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showTestimonial(slideIndex);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Platform assistant toggle
    const assistantToggle = document.querySelector('.assistant-toggle');
    const assistantWindow = document.querySelector('.assistant-window');
    
    if (assistantToggle && assistantWindow) {
        assistantToggle.addEventListener('click', function() {
            assistantWindow.classList.toggle('open');
        });
        
        document.querySelector('.assistant-close').addEventListener('click', function() {
            assistantWindow.classList.remove('open');
        });
    }
    
    // Quick question buttons
    const quickQuestions = document.querySelectorAll('.quick-question');
    const assistantInput = document.querySelector('.assistant-input input');
    
    quickQuestions.forEach(question => {
        question.addEventListener('click', function() {
            assistantInput.value = this.textContent;
            assistantInput.focus();
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.prop-card, .feature-card, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.prop-card, .feature-card, .step');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});