import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// PAGES
import Landing from './pages/Landing';
import Forums from './pages/Forums';
import Posts from './pages/Posts';
import SafeSpace from './pages/SafeSpace';
import DirectMessages from './pages/DirectMessages';
import Map from './pages/Map';
import Journal from './pages/Journal';

// COMPONENTS
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="App">
      <Router>
        {signedIn && <NavBar />}
        <Routes>
          <Route path="/" element={<Landing setSignedIn={setSignedIn} />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/myPosts" element={<Posts />} />
          <Route path="/users" element={<SafeSpace />} />
          <Route path="/inbox" element={<DirectMessages />} />
          <Route path="/maps" element={<Map />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
