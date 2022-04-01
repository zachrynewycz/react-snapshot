import { useState, useEffect } from "react";
//Components
import UpdownButton from "./UpdownButton";
//Firebase
import { db, auth } from '../firebase';
import { collection, doc, deleteDoc, query, orderBy, onSnapshot, updateDoc} from "firebase/firestore";
import 'firebase/firestore';

const Feed = () => {
    const [postList, setPostList] = useState([]);
    const postCollection = collection(db, "Posts");
        
    const deletePost = async (id) => {
        const postToDelete = doc(db, "Posts", id);
        await deleteDoc(postToDelete);
    };
        
    const handleEdit = (post) => {
        let newCaption = prompt("Edit your post", post.caption);
        const postRef = doc(db, "Posts", post.id)
            
        if (newCaption !== null) { 
            updateDoc(postRef, { caption: newCaption });
        }
    }
        
    useEffect(() => {
        //Get all posts from query
        const postQuery = query(postCollection, orderBy("timestamp", "desc"));
        const getPosts = onSnapshot(postQuery, (snapshot) => setPostList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
        return getPosts
    }, []);
        
        
    return (
    <div className="feed">
        {postList.map((post) => {
            return (
                <div className="post" key={post.id}>
                    <div className="post-header">
                        <img className="post-profilepic" src={post.profilePhoto}/>
                        <h1 className="post-username">{post.name}</h1>
                        
                        <UpdownButton postId={post.id} votes={post.votes} userId={auth.currentUser.uid}/>

                        { post.userId === auth.currentUser.uid && (
                            <>
                                <button onClick={() => deletePost(post.id)} id="post-delete"/>
                                <button id="post-edit" onClick={() => handleEdit(post)}/>
                            </>
                        )}
                    </div>

                    <p className="post-caption">{post.caption}</p>
                    <img className="post-image" src={post.image}/>
                </div>
            )
        })}
    </div>
    )
}

export default Feed;