import firebase from "firebase/app";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyC1bCSMZMv9nlCo_cRLIldBzTyiqC2ZhYM",
  authDomain: "dingtoi.firebaseapp.com",
  databaseURL: "https://dingtoi.firebaseio.com",
  projectId: "dingtoi",
  storageBucket: "dingtoi.appspot.com",
  messagingSenderId: "83364997846",
  appId: "1:83364997846:web:e04ac30ea3323fe4a5b777",
  measurementId: "G-X3V1VKTN0W"
}

const app = firebase.initializeApp(config);

export const baseDB = app.firestore();

export const addProposalFirebase = ({ receiver_id, proposal_id, status }) => {
  return new Promise((resolve, reject) => {
    baseDB.collection('users')
      .doc(receiver_id)
      .collection('proposals')
      .add({
        type: 'sale',
        id: proposal_id,
        status,
        condition: 'unread',
        date: new Date()
      })
      .then(() => resolve())
      .catch((error) => {
        reject();
        console.error("Error adding document: ", error);
      });
  });
}

export const deleteProposalFirebase = ({ receiver_id, proposal_id }) => {
  return new Promise((resolve, reject) => {
    baseDB.collection('users')
      .doc(receiver_id)
      .collection('proposals')
      .where('id', '==', proposal_id)
      .get()
      .then(snapshot => {
        resolve();
        snapshot.forEach(doc => {
          doc.ref.delete();
        })
      })
      .catch((error) => {
        reject();
        console.error("Error delete document: ", error);
      });
  });
}

export const listProposalFirebase = ({ id }) => {
  return new Promise((resolve, reject) => {
    baseDB.collection('users').doc(id)
      .collection('proposals')
      .orderBy('date', 'desc')
      .get()
      .then((snapshot) => {
        let arr = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data) {
            if (data.status !== 'removed')
              arr.push(data);
          }
        });
        resolve(arr);
      })
      .catch((error) => {
        reject(error);
      })
  });
}

export default firebase;
