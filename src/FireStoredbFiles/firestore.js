import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { doc, setDoc, addDoc, collection, getDoc, getDocs, updateDoc, deleteDoc, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db };

// Create Single Document
export const createDocument = async (db, data) => {
    const docRef = doc(db, "collection", "document-id");
    await setDoc(docRef, data);
};

// Create Document in Collection
export const createCollectionDocument = async (db, data) => {
    const colRef = collection(db, "collection");
    const docRef = await addDoc(colRef, data);
    return docRef.id;  // Returns the id of the new document
};

// Read Single Document
export const readDocument = async (db) => {
    const docRef = doc(db, "collection", "document-id");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
};

// Read Collection
export const readCollection = async (db) => {
    const querySnapshot = await getDocs(collection(db, "collection"));
    return querySnapshot.docs.map(doc => doc.data());
};

// Update Document
export const updateDocument = async (db, data) => {
    const docRef = doc(db, "collection", "document-id");
    await updateDoc(docRef, data);
};

// Delete Single Document
export const deleteDocument = async (db) => {
    const docRef = doc(db, "collection", "document-id");
    await deleteDoc(docRef);
};

// Delete Document from Collection
export const deleteCollectionDocument = async (db, docId) => {
    const docRef = doc(db, "collection", docId);
    await deleteDoc(docRef);
};

// Query the friendships collection to get all friendships for the user
export const fetchFriendDetails = async (userId) => {
    const friendshipsQuery = query(
        collection(db, "friendships"),
        where("userId", "==", userId)
    );
    const friendshipsSnapshot = await getDocs(friendshipsQuery);

    // Fetch the details of each friend
    const friendDetailsPromises = friendshipsSnapshot.docs.map(async (friendshipDoc) => {
        const friendId = friendshipDoc.data().friendId;
        const friendDoc = await getDoc(doc(db, "users", friendId));
        return friendDoc.data();
    });

    const friendDetails = await Promise.all(friendDetailsPromises);
    return friendDetails;
};