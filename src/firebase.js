import { initializeApp} from 'firebase/app';
import { doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIRiZ70q41_LmCnQ_jhtbsarPQuv2GvRM",
  authDomain: "social-media-app-635c5.firebaseapp.com",
  projectId: "social-media-app-635c5",
  storageBucket: "social-media-app-635c5.appspot.com",
  messagingSenderId: "550993216601",
  appId: "1:550993216601:web:f972a18984ad42f2179d48"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(app);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => { 
  await signInWithPopup(auth, provider).then(()=> {    
    setLocalStorage(auth);
    getUserDocument(auth);
  });   
}

const getUserDocument = async (auth) => {
  const userDoc = await getDoc(doc(db, "Users", auth.currentUser.uid));

  if (!userDoc.exists()) { 
    //create document for new users
    await setDoc(doc(db, "Users", auth.currentUser.uid), { votes: [] });
    return;
  }
  localStorage.setItem("votes", JSON.stringify([...userDoc.data().votes]));
}

const setLocalStorage = (auth) => {
  localStorage.setItem("name", auth.currentUser.displayName.split(" ")[0]);
  localStorage.setItem("profilePic", auth.currentUser.photoURL);
}