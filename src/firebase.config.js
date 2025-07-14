import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey:'AIzaSyBChA_66nVdjGCkrFmkUKwBEzY41pqrXMY',
  authDomain:'todo-5ba9c.firebaseapp.com',
  projectId:'todo-5ba9c',
  storageBucket:'todo-5ba9c.firebasestorage.app',
  messagingSenderId:'461366767571',
  appId:'1:461366767571:web:68521477f6e9b2eb6d0926'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, deleteDoc, updateDoc, doc };
