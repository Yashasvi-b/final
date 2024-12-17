import React, { useState } from "react";
import axios from "axios";
import "./ChatbotComponent.css"; // External CSS file for styling



function ChatbotComponent() {
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState([
        { sender: "Chatbot", text: "Start your conversation..." }
    ]);
    
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: "You", text: message };
        setConversation((prev) => [...prev, userMessage]);
        setMessage(""); // Clear input box
        setIsTyping(true);

        try {
            const response = await axios.post("http://127.0.0.1:5002/api/chatbot", { message });
            const botReply = { sender: "Chatbot", text: response.data.response };

            setTimeout(() => {
                setConversation((prev) => [...prev, botReply]);
                setIsTyping(false);
            }, 1000); // Simulate chatbot typing delay
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            const errorReply = {
                sender: "Chatbot",
                text: "I'm having trouble responding right now. Please try again later.",
            };
            setConversation((prev) => [...prev, errorReply]);
            setIsTyping(false);
        }
    };

    return (
        <div className="page-background">
        <div className="chatbot-container">
            <h2 className="chatbot-title">Chatbot</h2>
            <div className="chatbox">
    {conversation.map((msg, index) => (
        <div
            key={index}
            className={`message-container ${msg.sender === "You" ? "user" : "bot"}`}
        >
            {/* Bot message: icon before message */}
            {msg.sender !== "You" && (
                <img src="/images/chatbot/bot.png" alt="bot" className="profile-pic" />
            )}
            <div className="message">{msg.text}</div>
            {/* User message: icon after message */}
            {msg.sender === "You" && (
                <img src="/images/chatbot/user.png" alt="user" className="profile-pic" />
            )}
        </div>
    ))}
    {isTyping && (
        <div className="message-container bot">
            <img src="/images/chatbot/bot.png" alt="profile" className="profile-pic" />
            <div className="message typing">
                <span></span><span></span><span></span>
            </div>
        </div>
    )}
</div>

            <div className="input-container">
                {/* Input box */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                {/* Send button */}
                <button onClick={sendMessage} className="send-button">
                    <img src="/images/chatbot/send-icon.png" alt="send" />
                </button>
            </div>
        </div>
        </div>
    );
}

export default ChatbotComponent;
