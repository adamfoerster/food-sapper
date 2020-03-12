<script lang="ts">
  import RestaurantForm from "./_restaurant-form.svelte";
  import RestaurantCard from "./_restaurant-card.svelte";
  import { onMount } from "svelte";
  import { getRestaurantStore } from "../../restaurants/restaurant.store";
  // import { IRestaurant } from "../../restaurants/restaurant.interfaces";

  let store;
  let restaurants = [];
  let selected = {
    id: null,
    name: "",
    address: "",
    enabled: true,
    company: "bari"
  };

  onMount(async () => {
    store = getRestaurantStore();
    store.restaurants$(r => (restaurants = r));
    await store.listAllRestaurants(0);
    store.selectedRestaurant$(r => {
      if (selected) {
        selected = r;
      }
    });
  });

  const edit = restaurant => store.selectRestaurant(restaurant.detail);
  const toggle = e => console.log(e);
  const remove = e => console.log(e);
</script>

<h1>restaurantes</h1>
<RestaurantForm {...selected} />
{#each restaurants as restaurant}
  <RestaurantCard
    {...restaurant}
    on:edit={edit}
    on:toggleStatus={toggle}
    on:remove={remove} />
{/each}
