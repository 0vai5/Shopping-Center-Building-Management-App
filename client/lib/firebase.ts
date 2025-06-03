import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const loginUser = async(email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;
        return user;
    } catch (error) {
        console.log("Error logging in user:", error);
        throw error;
    }
}

export const logoutUser = async() => {
    try {
        await auth.signOut();
        console.log("User logged out successfully");
    } catch (error) {
        console.log("Error logging out user:", error);
        throw error;
    }
}

export const getCurrentUser = async () => {
    const user = auth.currentUser;
    if (user) {
        return user;
    } else {
        console.log("No user is currently logged in");
        return null;
    }
};
