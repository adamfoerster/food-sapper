<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let id: string;
  export let name: string;
  export let address = "";
  export let enabled = true;
  export let company = "bari";

  const dispatch = createEventDispatcher();

  // const edit = () => console.log("edit", { id, name, address, enabled, company });
  const edit = () => dispatch("edit", { id, name, address, enabled, company });

  const remove = () => dispatch("remove", id);

  const toggleStatus = () => dispatch("toggle", { id, enabled });
</script>

<div class="card">
  <h2>{name}</h2>
  <p>{address}</p>
  <p>Company: {company}</p>
  <div class="action">
    <button class="black" on:click={edit}>Editar</button>
    <button class="black" on:click={toggleStatus}>
      {enabled ? 'Desabilitar' : 'Habilitar'}
    </button>
    <button class="primary" on:click={remove}>Remover</button>
  </div>
</div>
