import React from 'react';
import { Link } from 'react-router-dom'; 
// import '../styles/NavBar.css'

function NavBar() {
    return (
        
        <nav className='navbar'>
            <Link to="/users"><button>Profile Picture</button></Link>
            <Link to="/allPosts"><button>Everything</button></Link>
            <Link to="/posts"><button>My Posts</button></Link>
            <Link to= "/user/messenges"><button>Inbox</button></Link>
            <Link to='/maps'><button>Sensory Map</button></Link>
            <Link to='/journal'><button>Your Journal</button></Link>
            <button>testing</button>
        </nav>
      
    );
}

export default NavBar;