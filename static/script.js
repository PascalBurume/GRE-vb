const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const clearButton = document.getElementById("clear-button");
const suggestionButtons = document.querySelectorAll(".suggestion-button");

// Initial message configuration
const initialMessage = {
    sender: "bot",
    content: "Hello! I'm Coach AI Prep, your analytical writing assistant. Please write down your input message, and I'll help you analyze and improve it. You can share an essay, argument, or any piece of writing you'd like to work on."
};

function initializeChat() {
    // Clear chatbox completely
    chatbox.innerHTML = '';
    
    // Create initial message elements
    const messageContainer = document.createElement("div");
    messageContainer.className = "bot-message";
    
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "B";
    
    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.textContent = initialMessage.content;
    
    // Assemble message
    messageContainer.appendChild(avatar);
    messageContainer.appendChild(messageContent);
    chatbox.appendChild(messageContainer);
    
    // Ensure proper scrolling
    maintainScrollPosition();
}

function maintainScrollPosition() {
    // Small delay to ensure DOM updates
    setTimeout(() => {
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 50);
}

function showTyping() {
    const typing = document.createElement('div');
    typing.classList.add('bot-message');
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = 'B';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'typing-dot';
        typingContent.appendChild(dot);
    }
    
    typing.appendChild(avatar);
    typing.appendChild(typingContent);
    chatbox.appendChild(typing);
    maintainScrollPosition();
    return typing;
}

function sanitizeInput(text) {
    const temp = document.createElement('div');
    temp.textContent = text;
    return temp.innerHTML;
}

function formatResponse(response) {
    let formatted = sanitizeInput(response)
        .replace(/\n/g, "<br>")
        .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
        .replace(/_(.*?)_/g, "<em>$1</em>");

    formatted = formatted.replace(/^(#+)\s*(.*)$/gm, (match, hashes, content) => {
        const level = Math.min(hashes.length, 3);
        return `<h${level} class="response-heading">${content}</h${level}>`;
    });

    return formatted;
}

function appendMessage(sender, message) {
    const messageContainer = document.createElement("div");
    messageContainer.className = `${sender}-message`;
    
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = sender === "user" ? "U" : "B";
    
    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.innerHTML = formatResponse(message);
    
    messageContainer.appendChild(avatar);
    messageContainer.appendChild(messageContent);
    chatbox.appendChild(messageContainer);
    maintainScrollPosition();
}

function getBotResponse(userText) {
    const typing = showTyping();
    
    fetch(`/get?msg=${encodeURIComponent(userText)}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            typing.remove();
            appendMessage("bot", data.response);
        })
        .catch(error => {
            console.error('Error:', error);
            typing.remove();
            appendMessage("bot", "Sorry, I'm having trouble connecting. Please try again.");
        });
}

function sendMessage() {
    const userText = userInput.value.trim();
    if (userText) {
        appendMessage("user", userText);
        userInput.value = "";
        getBotResponse(userText);
    }
}

function clearChat() {
    initializeChat();
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', initializeChat);

// Event Listeners
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") sendMessage();
});
clearButton.addEventListener("click", clearChat);

suggestionButtons.forEach(button => {
    button.addEventListener("click", () => {
        userInput.value = button.textContent;
        sendMessage();
    });
});