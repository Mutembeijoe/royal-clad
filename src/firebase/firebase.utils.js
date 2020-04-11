import firebase from 'firebase/app' 
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'


const config = {
    apiKey: "AIzaSyD-rYsNBuj1gPn7087POLKD21YTrVDp2Kk",
    authDomain: "royal-db-ea5e7.firebaseapp.com",
    databaseURL: "https://royal-db-ea5e7.firebaseio.com",
    projectId: "royal-db-ea5e7",
    storageBucket: "royal-db-ea5e7.appspot.com",
    messagingSenderId: "700374152976",
    appId: "1:700374152976:web:e80b9f80a66d13517a5795",
    measurementId: "G-ZQYSD2Z0KW"
};


firebase.initializeApp(config);
firebase.analytics()

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt:'select_account'});

export const signInwithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


