document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const clearButton = document.getElementById('clearButton');

    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

    function saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function loadChatHistory() {
        chatMessages.innerHTML = '';
        chatHistory.forEach(msg => addMessageToChat(msg.sender, msg.message));
    }

    async function handleChatSubmit(e) {
        e.preventDefault();
        const question = userInput.value.trim();
        if (!question) return;

        addMessageToChat('user', question);
        chatHistory.push({ sender: 'user', message: question });
        saveChatHistory();
        userInput.value = '';

        // Get AI response from Wit.ai
        const aiResponse = await getAIResponse(question);
        addMessageToChat('ai', aiResponse);

        chatHistory.push({ sender: 'ai', message: aiResponse });
        saveChatHistory();
    }

    function handleClearChat() {
        chatMessages.innerHTML = '';
        chatHistory = [];
        saveChatHistory();
    }

    // Call Wit.ai API to get response
    async function getAIResponse(question) {
        const apiKey = 'HBLHN236QYNPUTA4IQ6LXTFNR36G7MV5'; // Replace with your Wit.ai access token
        const endpoint = `https://api.wit.ai/message?v=20250217&q=${encodeURIComponent(question)}`;

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const data = await response.json();

        // Check if intent is recognized and generate response accordingly
        const intent = data.intents[0]?.name; // Get the recognized intent
        const entities = data.entities; // Get any entities (optional)

        let responseText = "Sorry, I didn't understand that.";

        // Handle intents here and generate responses based on data
        if (intent === 'Course Inquiry') {
            responseText = "We offer courses in Math, Science, and religous studies. Would you like more details on any of these subjects?";
        } else if (intent === 'Course Details') {
            const course = entities?.subject?.[0]?.value; // Extract course subject if available
            if (course) {
                responseText = `The ${course} course is one of our popular offerings. Would you like to know more details about it?`;
            }
        } else {
            responseText = "Ai chatbot under update. Please try again later.";
        }

        return responseText;
    }

    if (!chatForm.dataset.initialized) {
        chatForm.addEventListener('submit', handleChatSubmit);
        clearButton.addEventListener('click', handleClearChat);
        chatForm.dataset.initialized = 'true';
    }

    loadChatHistory();
});
