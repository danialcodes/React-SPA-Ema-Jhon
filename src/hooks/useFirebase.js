import { useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, GithubAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, getIdToken } from "firebase/auth";
import { useEffect } from "react";
import initializeAuthentication from "../Firebase/firebase-init";
initializeAuthentication();
const useFirebase = () => {

    const auth = getAuth();
    auth.languageCode = 'BD';
    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                getIdToken(user)
                .then(idToken=>localStorage.setItem("idToken",idToken));

                setUser(user);
                // ...
            }
            // else {
            //   setUser({});
            // }
        });
    }, []);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    // const Provider = new GoogleAuthProvider();
    // const googleProvider = new GoogleAuthProvider();

    const setUpRecapta = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recapta-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                alert("Recapta Solved");
                sendOtp();

            }
        }, auth);
    }
    const sendOtp = (e) => {
        e.preventDefault();
        setUpRecapta();
        const phoneNumber = "+88" + prompt("Enter Phone No: ");
        alert(phoneNumber);
        // phoneNumber = "+88"+phoneNumber;
        const appVerifier = window.recaptchaVerifier;

        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                // window.confirmationResult = confirmationResult;
                // alert("OTP Sent");
                const code = prompt("Enter OTP: ");
                submitCode(confirmationResult, code);
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                alert(error.message);
            });

    }
    const submitCode = (confirmationResult, otp) => {
        confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            // const user = result.user;
            // ...
            alert(result);
        }).catch((error) => {
            console.log(error.message);
        });
    }
    // RecaptchaVerifier.render().then((widgetId) => {
    //     window.recaptchaWidgetId = widgetId;
    //   });
    const LogOut = () => {
        signOut(auth).then(() => {
            console.log("Logged Out");
            setUser({});
        }).catch((error) => {
            console.log(error.message);

        });
    }
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
    const signUpWithEmailPass = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // ..
        // });
    }
    const signInWithEmailPass = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user);
            })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        // });
    }
    const signInWithGoogle = () => {
        return [signInWithPopup(auth, googleProvider), setUser]
        // .then(result => {
        //     // const credential = GoogleAuthProvider.credentialFromResult(result);
        //     // const token = credential.accessToken;
        //     // The signed-in user info.
        //     const user = result.user;
        //     setUser(user);
        //     console.log(user.displayName);
        // }).catch((error) => {
        //     // Handle Errors here.
        //     // const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     // const email = error.email;
        //     // // The AuthCredential type that was used.
        //     // const credential = GoogleAuthProvider.credentialFromError(error);
        //     // ...
        // });
    }

    const signInWithGithub = () => {
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                //   const credential = GithubAuthProvider.credentialFromResult(result);
                //   const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                // ...
                console.log(user.displayName);
            })
        // .catch((error) => {
        //     // Handle Errors here.
        //     // const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     // const email = error.email;
        //     // The AuthCredential type that was used.
        //     // const credential = GithubAuthProvider.credentialFromError(error);
        //     // ...
        // });
    }
    return { user, setUser, signInWithGoogle, auth, signInWithGithub, LogOut, signUpWithEmailPass, signInWithEmailPass, setUpRecapta, sendOtp }
}

export default useFirebase;