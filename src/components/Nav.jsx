import Sidebar from "../components/Sidebar";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav = () => {
    const [user] = useAuthState(auth);

    return (
        <nav>
            <div className="nav-container">
                <div className="fixed-nav-flex">
                    <Sidebar />
                </div>

                <div className="fixed-nav-flex">
                    <div className="logo" />
                </div>

                <div className="fixed-nav-flex">
                    <div className="nav-user-info">
                        <img className="nav-user-profilepic" src={user.photoURL} />
                        <div className="nav-username">{user.displayName?.split(" ")[0]}</div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
