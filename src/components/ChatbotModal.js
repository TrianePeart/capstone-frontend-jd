import React, { useState } from 'react';
import '../style/ChatbotModal.css';

const ChatbotModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [moodIndex, setMoodIndex] = useState(0);
  const moods = ["I'm feeling Good.", "I'm feeling Angry", "I'm feeling Sad", "I'm feeling Worthless"];
  const [selectedMood, setSelectedMood] = useState(moods[moodIndex]);
  const [chatMessages, setChatMessages] = useState([]);

  const handleButtonClick = () => {
    if (selectedMood === "I'm feeling Good.") {
      setChatMessages([
        { type: 'bot', text: 'We are happy to hear that!' },
      ]);
      setShowModal(true);
    } else {
      setChatMessages([
        { type: 'bot', text: 'I\'m sorry to hear that.' },
        { type: 'bot', text: 'Would you like to chat with us?' },
      ]);
      setShowModal(true);
    }
  };

  const handleButtonHover = () => {
    let index = moodIndex + 1;
    if (index >= moods.length) {
      index = 0;
    }
    setMoodIndex(index);
    setSelectedMood(moods[index]);
  };

  const handleButtonLeave = () => {
    setSelectedMood('How are you feeling?');
  };

  const handleYesClick = () => {
    const selectedMood = moods[moodIndex];
    let newMessages = [];
  
    if (selectedMood === "I'm feeling Angry") {
      newMessages.push(
        { type: 'bot', text: 'Are you thinking of harming yourself or others?' }
      );
      newMessages.push(
        { type: 'bot', text: 'Please seek help by following this link: hotline-website-link' },
        { type: 'bot', text: 'If you need immediate assistance, please call the hotline at: hotline-number' }
      );
    } else if (selectedMood === "I'm feeling Sad") {
      newMessages.push(
        { type: 'bot', text: 'Are you having feelings of self-harm?' }
      );
      newMessages.push(
        { type: 'bot', text: 'Please seek help by following this link: hotline-website-link' },
        { type: 'bot', text: 'If you need immediate assistance, please call the hotline at: hotline-number' }
      );
    } else if (selectedMood === "I'm feeling Worthless") {
      newMessages.push(
        { type: 'bot', text: 'We are sorry you\'re feeling down. Are you having feelings of self-harm?' }
      );
      newMessages.push(
        { type: 'bot', text: 'If you need immediate assistance, please call the hotline at: hotline-number' },
        { type: 'bot', text: 'You can also visit the website: hotline-website-link for additional resources.' }
      );
    }
  
    setChatMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };
  
  const handleNoClick = () => {
    const selectedMood = moods[moodIndex];
    let newMessages = [];
  
    if (selectedMood === "I'm feeling Angry") {
      newMessages.push(
        { type: 'bot', text: 'Here is a link on ways to deal with anger: ways-to-deal-link' }
      );
    } else if (selectedMood === "I'm feeling Sad") {
      newMessages.push(
        { type: 'bot', text: 'Here is a link on ways to deal with sadness: ways-to-deal-link' }
      );
    }
  
    setChatMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };

  return (
    <div className="chat-container">
      <button
        className="mood-button"
        onClick={handleButtonClick}
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
      >
        {selectedMood}
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
            <div className="chat-content">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/021/743/105/small/chat-conversation-robot-artificial-intelligence-technology-online-communication-and-interaction-ai-chat-bot-support-virtual-assistant-in-your-device-vector.jpg"
                className="chat-image"
                alt="Chatbot"
              />
              <div className="chat-messages">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`message ${message.type}`}>
                    {message.text}
                  </div>
                ))}
              </div>
              {selectedMood === "I'm feeling Good." && (
                <div className="confetti">Confetti animation goes here</div>
              )}
              {selectedMood !== "I'm feeling Good." && (
                <div className="prompt-buttons">
                  <button onClick={handleYesClick}>Yes</button>
                  <button onClick={handleNoClick}>No</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotModal;
