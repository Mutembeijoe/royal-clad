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

export const createUserProfileDocument = async (userAuth, additionalInfo) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`/users/${userAuth.uid}`)
    const userSnapShot = await userRef.get()

    if (!userSnapShot.exists){
        const {displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }catch(error){
            console.log('error creating user', error.message)
        }
    }
    return userRef;
}

export const createCollectionAndDocuments = async (collectionKey, collectionItems) =>{
    const collectionRef = firestore.collection(collectionKey)
    
    const batch = firestore.batch()

    collectionItems.forEach(obj => {
        const docRef = collectionRef.doc()
        batch.set(docRef, obj)
    })

   return await batch.commit()
}

export const convertCollectSnapshotToMap = (collections)=>{
    const transformedColletion = collections.docs.map(doc=> {
        const {title, items} = doc.data()

        return {
            routeName:encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items,
        }
    })

    return transformedColletion.reduce((accumulator, collection) => {
       accumulator[collection.title.toLowerCase()] = collection
       return accumulator;
    }, {})
}

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt:'select_account'});

export const signInwithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


