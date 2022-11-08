import {
  createUserWithEmailAndPassword,
  getAuth, GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  signOut
} from "firebase/auth";

import app from '../firebase.config';

const googleProvider = new GoogleAuthProvider();

export const auth = getAuth(app);

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const createUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const updateUserProfile = (profile) => {
  return updateProfile(auth.currentUser, profile);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);