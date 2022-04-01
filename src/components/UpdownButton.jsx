import { useState, useEffect } from 'react';
//Firebase
import { db } from '../firebase';
import { updateDoc, doc, getDoc, arrayRemove, arrayUnion } from 'firebase/firestore';

const UpdownButton = ({ postId, votes, userId }) => {
    const [isVoted, setIsVoted] = useState(false);
    const [voteList, setVoteList] = useState([]);
    const currentPostRef = doc(db, "Posts", postId);
    const userVotesRef = doc(db, "Users", userId);
    
    useEffect(() => {
        //updates
        const votesData = JSON.parse(localStorage.getItem("votes"));
        setVoteList(votesData);
        console.log(voteList.votes)

        if (voteList !== null) {
            if (votesData.includes(postId)) {
                setIsVoted(true);
            }
        }
        
    }, []);

    useEffect( async () => {
        //Save to localstorage for updated
        const data = await getDoc(userVotesRef);
        localStorage.setItem("votes", JSON.stringify([...data.data().votes]));
    })

    const handleVote = () => {
        //If user has already voted on post then remove vote
        if (isVoted) {
            updateDoc(userVotesRef, { votes: arrayRemove(postId) })
            updateDoc(currentPostRef, { votes: votes - 1 });
            setIsVoted(false);
            return;
        };

        updateDoc(userVotesRef, { votes: arrayUnion(postId) })
        updateDoc(currentPostRef, { votes: votes + 1 });
        setIsVoted(true);
    }
    
    return (
        <div className="updown">
            <button id="upvote-btn" style={{filter: isVoted && (
                "invert(45%) sepia(60%) saturate(4768%) hue-rotate(202deg) brightness(103%) contrast(151%)")
            }} onClick={handleVote}/>
            
            <h1 id="post-votes">{votes}</h1>
        </div>
    )
}

export default UpdownButton;