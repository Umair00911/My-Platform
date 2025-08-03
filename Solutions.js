document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Solution tabs filtering
    const solutionTabs = document.querySelectorAll('.solution-tab');
    const solutionCards = document.querySelectorAll('.solution-card[data-category]');
    
    solutionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            solutionTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter solution cards
            solutionCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
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
        const elements = document.querySelectorAll('.solution-card, .feature-card, .industry-card');
        
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
    const animatedElements = document.querySelectorAll('.solution-card, .feature-card, .industry-card');
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