import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth} from "../utilities/Firebase";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
export const AuthContext = createContext(null);


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("authUser");
		return savedUser ? JSON.parse(savedUser) : null;
	});
	const [isLoading, setIsLoading] = useState(true);

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

    const googleSignIn = async (auth) => {
		return await signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential =
					GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential =
					GoogleAuthProvider.credentialFromError(error);
				// ...
			});
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
