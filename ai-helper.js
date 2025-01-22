document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const clearButton = document.getElementById('clearButton');

    // Load chat history from localStorage
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    // Function to save chat history to localStorage
    function saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    // Function to add a message to the chat
    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Load chat history into the chat container only once
    function loadChatHistory() {
        chatMessages.innerHTML = '';
        chatHistory.forEach(msg => addMessageToChat(msg.sender, msg.message));
    }

    // Function to handle chat submission
    async function handleChatSubmit(e) {
        e.preventDefault();
        const question = userInput.value.trim();
        if (!question) return;

        // Add user message to chat
        addMessageToChat('user', question);

        // Add to history and save
        chatHistory.push({ sender: 'user', message: question });
        saveChatHistory();

        // Clear input
        userInput.value = '';

        // Simulate AI response (replace this with an actual API call in a real application)
        const aiResponse = await simulateAIResponse(question);
        addMessageToChat('ai', aiResponse);

        // Add AI response to history and save
        chatHistory.push({ sender: 'ai', message: aiResponse });
        saveChatHistory();
    }

    // Function to clear chat
    function handleClearChat() {
        chatMessages.innerHTML = '';
        chatHistory = [];
        saveChatHistory();
    }

    async function simulateAIResponse(question) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simple responses (replace with actual AI integration in a real application)
        const responses = {
            "hello": "Hello! How can I help you today?",
            "how are you": "I'm functioning well, thank you for asking. How may I assist you?",
            "what is synaptix": "Synaptix is an online education platform dedicated to making quality education accessible to everyone, regardless of their economic background.",
            "default": "I'm sorry, I don't have a specific answer for that question. Is there anything else I can help you with regarding Synaptix or our educational programs?"
        };

        const lowercaseQuestion = question.toLowerCase();
        return responses[lowercaseQuestion] || responses["default"];
    }

    // Ensure event listeners are not duplicated
    if (!chatForm.dataset.initialized) {
        chatForm.addEventListener('submit', handleChatSubmit);
        clearButton.addEventListener('click', handleClearChat);
        chatForm.dataset.initialized = 'true';
    }

    // Load chat history on page load
    loadChatHistory();
});  // End of DOMContentLoaded event listener