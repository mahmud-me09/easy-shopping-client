import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth} from "../utilities/Firebase";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("authUser");
		return savedUser ? JSON.parse(savedUser) : null;
	});
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate()

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
			// .then((userCredential) => {
			// 	// Signed up
			// 	const user = userCredential.user;
            //     console.log(user)
			// })
			// .catch((error) => {
			// 	const errorCode = error.code;
			// 	const errorMessage = error.message;
            //     console.log(errorCode+" : "+errorMessage)
			// });
	};

    const emailPasswordSignIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
			// .then((userCredential) => {
			// 	// Signed in
			// 	const user = userCredential.user;
			// 	console.log(user);
			// })
			// .catch((error) => {
			// 	const errorCode = error.code;
			// 	const errorMessage = error.message;
            //     console.log(errorCode + " : " + errorMessage);
			// });
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
				// toast.success("Successfully logged out");

				localStorage.removeItem("authUser");
				setUser(null);
			})
			.catch((error) => {
				console.error(error);
				// toast.error("Failed to log out");
			});
	};


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
                localStorage.setItem("authUser", currentUser)
                setIsLoading(false);
                setUser(currentUser)
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				const uid = user.uid;
				navigate("/products");
				// ...
			} else {
                setIsLoading(true);
                setUser(null)
				localStorage.removeItem("authUser");
				// User is signed out
				// ...
			}
            console.log("observing", currentUser);

		});
        return () => unsubscribe()
    },[])

    const authInfo = {
		setIsLoading,
		isLoading,
		setIsLoading,
		signInUser,
		handleSignOut,
		emailPasswordSignIn,
		createUser,
		googleSignIn,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);

};

export default AuthProvider;
