document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarActions = document.querySelector('.navbar-actions');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = navbarMenu.style.display === 'flex';
        
        if (isOpen) {
            navbarMenu.style.display = 'none';
            navbarActions.style.display = 'none';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
            navbarMenu.style.display = 'flex';
            navbarActions.style.display = 'flex';
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            
            // Adjust for mobile
            if (window.innerWidth <= 768) {
                navbarMenu.style.flexDirection = 'column';
                navbarMenu.style.position = 'absolute';
                navbarMenu.style.top = '100%';
                navbarMenu.style.left = '0';
                navbarMenu.style.right = '0';
                navbarMenu.style.backgroundColor = 'var(--white)';
                navbarMenu.style.padding = '1rem';
                navbarMenu.style.gap = '1rem';
                navbarMenu.style.boxShadow = 'var(--shadow-md)';
                
                navbarActions.style.flexDirection = 'column';
                navbarActions.style.position = 'absolute';
                navbarActions.style.top = 'calc(100% + 180px)';
                navbarActions.style.left = '0';
                navbarActions.style.right = '0';
                navbarActions.style.backgroundColor = 'var(--white)';
                navbarActions.style.padding = '1rem';
                navbarActions.style.gap = '1rem';
                navbarActions.style.boxShadow = 'var(--shadow-md)';
            }
        }
    });
    
    // Chat Widget Toggle
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWidget = document.querySelector('.chat-widget');
    
    chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('open');
    });
    
    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.control.prev');
    const nextBtn = document.querySelector('.control.next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    prevBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
    
    // Pause auto-rotation on hover
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 5000);
    });
    
    // Chat functionality
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    const chatBody = document.querySelector('.chat-body');
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message user';
            userMessage.innerHTML = `
                <div class="avatar">
                    <img src="https://via.placeholder.com/40x40/F3F4F6/07BE88?text=Y" alt="You">
                </div>
                <div class="message-content">
                    <p>${message}</p>
                    <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            `;
            chatBody.appendChild(userMessage);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Simulate response after delay
            setTimeout(() => {
                const responses = [
                    "I can help with that. Our payment protection covers all milestones in your project.",
                    "For payment disputes, we have a mediation process that typically takes 3-5 business days.",
                    "You can release funds early if you're satisfied with the work before all milestones are complete.",
                    "Our support team is available 24/7 to assist with any payment issues."
                ];
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                
                const supportMessage = document.createElement('div');
                supportMessage.className = 'message support';
                supportMessage.innerHTML = `
                    <div class="avatar">
                        <img src="https://via.placeholder.com/40x40/F3F4F6/07BE88?text=CS" alt="Support">
                    </div>
                    <div class="message-content">
                        <p>${randomResponse}</p>
                        <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                `;
                chatBody.appendChild(supportMessage);
                
                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    }
    
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
   // Close chat when clicking outside
    document.addEventListener('click', function(e) {
    if (!chatWidget.contains(e.target)) {
        chatWidget.classList.remove('open');
        }
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
});