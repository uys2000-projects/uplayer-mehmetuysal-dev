import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { app } from "./app";

export const db = getFirestore(app);

export const getDocument = (col: string, document: string) => {
  const docRef = doc(db, col, document);
  return getDoc(docRef);
};

export const setDocument = (col: string, document: string, data: object) => {
  const docRef = doc(db, col, document);
  return setDoc(docRef, data);
};

export const addDocument = (col: string, data: object) => {
  const colRef = collection(db, col);
  return addDoc(colRef, data);
};

export const increaseDocument = (
  col: string,
  document: string,
  column: string
) => {
  const docRef = doc(db, col, document);
  let data: Record<string, any> = {};
  data[column] = increment(1);
  return updateDoc(docRef, data);
};

export const updateDocument = (col: string, document: string, data: object) => {
  const docRef = doc(db, col, document);
  return updateDoc(docRef, data);
};

export const deleteDocument = (col: string, document: string) => {
  const docRef = doc(db, col, document);
  return deleteDoc(docRef);
};
