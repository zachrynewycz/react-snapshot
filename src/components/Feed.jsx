import Post from "./Post";
import useFeed from "../hooks/useFeed";

const Feed = () => {
    const { posts } = useFeed();

    return (
        <div className="feed">
            {posts?.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Feed;
