<script lang="ts">
  import { onMount } from "svelte";
  import { getFirebase } from "../common/firebase-auth";

  let fb;
  let user;
  let db;

  onMount(() => {
    fb = getFirebase();
    fb.user$(u => (user = u));
    fb.db$(d => {
      db = d;
      db.collection("todos")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.data());
          });
        });
    });
  });

  const logout = () => fb.logout();

  const login = () => fb.login();
</script>

<style>
  p {
    text-align: center;
    margin: 0 auto;
  }
  p {
    margin: 1em auto;
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

{#if user}
  <p>{user.displayName}</p>
  <button on:click={logout}>Logout</button>
{:else}
  <button on:click={login}>Login</button>
{/if}
