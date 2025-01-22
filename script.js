document.addEventListener('DOMContentLoaded', () => {
    const welcomePopup = document.getElementById('welcomePopup');
    const welcomeCharacter = document.getElementById('welcomeCharacter');
    const nameInput = document.getElementById('nameInput');
    const submitName = document.getElementById('submitName');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const chatBubble = document.querySelector('.chat-bubble'); // Chat bubble element
    const chatText = document.getElementById('chatText'); // Text inside chat bubble
    const navLinks = document.querySelectorAll('nav ul li a'); // Navigation links
    const getStartedButton = document.getElementById('getStartedBtn'); // Get Started button
    const getStartedLink = document.querySelector('.cta-button'); // Target the Get Started link
    const savedName = localStorage.getItem('userName');

    // Function to display the username
    const displayUsername = () => {
        if (savedName && usernameDisplay) {
            usernameDisplay.textContent = `Welcome, ${savedName}!`;
            enableNavigation(); // Enable navigation when the username is available
        }
    };

    // Hide the chat bubble
    const hideChatBubble = () => {
        if (chatBubble) {
            chatBubble.style.display = 'none';
        }
    };

    // Show "What's your name?" in the chat bubble
    const showChatBubbleText = () => {
        if (chatText) {
            chatText.textContent = "What's your name?";
        }
    };

    // Prevent navigation before entering a name
    const preventNavigation = (e) => {
        e.preventDefault();
        alert('Please enter your name before navigating the site.');
    };

    // Disable navigation links and buttons
    const disableNavigation = () => {
        navLinks.forEach(link => {
            link.addEventListener('click', preventNavigation);
            link.classList.add('disabled-link');
        });

        if (getStartedButton) {
            getStartedButton.addEventListener('click', preventNavigation);
            getStartedButton.classList.add('disabled-link');
        }

        if (getStartedLink) {
            getStartedLink.addEventListener('click', preventNavigation);
        }
    };

    // Enable navigation links and buttons
    const enableNavigation = () => {
        navLinks.forEach(link => {
            link.removeEventListener('click', preventNavigation);
            link.classList.remove('disabled-link');
        });

        if (getStartedButton) {
            getStartedButton.removeEventListener('click', preventNavigation);
            getStartedButton.classList.remove('disabled-link');
        }

        if (getStartedLink) {
            getStartedLink.removeEventListener('click', preventNavigation);
        }
    };

    // Handle name submission
    if (!savedName) {
        // Disable navigation links and buttons
        disableNavigation();

        // Show popup, character, and chat bubble
        if (welcomePopup) welcomePopup.style.display = 'block';
        if (welcomeCharacter) welcomeCharacter.style.display = 'block';
        if (chatBubble) chatBubble.style.display = 'block'; // Ensure chat bubble is visible

        // Show "What's your name?" in the chat bubble after a delay
        setTimeout(() => {
            showChatBubbleText();
        }, 1300);

        // Handle name submission
        if (submitName && nameInput) {
            submitName.addEventListener('click', (e) => {
                e.preventDefault();
                const name = nameInput.value.trim();

                if (name) {
                    // Store the name in localStorage
                    localStorage.setItem('userName', name);

                    // Update welcome message
                    if (welcomePopup) {
                        welcomePopup.innerHTML = `<h2>Hello ${name}!</h2><p>Welcome to Synaptix</p>`;
                    }

                    // Animate popup and character out
                    setTimeout(() => {
                        if (welcomePopup) welcomePopup.classList.add('fade-out');
                        if (welcomeCharacter) welcomeCharacter.classList.add('fade-out');

                        if (usernameDisplay) {
                            usernameDisplay.textContent = `Welcome, ${name}!`;
                            usernameDisplay.style.display = 'block'; // Ensure visibility
                        }

                        // Hide chat bubble
                        hideChatBubble();

                        // Enable navigation after name submission
                        enableNavigation();

                        // Remove elements after animation
                        setTimeout(() => {
                            if (welcomePopup) welcomePopup.style.display = 'none';
                            if (welcomeCharacter) welcomeCharacter.style.display = 'none';
                        }, 1000);
                    }, 2000);
                }
            });
        }

        // Handle form submission with the enter key
        if (nameInput) {
            nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (submitName) submitName.click();
                }
            });
        }
    } else {
        // If the name is saved, disable the popup
        if (welcomePopup) welcomePopup.style.display = 'none';
        if (welcomeCharacter) welcomeCharacter.style.display = 'none';
        hideChatBubble();
        displayUsername();
    }
});
