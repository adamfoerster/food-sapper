import { firebaseConfig } from "../env";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { showErrorMessage } from "./common";
import { writable, get } from "svelte/store";

let globalStore: any = null;

export const getFirebase = () => {
  if (!globalStore) {
    globalStore = createStore();
  }
  return globalStore;
};

const createStore = () => {
  let env;
  const user = writable(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null
  );
  firebase.initializeApp(firebaseConfig);
  checkRedirectResult();
  const inner_db = firebase.firestore();
  const db = writable(inner_db);

  return {
    user$: user.subscribe,
    db$: db.subscribe,

    setDB: (createdDB: any) => db.set(createdDB),
    setUser: (createdUser: any) => user.set(createdUser),
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("credential");
      firebase.auth().signOut();
      user.set(null);
    },
    login: () => {
      console.log("logging in");
      user.set({ displayName: "Carregando..." });
      localStorage.setItem(
        "user",
        JSON.stringify({ displayName: "Carregando..." })
      );
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(result => {})
        .catch(error => {
          showErrorMessage(error.message, error.code);
        });
    }
  };
};

const checkRedirectResult = () => {
  firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      if (result.credential) {
        const user = result.user as firebase.auth.UserMetadata;
        const credential = result.credential as firebase.auth.OAuthCredential;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("credential", JSON.stringify(credential));
        globalStore.setUser(user);
      }
    })
    .catch(error => {
      showErrorMessage(error.message, error.code);
      localStorage.removeItem("user");
      localStorage.removeItem("credential");
    });
};

export const login = () => {};
