import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Reducers
// @TODO
import  notfifyReducer from "./reducers/notifyReducer";
import settingsReducers from "./reducers/settingsReducers";

const firebaseConfig = {
      apiKey: "AIzaSyANtbjkQUiV1NyBNREYco2H9M9xfoHkVp4",
    authDomain: "reactclientpanel-f0008.firebaseapp.com",
    databaseURL: "https://reactclientpanel-f0008.firebaseio.com",
    projectId: "reactclientpanel-f0008",
    storageBucket: "reactclientpanel-f0008.appspot.com",
    messagingSenderId: "827596601750"
  
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
   useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//init firerbase instance
firebase.initializeApp(firebaseConfig);
//init firestore
 const firestore = firebase.firestore();
 //this solved an issue regarding a date API
 firestore.settings({ timestampsInSnapshots: true });

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
   reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
   firestore: firestoreReducer,
   notify: notfifyReducer,
   settings: settingsReducers // <- needed if using firestore

});

//check for settings in localstorage
if(localStorage.getItem('settings')== null){
  //default settings
  const defaultSettings = { disableBalanceOnAdd: true,
     disableBalanceOnEdit: false,
      allowRegistration: false 
    };

    //setLocalStorage
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

//create initalState
const initalState = {settings:JSON.parse(localStorage.getItem('settings'))};

//create store
const store= createStoreWithFirebase(rootReducer, initalState,compose(reactReduxFirebase(firebase),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;