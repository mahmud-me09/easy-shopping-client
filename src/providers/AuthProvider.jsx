import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { auth } from "../utilities/Firebase";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("authUser");
		return savedUser ? JSON.parse(savedUser) : null;
	});
	const [isLoading, setIsLoading] = useState(true);

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};


	const signInUser = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setIsLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const handleSignOut = async () => {
		setIsLoading(true);

		await signOut(auth)
			.then(() => {
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `You are successfully logged Out.`,
					showConfirmButton: false,
					timer: 1500,
				});

				localStorage.removeItem("authUser");
				setUser(null);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Failed to sign out", error);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Failed to Sign Out",
				});
				setIsLoading(false);
			});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				localStorage.setItem("authUser", JSON.stringify(currentUser));
				setIsLoading(false);
				setUser(currentUser);
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				const uid = user.uid;
				// ...
			} else {
				setIsLoading(true);
				setUser(null);
				localStorage.removeItem("authUser");
				// User is signed out
				// ...
			}
			console.log("observing", currentUser);
		});
		return () => unsubscribe();
	}, []);

	const authInfo = {
		user,
		setIsLoading,
		isLoading,
		signInUser,
		handleSignOut,
		createUser,
		googleSignIn,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
