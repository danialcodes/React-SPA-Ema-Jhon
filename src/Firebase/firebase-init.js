import firebaseConfig from "./firebase-config";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const initializeAuthentication = () =>{
    
    // const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    initializeApp(firebaseConfig);

}

export default initializeAuthentication;