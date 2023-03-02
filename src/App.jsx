import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
//Firebase
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const App = () => {
    const [user] = useAuthState(auth);

    return (
        <Router>
            <Routes>
                {user && <Route exact path="/" element={<Home user={user} />} />}
                {!user && <Route path="login" element={<Login />} />}
                <Route exact path="*" element={<Navigate to={!user ? "login" : "/"} />} />
            </Routes>
        </Router>
    );
};

export default App;
