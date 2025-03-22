// Fixed version of the regex to resolve the error:
// SyntaxError: Invalid regular expression: /^[a-zA-Z0-9\\s-_]+$/: Range out of order in character class
// The issue was the '-' character placement which was being interpreted as a range between '\s' and '_'

// The fix is to place the hyphen at the end of the character class or escape it:
// Option 1: /^[a-zA-Z0-9\s_-]+$/
// Option 2: /^[a-zA-Z0-9\s\_\-]+$/

import React, { useRef, useState, useEffect } from 'react';
// Import other dependencies as needed

const ChatInput = ({ onSendMessage, sessionId, isAnalyzing, fileInfo }) => {
  const [message, setMessage] = useState('');
  
  // Fix the regex by moving the hyphen to the end or beginning of the character class
  const isValidInput = (input: string): boolean => {
    // Fixed regex - hyphen at the end of the character class
    return /^[a-zA-Z0-9\s_-]+$/.test(input);
    
    // Alternative fix - escape the hyphen
    // return /^[a-zA-Z0-9\s\_\-]+$/.test(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim().length > 0) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isAnalyzing}
        />
        <button type="submit" disabled={isAnalyzing || message.trim() === ''}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
