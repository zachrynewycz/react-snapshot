import { useState, useRef } from 'react';
//Firebase
import { db, storage, auth } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Form = () => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [captionInput, setCaptionInput] = useState("");
    const imageRef = useRef();

    const captionInputHandler = (e) => {
        e.preventDefault();
        setCaptionInput(e.target.value);
    }
    
    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const processUpload = async () => {
        if (captionInput === "" || !image) {return}
        
        //Firebase storage location
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        
        uploadTask.on('state_changed', (snapshot) => {
            var progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
        }, 
        (error) => {
            console.log(error);
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                handleUpload(url);
            })
        })
    }

    const handleUpload = async (url) => {
        const postCollection = collection(db, "Posts");
        //Upload doc to Firebase
        await addDoc(postCollection, {
            timestamp: serverTimestamp(),
            userId: auth.currentUser.uid,
            profilePhoto: auth.currentUser.photoURL,
            name: auth.currentUser.displayName,
            votes: 0,
            caption: captionInput,
            image: url
        })
        .then(() => {
            setImage(null);
            setCaptionInput("");
            setProgress(0);
            imageRef.current.value = "";
        })
    }
    
    return (
        <div className="form">
            <h1 id="form-header">Create Post</h1>
            <textarea className='caption-input' type="text" value={captionInput} onChange={captionInputHandler} placeholder="Enter a caption for your post..." maxLength="185"/>
            <input className="image-input" type="file" ref={imageRef} onChange={handleImage} accept="image/*"/>
            <progress className='upload-progress' style={{display : progress > 0 ? "block": "none"}} value={progress} max="100"/>   
            <button className="form-submit" onClick={processUpload}>POST</button>
        </div>
    )
}

export default Form;