import Sidebar from "../components/Sidebar";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Nav = () => {
    const [user] = useAuthState(auth);

    return (
        <nav>
            <div className="nav-container">
                <Sidebar />

                <div className="logo" />

                <div className="nav-user-info">
                    <img src={user.photoURL} />
                    <h4>{user.displayName?.split(" ")[0]}</h4>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
