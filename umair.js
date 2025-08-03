document.addEventListener('DOMContentLoaded', function() {
    // Search options functionality
    const searchOptions = document.querySelectorAll('.search-option');
    searchOptions.forEach(option => {
        option.addEventListener('click', function() {
            searchOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            document.querySelector('.search-input').placeholder = `Search ${this.textContent}...`;
        });
    });

    // How it works navigation
    const stepNavButtons = document.querySelectorAll('.step-nav-btn');
    const stepBoxes = document.querySelectorAll('.step-box');
    
    stepNavButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            stepNavButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real implementation, you would animate or show the corresponding step
            stepBoxes.forEach(box => box.style.opacity = '0.5');
            stepBoxes[index].style.opacity = '1';
        });
    });

    // Animated boxes hover effect
    const animatedBoxes = document.querySelectorAll('.animated-box');
    animatedBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Mobile menu toggle (would be implemented in a real scenario)
    // This is a placeholder for mobile responsiveness
    function checkMobileMenu() {
        if (window.innerWidth < 768) {
            // Implement mobile menu toggle
        }
    }
    
    window.addEventListener('resize', checkMobileMenu);
    checkMobileMenu();

    // Video play button functionality
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            // In a real implementation, this would play a video
            alert('Video playback would start here in a real implementation');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-box, .step-box, .service-card, .explore-box');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    const animatedElements = document.querySelectorAll('.category-box, .step-box, .service-card, .explore-box');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});