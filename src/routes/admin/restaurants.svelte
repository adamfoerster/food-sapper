<script lang="ts">
  import RestaurantForm from "./_restaurant-form.svelte";
  import { onMount } from "svelte";
  import { getRestaurantStore } from "../../restaurants/restaurant.store";
  // import { IRestaurant } from "../../restaurants/restaurant.interfaces";

  let restaurants = [];
  onMount(async () => {
    const rs = getRestaurantStore();
    rs.restaurants$(r => (restaurants = r));
    await rs.listAllRestaurants(0);
  });
</script>

<h1>restaurantes</h1>
<RestaurantForm />
<div class="card">
  {#each restaurants as restaurant}
    <p>here {restaurant.name}</p>
  {/each}
</div>
