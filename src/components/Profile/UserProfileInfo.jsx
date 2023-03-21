import { auth } from "../../../firebase";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const UserProfileInfo = () => {
    const [user] = useAuthState(auth);
    const [totalVoteCount, setTotalVoteCount] = useState(0);

    useEffect(() => {
        getTotalVotesFromPosts();
    }, []);

    const getTotalVotesFromPosts = async () => {
        const querySnapshot = await getDocs(query(collection(db, "Posts"), where("userId", "==", user.uid)));
        const userPostsVoteCount = querySnapshot.docs.map((doc) => doc.data().votes);
        setTotalVoteCount(userPostsVoteCount.reduce((a, b) => a + b, 0));
    };

    return (
        <div className="user-profile">
            <div className="user-profile__info">
                <img src={user.photoURL} />

                <div>
                    <h1>{user.displayName}</h1>
                    <h3>
                        <span id="underlined-total">{totalVoteCount}</span>
                        <span style={{ color: "gray" }}> Total Upvotes</span>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default UserProfileInfo;
