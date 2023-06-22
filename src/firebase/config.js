import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1qlWO9Tki0nQpFldTWTGVBpMWmfoeXcY",
  authDomain: "webhealth-ca666.firebaseapp.com",
  projectId: "webhealth-ca666",
  storageBucket: "webhealth-ca666.appspot.com",
  messagingSenderId: "560401016787",
  appId: "1:560401016787:web:a1f4559d5eca0361ca7126",
  measurementId: "G-835WVKW4VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);