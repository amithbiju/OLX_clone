import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFY_uuPK7IgmS83JaawswL6hw-Tb5iqcw",
  authDomain: "fir-14437.firebaseapp.com",
  projectId: "fir-14437",
  storageBucket: "fir-14437.appspot.com",
  messagingSenderId: "757681082698",
  appId: "1:757681082698:web:cb224ed5b0bcf3aa2db1b3",
  measurementId: "G-5ZMVCQQ3Q4"
};

export const Firebase = initializeApp(firebaseConfig)
