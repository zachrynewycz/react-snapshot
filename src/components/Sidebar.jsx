import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <>
            <button id="sidebar-open-btn" onClick={() => setShowSidebar((s) => !s)} />

            <div className="sidebar" style={{ width: showSidebar ? "250px" : "0" }}>
                <button id="sidebar-close-btn" onClick={() => setShowSidebar((s) => !s)} />
                <Link to={`profile/${auth?.currentUser?.uid}`}>Profile</Link>
                <a onClick={logout}>Logout</a>
            </div>
        </>
    );
};

export default Sidebar;
