import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { updateDoc, doc, getDoc, arrayRemove, arrayUnion } from "firebase/firestore";

const UpdownButton = ({ id, votes, uid }) => {
    const [isVoted, setIsVoted] = useState(false);
    const [animate, setAnimate] = useState(false);

    const postDocRef = doc(db, "Posts", id);
    const usersVotedPostsRef = doc(db, "Users", uid);

    useEffect(() => {
        const fetchVotedPosts = async () => {
            const usersVotesDoc = await getDoc(usersVotedPostsRef);
            const userVotedPosts = usersVotesDoc.data()?.votes;

            if (userVotedPosts?.includes(id)) {
                setIsVoted(true);
            }
        };

        fetchVotedPosts();
    }, [id, usersVotedPostsRef]);

    const handleVote = async () => {
        if (!isVoted) {
            //Start pulse animation when user increase vote only
            setAnimate(true);
            setTimeout(() => setAnimate(false), 1000);
            //Update post vote count / users votes posts array
            await updateDoc(usersVotedPostsRef, { votes: arrayUnion(id) });
            await updateDoc(postDocRef, { votes: votes + 1 });
            setIsVoted(true);
        } else {
            //Update post vote count / users votes posts array
            await updateDoc(usersVotedPostsRef, { votes: arrayRemove(id) });
            await updateDoc(postDocRef, { votes: votes - 1 });
            setIsVoted(false);
        }
    };

    return (
        <div className="updown">
            <div id="votepulse" style={{ display: animate ? "block" : "none" }} />

            <button
                id="upvote-btn"
                style={{
                    filter:
                        isVoted &&
                        "invert(45%) sepia(60%) saturate(4768%) hue-rotate(202deg) brightness(103%) contrast(151%)",
                }}
                onClick={handleVote}
            />
            <h1 id="post-votes">{votes}</h1>
        </div>
    );
};

export default UpdownButton;
