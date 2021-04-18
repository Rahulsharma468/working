import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebase from "firebase";

const config = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

  // apiKey: "AIzaSyAAJ-67Vk5_sNsVcvs0z1SlB650yvvrMVM",
  // authDomain: "webh-9db65.firebaseapp.com",
  // databaseURL: "https://webh-9db65-default-rtdb.firebaseio.com",
  // projectId: "webh-9db65",
  // storageBucket: "webh-9db65.appspot.com",
  // messagingSenderId: "30936486015",
  // appId: "1:30936486015:web:fff971005d68070729af4a"
  apiKey: "AIzaSyAYH7Pc8ix5B0qQiBwiDuJMUrVKGEb2oYY",
    authDomain: "app1-6ca80.firebaseapp.com",
    projectId: "app1-6ca80",
    storageBucket: "app1-6ca80.appspot.com",
    messagingSenderId: "1032405208135",
    databaseURL: "https://app1-6ca80-default-rtdb.firebaseio.com/",
    appId: "1:1032405208135:web:c479f6f4dc79718ed8b562"
};

app.initializeApp(config);
//const firebaseApp = firebase.initializeApp(config)
const dba = app.firestore();//firebaseApp.firestore();
class Firebase {
  constructor() {
    
    
    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    this.dbs = app.firestore();

    /* Social Sign In Method Provider */
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);


  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  // doSendEmailVerification = () =>
  //   this.auth.currentUser.sendEmailVerification({
  //     url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
  //   });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // // *** Message API ***

  // message = uid => this.db.ref(`messages/${uid}`);

  // messages = () => this.db.ref('messages');
}

export {dba};
export default Firebase;