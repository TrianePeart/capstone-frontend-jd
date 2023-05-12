import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBar.css';

function NavBar() {
  const [showForum, setShowForum] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/users'>
          <button className='profile-pic'>Profile Picture</button>
        </Link>
        <div
          className='dropdown'
          onMouseEnter={() => setShowForum(true)}
          onMouseLeave={() => setShowForum(false)}
        >
          <button className='dropbtn'>Forum</button>
          {showForum && (
            <div className='dropdown-content'>
              <Link to='/allPosts'>Everything</Link>
              <Link to='/myPosts'>My Posts</Link>
            </div>
          )}
        </div>
        <div
          className='dropdown'
          onMouseEnter={() => setShowMessages(true)}
          onMouseLeave={() => setShowMessages(false)}
        >
          <button className='dropbtn'>Messages</button>
          {showMessages && (
            <div className='dropdown-content'>
              <Link to='/inbox'>Inbox</Link>
            </div>
          )}
        </div>
        <div
          className='dropdown'
          onMouseEnter={() => setShowExtras(true)}
          onMouseLeave={() => setShowExtras(false)}
        >
          <button className='dropbtn'>Extras</button>
          {showExtras && (
            <div className='dropdown-content'>
              <Link to='/maps'>Sensory Map</Link>
              <Link to='/journal'>My Journal</Link>
            </div>
          )}
        </div>
        <Link href='settings'
          className='settings'
          onClick={handleSettingsClick}
          onKeyDown={e => {
            if (e.key === 'SPACE' || e.key === 'ENTER') {
                //This isn't working 
              handleSettingsClick();
            }
          }}
          role='button'
          //This role is creating this error
        >
          <button className='settings-btn'>Settings</button>
        </Link>
      </nav>
      {showSettings && (
        <div className='settings-sidebar'>
          <div className='sidebar-header'>
            <button className='close-btn' onClick={handleSettingsClick}>
              X
            </button>
            {/* Make this x tiny */}
          </div>
          <div className='sidebar-content'>
            <Link to='/logout' className='logout-link'>Logout</Link>
            {/* Create a logout button */}
            <Link to='/faq' className='faq-link'>FAQ</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;