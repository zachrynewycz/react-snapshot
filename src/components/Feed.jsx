import Post from "./Post";
import useFeed from "../hooks/useFeed";

const Feed = () => {
    const { posts, deletePost, editPost } = useFeed();

    return (
        <div className="feed">
            {posts.map((post) => (
                <Post key={post.id} post={post} deletePost={deletePost} editPost={editPost} />
            ))}
        </div>
    );
};

export default Feed;
