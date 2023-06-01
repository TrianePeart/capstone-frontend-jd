import React from 'react';
import MyProfile from '../components/MyProfile';
import ChatbotModal from '../components/ChatbotModal';


function SafeSpace() {
   
    return (
        <div>
            <ChatbotModal/>
            <MyProfile />
        </div>
    );
}

export default SafeSpace;