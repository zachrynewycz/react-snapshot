import Nav from "../components/Nav";
import PostsFromUser from "../components/Profile/PostsFromUser";
import UserProfileInfo from "../components/Profile/UserProfileInfo";

const Profile = () => {
    return (
        <>
            <Nav />
            <UserProfileInfo />
            <PostsFromUser />
        </>
    );
};

export default Profile;
