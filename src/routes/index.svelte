<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { firebaseConfig } from "../env";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  // import 'firebase/performance';
  // import 'firebase/analytics';

  import Counter from "../components/Counter.svelte";

  const count = writable(100);

  onMount(() => {
    console.log("App mounted");
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();

    db.collection("todos")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
        });
      });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        console.log('result', result);
        console.log(result);
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        } else {
          login();
        }
        // The signed-in user info.
        var user = result.user;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  });

  const login = () => {
    console.log('logging in')
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(function(result) {
        console.log("result", result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        // ...
      })
      .catch(function(error) {
        console.log("error", error);
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
</script>

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
  <img alt="Borat" src="great-success.png" />
  <figcaption>HIGH FIVE!</figcaption>
</figure>

<p>
  <strong>
    Try editing this file (src/routes/index.svelte) to test live reloading.
  </strong>
</p>

<p>
  <Counter />
  <Counter value={1}>Counter 1</Counter>
  <Counter value={$count} step={3}>Counter 2</Counter>
</p>
