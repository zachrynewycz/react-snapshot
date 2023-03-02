import { auth } from "../../firebase";
import UpdownButton from "./UpdownButton";

const Post = ({ post, deletePost, editPost }) => {
    const currentUser = auth.currentUser;

    const handleDelete = () => {
        deletePost(post.id);
    };

    const handleEdit = () => {
        editPost(post);
    };

    return (
        <div className="post" key={post.id}>
            <div className="post-header">
                <img className="post-profilepic" src={post.profilePhoto} alt={post.name} />
                <h1 className="post-username">{post.name}</h1>
                <p className="post-date">{post.date}</p>

                <UpdownButton id={post.id} votes={post.votes} uid={currentUser.uid} />
                {post.userId === currentUser.uid && (
                    <>
                        <button onClick={handleDelete} id="post-delete" />
                        <button onClick={handleEdit} id="post-edit" />
                    </>
                )}
            </div>
            <p className="post-caption">{post.caption}</p>
            <img className="post-image" src={post.image} alt={post.caption} />
        </div>
    );
};

export default Post;
