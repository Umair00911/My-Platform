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
    
    // Prediction Assistant
    const assistantToggle = document.querySelector('.prediction-assistant .assistant-toggle');
    const assistantWindow = document.querySelector('.prediction-assistant .assistant-window');
    
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
                    
                    if (questionText.includes('Web app')) {
                        responseText = 'For a typical web application with basic CRUD functionality, our estimates range from $15,000-$25,000 and 8-12 weeks. Would you like a more detailed estimate?';
                    } else if (questionText.includes('Mobile app')) {
                        responseText = 'Mobile app costs vary widely. A simple app might cost $20,000-$30,000, while complex apps can exceed $100,000. Timeline is typically 12-20 weeks.';
                    } else if (questionText.includes('AI project')) {
                        responseText = 'AI projects require more specialized talent. Basic implementations start at $30,000 with 12-16 week timelines. Complex models can take 6+ months.';
                    } else {
                        responseText = 'I can help estimate your project. Could you share more details about what you need?';
                    }
                    
                    const aiMessage = document.createElement('div');
                    aiMessage.className = 'message ai';
                    aiMessage.innerHTML = `
                        <div class="avatar">
                            <i class="fas fa-calculator"></i>
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
                        "Based on your description, I'd estimate 10-14 weeks and $18,000-$25,000. Would you like me to generate a detailed breakdown?",
                        "For projects like this, we typically see costs between $15,000-$30,000. The timeline depends on several factors I can help clarify.",
                        "I can provide a more accurate estimate if you share details about required features and team composition.",
                        "Our database shows similar projects completed in 12-16 weeks with costs averaging $22,000."
                    ];
                    
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    
                    const aiMessage = document.createElement('div');
                    aiMessage.className = 'message ai';
                    aiMessage.innerHTML = `
                        <div class="avatar">
                            <i class="fas fa-calculator"></i>
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
    
    // Feature management in form
    const featuresList = document.querySelector('.features-list');
    const addFeatureBtn = document.querySelector('.add-feature');
    
    if (featuresList && addFeatureBtn) {
        function createFeatureItem() {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            featureItem.innerHTML = `
                <input type="text" placeholder="Feature name">
                <select>
                    <option>Simple</option>
                    <option>Medium</option>
                    <option>Complex</option>
                </select>
                <button class="btn btn-outline remove-feature"><i class="fas fa-times"></i></button>
            `;
            
            // Add remove functionality
            const removeBtn = featureItem.querySelector('.remove-feature');
            removeBtn.addEventListener('click', function() {
                featureItem.remove();
            });
            
            return featureItem;
        }
        
        // Add initial feature
        featuresList.appendChild(createFeatureItem());
        
        // Add feature button
        addFeatureBtn.addEventListener('click', function() {
            featuresList.appendChild(createFeatureItem());
        });
    }
    
    // Calculate estimate button
    const calculateBtn = document.querySelector('.calculate-btn');
    const resultsPlaceholder = document.querySelector('.results-placeholder');
    const resultsActive = document.querySelector('.results-active');
    
    if (calculateBtn && resultsPlaceholder && resultsActive) {
        calculateBtn.addEventListener('click', function() {
            // Show loading state
            calculateBtn.disabled = true;
            calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
            
            // Simulate API call
            setTimeout(() => {
                // Hide placeholder, show results
                resultsPlaceholder.style.display = 'none';
                resultsActive.style.display = 'block';
                
                // Reset button
                calculateBtn.disabled = false;
                calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate Estimate';
                
                // Scroll to results
                resultsActive.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1500);
        });
    }
    
    // Start prediction button
    const startPredictionBtn = document.querySelector('.start-prediction-btn');
    if (startPredictionBtn) {
        startPredictionBtn.addEventListener('click', function() {
            const predictionInterface = document.querySelector('.prediction-interface');
            predictionInterface.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Demo chat functionality
    const demoChatInput = document.querySelector('.demo-input input');
    const demoChatBtn = document.querySelector('.demo-input .btn');
    
    if (demoChatInput && demoChatBtn) {
        function sendDemoMessage() {
            const message = demoChatInput.value.trim();
            if (message) {
                const chatMessages = document.querySelector('.demo-messages');
                
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
                        "That's a great question. Let me check our database for similar projects...",
                        "Based on your requirements, I'd recommend...",
                        "Our technical team suggests...",
                        "For that feature, we typically estimate..."
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