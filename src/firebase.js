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
    createUserDocument(auth);
    getUsersVotes(auth);
  });   
}

const createUserDocument = async (auth) => {
  const userId = auth.currentUser.uid;
  const userDoc = await getDoc(doc(db, "Users", userId))
  
  //If its a new user then create a new document for them
  if (!userDoc.exists()) { 
    await setDoc(doc(db, "Users", userId), {
      votes: []
    })
  }
}

const getUsersVotes =  async (auth) => {
  //User collection
  const userVotesRef = doc(db, "Users", auth.currentUser.uid);
  //User document data
  const data = await getDoc(userVotesRef);
  localStorage.setItem("votes", JSON.stringify([...data.data().votes]))
}

const setLocalStorage = (auth) => {
  const name = auth.currentUser.displayName.split(" ")[0];
  const email = auth.currentUser.email;
  const profilePic = auth.currentUser.photoURL;
  //Set local storage
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("profilePic", profilePic);
}