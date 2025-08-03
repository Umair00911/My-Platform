document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
    
    // Smart Matching Assistant
    const assistantToggle = document.querySelector('.smart-assistant .assistant-toggle');
    const assistantWindow = document.querySelector('.smart-assistant .assistant-window');
    
    if (assistantToggle && assistantWindow) {
        assistantToggle.addEventListener('click', function() {
            assistantWindow.classList.toggle('active');
        });
        
        document.querySelector('.assistant-close').addEventListener('click', function() {
            assistantWindow.classList.remove('active');
        });
        
        // Quick question buttons
        const quickQuestions = document.querySelectorAll('.quick-question');
        quickQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const questionText = this.textContent.trim();
                const messagesContainer = document.querySelector('.assistant-messages');
                
                // Add user question
                const userMessage = document.createElement('div');
                userMessage.className = 'message user';
                userMessage.innerHTML = `
                    <div class="avatar" style="background-image: url('https://via.placeholder.com/40x40/F3F4F6/07BE88?text=ME')"></div>
                    <div class="message-content">
                        <p>${questionText}</p>
                        <small>Just now</small>
                    </div>
                `;
                messagesContainer.appendChild(userMessage);
                
                // Scroll to bottom
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
                // Simulate AI response after 1-2 seconds
                setTimeout(() => {
                    let responseText = '';
                    
                    if (questionText.includes('AI developers')) {
                        responseText = 'I can help you find AI developers. We have specialists in machine learning, computer vision, and NLP. Would you like me to show you top candidates?';
                    } else if (questionText.includes('full-stack')) {
                        responseText = 'For full-stack projects, I recommend looking at developers with experience in both frontend and backend technologies. Would you like me to filter by specific frameworks?';
                    } else if (questionText.includes('matching practices')) {
                        responseText = 'For best results, be specific about your project requirements, timeline, and budget. The more details you provide, the better matches I can find. Would you like me to guide you through the process?';
                    } else {
                        responseText = 'I can help you find the perfect tech talent for your project. Could you share more details about what you need?';
                    }
                    
                    const aiMessage = document.createElement('div');
                    aiMessage.className = 'message ai';
                    aiMessage.innerHTML = `
                        <div class="avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <p>${responseText}</p>
                            <small>Just now</small>
                        </div>
                    `;
                    messagesContainer.appendChild(aiMessage);
                    
                    // Scroll to bottom
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 1000 + Math.random() * 1000);
            });
        });
        
        // Assistant input
        const assistantInput = document.querySelector('.assistant-input input');
        const sendBtn = document.querySelector('.assistant-input .send-btn');
        
        function sendMessage() {
            const message = assistantInput.value.trim();
            if (message) {
                const messagesContainer = document.querySelector('.assistant-messages');
                
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message user';
                userMessage.innerHTML = `
                    <div class="avatar" style="background-image: url('https://via.placeholder.com/40x40/F3F4F6/07BE88?text=ME')"></div>
                    <div class="message-content">
                        <p>${message}</p>
                        <small>Just now</small>
                    </div>
                `;
                messagesContainer.appendChild(userMessage);
                
                // Clear input
                assistantInput.value = '';
                
                // Scroll to bottom
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
                // Simulate AI response after 1-2 seconds
                setTimeout(() => {
                    const responses = [
                        "I've analyzed your request and found 3 excellent matches. Would you like me to show you their profiles?",
                        "Based on your needs, I recommend focusing on candidates with experience in similar projects. Would you like to see some examples?",
                        "I can help you compare top candidates for this position. What specific skills are most important for your project?",
                        "Our matching system has identified several strong candidates. Would you like to schedule interviews with any of them?"
                    ];
                    
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    
                    const aiMessage = document.createElement('div');
                    aiMessage.className = 'message ai';
                    aiMessage.innerHTML = `
                        <div class="avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <p>${randomResponse}</p>
                            <small>Just now</small>
                        </div>
                    `;
                    messagesContainer.appendChild(aiMessage);
                    
                    // Scroll to bottom
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 1000 + Math.random() * 1000);
            }
        }
        
        sendBtn.addEventListener('click', sendMessage);
        
        assistantInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Skill tag functionality
    const skillsInput = document.querySelector('.skills-input input');
    const selectedSkills = document.querySelector('.selected-skills');
    
    if (skillsInput && selectedSkills) {
        skillsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.innerHTML = `${this.value.trim()} <i class="fas fa-times"></i>`;
                
                // Add remove functionality
                skillTag.querySelector('i').addEventListener('click', function() {
                    skillTag.remove();
                });
                
                selectedSkills.appendChild(skillTag);
                this.value = '';
            }
        });
    }
    
    // Favorite button functionality
    const favoriteBtns = document.querySelectorAll('.match-actions .btn-outline');
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-danger');
        });
    });
    
    // Find matches button
    const findMatchesBtn = document.querySelector('.find-matches-btn');
    if (findMatchesBtn) {
        findMatchesBtn.addEventListener('click', function() {
            // In a real app, this would trigger the matching algorithm
            const matchesSection = document.querySelector('.matches-results');
            matchesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Start matching button animation
    const startMatchingBtn = document.querySelector('.start-matching-btn');
    if (startMatchingBtn) {
        startMatchingBtn.addEventListener('click', function() {
            // In a real app, this would start the matching process
            const matchingInterface = document.querySelector('.matching-interface');
            matchingInterface.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Demo chat functionality
    const demoChatInput = document.querySelector('.chat-input input');
    const demoChatBtn = document.querySelector('.chat-input .btn');
    
    if (demoChatInput && demoChatBtn) {
        function sendDemoMessage() {
            const message = demoChatInput.value.trim();
            if (message) {
                const chatMessages = document.querySelector('.chat-messages');
                
                // Add sent message
                const sentMessage = document.createElement('div');
                sentMessage.className = 'message sent';
                sentMessage.innerHTML = `
                    <div class="message-content">
                        <p>${message}</p>
                        <small>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                    </div>
                `;
                chatMessages.appendChild(sentMessage);
                
                // Clear input
                demoChatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate response after 1-2 seconds
                setTimeout(() => {
                    const responses = [
                        "I'd be happy to help with that. Can you share more details about your project timeline?",
                        "That's a great question. I've worked on similar projects before. Would you like to see some examples?",
                        "I can definitely assist with that. What specific challenges are you facing?",
                        "Yes, I have experience in that area. Would you like to schedule a call to discuss further?"
                    ];
                    
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    
                    const receivedMessage = document.createElement('div');
                    receivedMessage.className = 'message received';
                    receivedMessage.innerHTML = `
                        <div class="message-content">
                            <p>${randomResponse}</p>
                            <small>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                        </div>
                    `;
                    chatMessages.appendChild(receivedMessage);
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000 + Math.random() * 1000);
            }
        }
        
        demoChatBtn.addEventListener('click', sendDemoMessage);
        
        demoChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendDemoMessage();
            }
        });
    }
});