<script lang="ts">
  import { onMount } from "svelte";
  import { getRestaurantStore } from "../../restaurants/restaurant.store";
  import { snackStore } from "../../common/common";

  export let id = "";
  export let name = "";
  export let address = "";
  let store;
  let snack;

  onMount(() => {
    store = getRestaurantStore();
    snack = snackStore();
  });

  const save = async () => {
    if (!id) {
      await store.addRestaurant({
        name,
        address
      });
      snack.setAlert({ text: `Restaurante ${name} criado` });
      store.listAllRestaurants();
      reset();
    } else {
      await store.editRestaurant({ id, name, address });
      snack.setAlert({ text: `Restaurante ${name} salvo` });
      store.listAllRestaurants();
      reset();
    }
  };

  const reset = () => {
    id = null;
    name = null;
    address = null;
  };
</script>

<div class="card">
  <form on:submit|preventDefault={save}>
    <div class="form-grid">
      <label for="name">Nome</label>
      <input name="name" bind:value={name} />
      <label for="name">Endereço</label>
      <input name="address" bind:value={address} />
    </div>
    <div class="action">
      <button class="primary" type="submit">Salvar</button>
      <button class="black" type="reset" on:click|preventDefault={reset}>
        Limpar
      </button>
    </div>
  </form>
</div>
