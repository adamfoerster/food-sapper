<script lang="ts">
  export let text: string;
  export let title: string = null;
  export let duration: number = 3000;
</script>

<style>
  div {
    box-sizing: border-box;
    background: var(--sec-gradient);
    color: var(--primary);
    /* height: 80px; */
    position: fixed;
    bottom: 3rem;
    width: calc(100% - 4rem);
    padding: 2rem;
    border-radius: 1rem;
    margin: 0 2rem 4rem;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
</style>

<div class="snackbar">
  {#if title}
    <h4>{title}</h4>
  {/if}
  <p>{text}</p>
</div>
