import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_Firebase_apiKey,
	authDomain: import.meta.env.VITE_Firebase_authDomain,
	projectId: import.meta.env.VITE_Firebase_projectId,
	storageBucket: import.meta.env.VITE_Firebase_storageBucket,
	messagingSenderId: import.meta.env.VITE_Firebase_messagingSenderId,
	appId: import.meta.env.VITE_Firebase_appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);