import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

// * User Auth Create

export const createUserToAuth = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

// * User Auth Log in

export const logInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

// * User create to Firestore

type UserProps = {
  uid: string;
  email: string;
  name: string;
  isAuth: boolean;
  createdAt: Timestamp;
};

export const createUserToFS = async (user: UserProps) => {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, user, { merge: true });
  } catch (error: any) {
    throw new Error(error || 'Failed to write in Database');
  }
};

// * Get user from Firestore

export const getUserFromFS = async (uid: string) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userRef = await getDoc(userDocRef);

    if (userRef.exists()) {
      return userRef.data();
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

// * Email checking

export const emailChecker = (email: string) => {
  const regex = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const checkedEmail = regex.test(email);

  return checkedEmail;
};

// * Error message management

export const handleFirestoreError = (error: FirebaseError) => {
  switch (error.code) {
    case 'auth/wrong-password':
      return 'Girdiğiniz email ya da şifre yanlış. Lütfen tekrar deneyin.';

    case 'auth/user-not-found':
      return 'Girdiğiniz email ya da şifre yanlış. Lütfen tekrar deneyin.';

    case 'permission-denied':
      return 'Bu işlemi gerçekleştirmek için gerekli izniniz yok.';

    case 'not-found':
      return 'Aradığınız veri bulunamadı.';

    case 'unavailable':
      return 'Hizmet şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.';

    case 'invalid-argument':
      return 'Geçersiz bir argüman girdiniz. Lütfen tekrar kontrol edin.';

    case 'already-exists':
      return 'Bu veri zaten mevcut.';

    case 'aborted':
      return 'İşlem iptal edildi. Lütfen tekrar deneyin.';

    case 'deadline-exceeded':
      return 'İstek zaman aşımına uğradı. Lütfen bağlantınızı kontrol edin ve tekrar deneyin.';

    case 'resource-exhausted':
      return 'Kaynak limitine ulaşıldı. Lütfen bir süre sonra tekrar deneyin.';

    case 'cancelled':
      return 'İstek iptal edildi.';

    case 'data-loss':
      return 'Veri kaybı yaşandı. Lütfen tekrar deneyin.';

    case 'unauthenticated':
      return 'Bu işlemi gerçekleştirebilmek için önce giriş yapmalısınız.';

    default:
      return 'Bilinmeyen bir hata oluştu. Lütfen tekrar deneyin.';
  }
};
