import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
//Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';


const App = () => {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => { setUser(currentUser); });

  return (
    <Router>
      <Routes>
        { user && (
          <Route exact path="/" element={<Home/>} />
        )}
        { !user && (
          <Route path="login" element={<Login/>} />
        )}
        <Route exact path="*" element={<Navigate to={!user ? "login" : "/"}/>} />
      </Routes>
    </Router>
  );
}

export default App;