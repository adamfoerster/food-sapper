<script>
  import Nav from "../components/Nav.svelte";
  import { onMount } from "svelte";
  import { getFirebase } from "../common/firebase-auth";

  export let segment;

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
  main {
    position: relative;
    height: 100vh;
    max-width: 56em;
    background: var(--pri-gradient);
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .all-screen {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<main>
  {#if user}
    <p>{user.displayName}</p>
    <button on:click={logout}>Logout</button>
    <slot />
  {:else}
    <div class="all-screen">
      <p>Entre usando sua conta do Google.</p>
      <button on:click={login}>Login</button>
    </div>
  {/if}
</main>
{#if user}
  <Nav {segment} />
{/if}
