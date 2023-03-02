import { useState, useEffect } from "react";
//Firebase
import { db } from "../../firebase";
import { collection, doc, deleteDoc, query, orderBy, onSnapshot, updateDoc } from "firebase/firestore";

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

    const deletePost = async (id) => {
        let postToDelete = doc(db, "Posts", id);
        await deleteDoc(postToDelete);
    };

    const editPost = (post) => {
        let captionInput = prompt("Edit your post", post.caption);
        if (captionInput === "") return;
        //Update db info
        const postRef = doc(db, "Posts", post.id);
        updateDoc(postRef, { caption: captionInput });
    };

    return { posts, deletePost, editPost };
};

export default useFeed;
