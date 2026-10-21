import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";

// Shared admin state — Footer (login) and Reviews (delete button) both read this.
export function useAuth() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  const logout = () => signOut(auth);

  return { user, isAdmin: !!user, login, resetPassword, logout };
}
