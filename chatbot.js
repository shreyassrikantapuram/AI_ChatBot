// Chatbot functionality
document.getElementById('send-button').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return;

    // Display user message
    addMessage('user', userInput);

    // Fetch GPT-4 response
    fetchGPTResponse(userInput);
});

function addMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const msgElement = document.createElement('div');
    msgElement.classList.add(sender);
    msgElement.textContent = message;
    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto scroll to the bottom
}

async function fetchGPTResponse(userInput) {
    try {
        console.log("Sending request to GPT-4...");
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': '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' // Replace with your actual API key
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: userInput }]
            })
        });

        if (!response.ok) {
            console.error("Error in response:", response.status, response.statusText);
            addMessage('bot', 'Error connecting to AI. Please try again.');
            return;
        }

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        addMessage('bot', botMessage);
    } catch (error) {
        console.error('Error fetching GPT response:', error);
        addMessage('bot', 'Sorry, there was an error connecting to the AI. Please try again.');
    }
}
