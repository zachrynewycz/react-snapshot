import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import Post from "../Post";

const PostsFromUser = () => {
    const [usersPosts, setUsersPosts] = useState([]);

    useEffect(() => {
        const postCollection = collection(db, "Posts");

        const unsubscribe = onSnapshot(
            query(postCollection, orderBy("timestamp", "desc"), where("userId", "==", auth.currentUser.uid)),
            (snapshot) => {
                setUsersPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="feed">
            {usersPosts?.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
};

export default PostsFromUser;
