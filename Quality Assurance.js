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
    
    // QA Assistant
    const assistantToggle = document.querySelector('.qa-assistant .assistant-toggle');
    const assistantWindow = document.querySelector('.qa-assistant .assistant-window');
    
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
                    
                    if (questionText.includes('Security scan')) {
                        responseText = 'We offer several security scan options:\n1. Basic Scan (free) - checks for common vulnerabilities\n2. Advanced Scan - deep code analysis ($99)\n3. Enterprise Scan - comprehensive audit with compliance checks ($499)\nWhich would you like to know more about?';
                    } else if (questionText.includes('Performance')) {
                        responseText = 'For performance best practices, I recommend:\n1. Minimizing database queries\n2. Implementing caching\n3. Optimizing images/assets\n4. Using CDN for static content\nWould you like specific recommendations for your tech stack?';
                    } else if (questionText.includes('Code quality')) {
                        responseText = 'Our code quality standards evaluate:\n- Maintainability\n- Test coverage\n- Complexity\n- Documentation\n- Style consistency\nWe can analyze your project against these standards. Would you like to upload your code?';
                    } else {
                        responseText = 'I can help with quality assurance questions. Could you specify what you need help with?';
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
                        "I can help with that. Would you like me to run a specific type of quality scan on your project?",
                        "For quality assurance questions, I recommend checking our knowledge base or scheduling a consultation with our QA experts.",
                        "That's an important consideration for quality. Our AI can analyze your project for similar issues. Would you like to proceed?",
                        "Let me check our resources for the best approach to address this quality concern."
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
    
    // File upload functionality
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    const browseBtn = document.querySelector('.browse-btn');
    
    if (dropZone && fileInput && filePreview && browseBtn) {
        // Handle drag and drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropZone.classList.add('highlight');
        }
        
        function unhighlight() {
            dropZone.classList.remove('highlight');
        }
        
        dropZone.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }
        
        // Handle file selection via button
        browseBtn.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });
        
        function handleFiles(files) {
            [...files].forEach(uploadFile);
        }
        
        function uploadFile(file) {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-info">
                    <i class="fas fa-file-code file-icon"></i>
                    <span>${file.name}</span>
                </div>
                <i class="fas fa-times remove-file"></i>
            `;
            
            const removeBtn = fileItem.querySelector('.remove-file');
            removeBtn.addEventListener('click', function() {
                fileItem.remove();
            });
            
            filePreview.appendChild(fileItem);
        }
    }
    
    // Start QA scan button
    const startScanBtn = document.querySelector('.start-scan-btn');
    const resultsPlaceholder = document.querySelector('.results-placeholder');
    const resultsActive = document.querySelector('.results-active');
    
    if (startScanBtn && resultsPlaceholder && resultsActive) {
        startScanBtn.addEventListener('click', function() {
            // Show loading state
            startScanBtn.disabled = true;
            startScanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
            
            // Simulate scan process
            setTimeout(() => {
                // Hide placeholder, show results
                resultsPlaceholder.style.display = 'none';
                resultsActive.style.display = 'block';
                
                // Reset button
                startScanBtn.disabled = false;
                startScanBtn.innerHTML = '<i class="fas fa-play"></i> Start QA Scan';
                
                // Scroll to results
                resultsActive.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 3000);
        });
    }
    
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length && tabPanes.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update active pane
                tabPanes.forEach(pane => pane.classList.remove('active'));
                document.getElementById(tabId).classList.add('active');
            });
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
                        "I can help you address that issue. Let me pull up the relevant code section.",
                        "That's a common challenge. Our recommended approach would be to implement automated testing for that component.",
                        "I'll review the scan results for that module and provide specific recommendations.",
                        "For that type of issue, we typically suggest refactoring to improve maintainability."
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