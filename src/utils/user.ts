import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';

// * User Auth Create

export const createUserToAuth = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    const errorMessage = error.message;
    return errorMessage;
  }
};

// * User Auth Log in

export const logInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    const errorMessage = error.message;
    return errorMessage;
  }
};

// * User create to Firestore

export const createUserToFS = async (user: User) => {
  const userDocRef = doc(db, 'users', user.uid);
  await setDoc(userDocRef, { merge: true });
};

// * Get user from Firestore

export const getUserFromFS = async (user: User) => {
  const userDocRef = doc(db, 'users', user.uid);
  const userRef = await getDoc(userDocRef);

  if (userRef.exists()) {
    return userRef.data();
  } else {
    console.log("User didn't found");

    return null;
  }
};

// * Email checking

export const emailChecker = (email: string) => {
  const regex = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const checkedEmail = regex.test(email);

  return checkedEmail;
};
