// FirebaseContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDH-WYhb4p7zHP17BKymUc_H137IZJyjYI",
	authDomain: "axess-fbf13.firebaseapp.com",
	projectId: "axess-fbf13",
	storageBucket: "axess-fbf13.appspot.com",
	messagingSenderId: "319597295636",
	appId: "1:319597295636:web:7f75f416555ec4b7f4cf01",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const firestore: Firestore = getFirestore(app);

// Context types for Firebase and Firestore
type FirebaseContextType = {
	app: FirebaseApp;
	firestore: Firestore;
};

// Create the Firebase Context
const FirebaseContext = createContext<FirebaseContextType | null>(null);

// Firebase Provider Component
export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <FirebaseContext.Provider value={{ app, firestore }}>{children}</FirebaseContext.Provider>;
};

// Custom hook to use Firebase context
export const useFirebase = (): FirebaseContextType => {
	const context = useContext(FirebaseContext);
	if (!context) {
		throw new Error("useFirebase must be used within a FirebaseProvider");
	}
	return context;
};
