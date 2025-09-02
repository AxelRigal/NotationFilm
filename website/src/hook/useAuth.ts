import { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

interface AuthState {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}
const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };
  const signOut = async () => {
    await auth.signOut();
  };

  return { user, signInWithGoogle, signOut };
};

export default useAuth;
