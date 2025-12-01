//로직만 있음
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// 본인의 config 값
const firebaseConfig = {
  apiKey: "AIzaSyAV6OmwCvdrNFSv2Pa5ZO7zOiUJOd8u4sk",
  authDomain: "motiday-3c95c.firebaseapp.com",
  projectId: "motiday-3c95c",
  storageBucket: "motiday-3c95c.firebasestorage.app",
  messagingSenderId: "909984494226",
  appId: "1:909984494226:web:053c63f02575e15803ac4b",
  measurementId: "G-Q3DSZ34QMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// 4. (핵심) 인증 객체(auth)를 만들어서 내보내기!
// 이걸 해줘야 다른 페이지에서 import { auth } from './firebase' 해서 쓸 수 있습니다.
export const auth: Auth = getAuth(app);
//const analytics = getAnalytics(app);