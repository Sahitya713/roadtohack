import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCTwG6Qbg5pyZzgNHxScAcanCXu9suSPs4",
  authDomain: "roadtohack-899aa.firebaseapp.com",
  projectId: "roadtohack-899aa",
  storageBucket: "roadtohack-899aa.appspot.com",
  messagingSenderId: "712084517405",
  appId: "1:712084517405:web:e08f8dddb464ee19b54cf4",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
export default firebase;
