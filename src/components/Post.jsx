import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import UpdownButton from "./UpdownButton";

const Post = ({ post }) => {
    const deletePost = async () => {
        const postToDelete = doc(db, "Posts", post.id);
        await deleteDoc(postToDelete);
    };

    const editPost = async () => {
        const newPostCaption = prompt("Enter new caption for your post", post.caption);

        if (newPostCaption) {
            const postRef = doc(db, "Posts", post.id);
            await updateDoc(postRef, { caption: newPostCaption });
        }
    };

    return (
        <div className="post">
            <div className="post-header">
                <img className="post-profilepic" src={post.profilePhoto} />
                <h1 className="post-username">{post.name}</h1>
                <p className="post-date">{post.date}</p>

                <UpdownButton post={post} uid={auth.currentUser.uid} />

                {post.userId === auth.currentUser.uid && (
                    <>
                        <button onClick={deletePost} id="post-delete" />
                        <button onClick={editPost} id="post-edit" />
                    </>
                )}
            </div>

            <p className="post-caption">{post.caption}</p>
            <img className="post-image" src={post.image} />
        </div>
    );
};

export default Post;
