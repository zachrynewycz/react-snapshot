import { useState, useRef } from "react";
import { format } from "date-fns";
//Firebase
import { db, storage, auth } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Form = () => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [captionInput, setCaptionInput] = useState("");
    const imageRef = useRef();

    const handleCaptionInput = (e) => {
        e.preventDefault();
        setCaptionInput(e.target.value);
    };

    const processUpload = async () => {
        if (!image) {
            alert("Please upload an image to post.");
            return;
        }

        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                uploadPost(downloadUrl);
            }
        );
    };

    const uploadPost = async (url) => {
        await addDoc(collection(db, "Posts"), {
            timestamp: serverTimestamp(),
            userId: auth.currentUser.uid,
            profilePhoto: auth.currentUser.photoURL,
            name: auth.currentUser.displayName,
            votes: 0,
            caption: captionInput,
            image: url,
            date: format(new Date(), "LLL dd, yyyy"),
        });

        setImage(null);
        setCaptionInput("");
        setProgress(0);
        imageRef.current.value = "";
    };

    return (
        <div className="form">
            <h1 id="form-header">Create Post</h1>
            <textarea
                className="caption-input"
                type="text"
                value={captionInput}
                onChange={handleCaptionInput}
                placeholder="Enter a caption for your post..."
                maxLength="185"
            />
            <input
                className="image-input"
                type="file"
                ref={imageRef}
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
            />

            <progress
                className="upload-progress"
                style={{ display: progress > 0 ? "block" : "none" }}
                value={progress}
                max="100"
            />
            <button className="form-submit" onClick={processUpload} disabled={!image}>
                POST
            </button>
        </div>
    );
};

export default Form;
