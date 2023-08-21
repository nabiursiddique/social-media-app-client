import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const googleProvider = new GoogleAuthProvider();

    // Creating new user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Sign In user with email and password 
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // setting users name and email
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    // Google sign in and signup
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    // Signout a user
    const logout = () => {
        return signOut(auth);
    }

    // Getting the current user & set it to the state
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubcribe();
    }, [])

    const authInfo = {
        createUser,
        signIn,
        logout,
        updateUser,
        googleSignIn,
        user
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;