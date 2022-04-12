import { useState } from 'react';
//Firebase
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleLogout = async () => {
        await signOut(auth).then(()=> {
            localStorage.clear();
        });
    };
    
    return (
        <>
            <button id='sidebar-open-btn' onClick={()=> setShowSidebar((s) => !s)}/>
            <div className="sidebar" style={{width : showSidebar ? "250px": "0"}}>
                <button id="sidebar-close-btn" onClick={()=> setShowSidebar((s) => !s)}/>
                
                <a id="sidebar-label" onClick={handleLogout}>Logout</a>
                <a id="github" href="https://github.com/zachrynewycz"><span id="github-text">Github</span></a>
            </div>
        </>
    );
}

export default Sidebar;