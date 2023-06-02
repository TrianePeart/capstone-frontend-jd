import React, { useState } from 'react';
import '../style/ChatbotModal.css';

const ChatbotModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [moodIndex, setMoodIndex] = useState(0);
  const moods = ["I'm feeling Good.", "I'm feeling Angry", "I'm feeling Sad", "I'm feeling Worthless"];
  const [selectedMood, setSelectedMood] = useState(moods[moodIndex]);
  const [chatMessages, setChatMessages] = useState([]);

  const handleButtonClick = () => {
    if (selectedMood === moods[0]) {
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

  const handleNextPrompt = (response) => {
    let newMessages = [];
  
    switch (moodIndex) {
      case 1: // Angry
        if (response === 'yes') {
          newMessages.push(
            { type: 'bot', text: 'Are you thinking of harming yourself or others?' }
          );
        }else if (response = 'yes'){
          return handleYesClick();
        } else {
          handleNoClick();
          return;
        }
        break;
      case 2: // Sad
        if (response === 'yes') {
          newMessages.push(
            { type: 'bot', text: 'Are you having feelings of self-harm?' }
          );
        } else {
          handleNoClick();
          return;
        }
        break;
      case 3: // Worthless
        if (response === 'yes') {
          newMessages.push(
            { type: 'bot', text: 'We are sorry you\'re feeling down. Are you having feelings of self-harm?' }
          );
        } else {
          handleNoClick();
          return;
        }
        break;
      default:
        break;
    }
  
    setChatMessages((prevMessages) => [...prevMessages, ...newMessages]);
  };
  
  const handleYesClick = () => {
    const selectedMood = moods[moodIndex];
    let newMessages = [];
  
    if (selectedMood === moods[1]) {
      //Anger
      newMessages.push(
        { type: 'bot', text: 'Please seek help by following this link: hotline-website-link' },
        { type: 'bot', text: 'If you need immediate assistance, please call the hotline at: hotline-number' }
      );
    } else if (selectedMood === moods[2]) {
      //Sadness
      newMessages.push(
        { type: 'bot', text: 'Are you having feelings of self-harm?' }
      );
      newMessages.push(
        { type: 'bot', text: 'Please seek help by following this link: hotline-website-link' },
        { type: 'bot', text: 'If you need immediate assistance, please call the hotline at: hotline-number' }
      );
    } else if (selectedMood === moods[3]) {
      //Worthless
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
  
    if (selectedMood === moods[1]) {
      newMessages.push(
        { type: 'bot', text: 'Here is a link on ways to deal with anger: ways-to-deal-link' }
      );
      //have to change it to close modal after this is done 
    } else if (selectedMood === moods[2]) {
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
              {selectedMood !== moods[0] && (
                //This is not working how it should buttons should not be showing on "Im feeling good"
                <div className="prompt-buttons">
                  <button onClick={() => handleNextPrompt('yes')}>Yes</button>
                  <button onClick={() => handleNextPrompt('no')}>No</button>
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
