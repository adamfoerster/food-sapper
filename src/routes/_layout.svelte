<script>
  import Nav from "../components/Nav.svelte";
  import Snackbar from "../components/Snackbar.svelte";
  import { onMount } from "svelte";
  import { getFirebase } from "../common/firebase-auth";
  import { snackStore } from "../common/common";

  export let segment;

  let fb;
  let user;
  let snackbar;
  let showSnack = false;

  onMount(() => {
    fb = getFirebase();
    fb.user$(u => (user = u));
    const snack = snackStore();
    snack.alert$(alert => {
      snackbar = alert;
      showSnack = true;
      const duration = snackbar && snackbar.duration ? snackbar.duration : 3000;
      setTimeout(() => (showSnack = false), duration);
    });
    // snack.danger$();
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
    padding: 0;
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
  .container {
    box-sizing: border-box;
    height: calc(100vh - 80px);
    padding: 2rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>

<main>
  <div class="container">
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
  </div>
</main>
{#if user}
  <Nav {segment} />
{/if}
{#if showSnack}
  <Snackbar {...snackbar} />
{/if}
