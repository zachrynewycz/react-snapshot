import { useEffect, useState } from 'react';
//Components
import Form from '../components/Form';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';

const Home = () => {
    const [profilePic, setProfilePic] = useState("");
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        setDisplayName(localStorage.getItem("name"));
        setProfilePic(localStorage.getItem("profilePic"));
    }, [])

    return (
        <div className="homepage">
            <div className='nav'>
                <Sidebar/>
                <div className='logo'/>

                <div className="nav-user-info">
                    <img className="nav-user-profilepic" src={profilePic}/>
                    <div className="nav-username">{displayName}</div>
                </div>
            </div>

            <Form/>
            <Feed/>
            <footer/>
        </div>
    )
}

export default Home;