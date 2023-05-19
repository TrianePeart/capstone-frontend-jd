import { useState, useEffect } from 'react';
import io from 'socket.io-client';
const chatAPI = process.env.REACT_APP_WS_URL;
const socket = io(chatAPI);

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  
  const handleNewMessage = (e) => {
      setNewMessage(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            text: newMessage,
            username: 'User123',
            timestamp: new Date(),
        };
        socket.emit('newMessage', message);
        setNewMessage('');
    };
    
    useEffect(() => {
      socket.on('newMessage', (message) => {
        setMessages([...messages, message]);
      });
    }, [messages]);
    console.log(messages)

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <span>{message.username}: </span>
          <span>{message.text}</span>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={handleNewMessage} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
