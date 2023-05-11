// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Landing from "./pages/Landing";
// import FourOFour from "./pages/Four0Four;"
import AllPosts from "./pages/AllPosts";
import Posts from "./pages/Posts";
import SafeSpace from "./pages/SafeSpace";
import DirectMessages from "./pages/DirectMessages";
import Map from './pages/Map';
import Journal from "./pages/Journal";

// COMPONENTS
import NavBar from "./components/NavBar";
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="*" element={<FourOFour />} /> */}
          <Route path='/allPosts' element={<AllPosts />}/> 
          <Route path='/myPosts' element={<Posts />}/> 
          <Route path="/users" element={<SafeSpace />}/> 
          <Route path="/inbox" element={<DirectMessages />} /> 
          <Route path="/maps" element={<Map />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
