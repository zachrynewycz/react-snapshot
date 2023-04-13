import { useState, useEffect } from "react";
//Firebase
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const useFeed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const postCollection = collection(db, "Posts");

        const unsubscribe = onSnapshot(query(postCollection, orderBy("timestamp", "desc")), (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return { posts };
};

export default useFeed;
