import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { updateDoc, doc, getDoc, arrayRemove, arrayUnion } from "firebase/firestore";

const UpdownButton = ({ post, uid }) => {
    const [isVoted, setIsVoted] = useState(false);
    const [animate, setAnimate] = useState(false);
    const postDocRef = doc(db, "Posts", post.id);
    const userDocRef = doc(db, "Users", uid);

    useEffect(() => {
        checkIfVoted();
    }, [post.id, userDocRef]);

    const checkIfVoted = async () => {
        const userDoc = await getDoc(userDocRef);
        const userVotes = userDoc.data()?.votes;

        if (userVotes?.includes(post.id)) {
            setIsVoted(true);
        }
    };

    const handleVote = async () => {
        if (!isVoted) {
            setAnimate(true); // start pulse animation when user upvotes
            setTimeout(() => setAnimate(false), 1000);

            await updateDoc(userDocRef, { votes: arrayUnion(post.id) });
            await updateDoc(postDocRef, { votes: post.votes + 1 });
            setIsVoted(true);
        } else {
            await updateDoc(userDocRef, { votes: arrayRemove(post.id) });
            await updateDoc(postDocRef, { votes: post.votes - 1 });
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
            <h1 id="post-votes">{post.votes}</h1>
        </div>
    );
};

export default UpdownButton;
