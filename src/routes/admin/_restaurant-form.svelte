<script lang="ts">
  export let id = '';
  export let name = '';
  export let address = '';
</script>

<div class="card">
  <form>
    <div class="form-grid">
      <label for="name">Nome</label>
      <input name="name" bind:value={name}/>
      <label for="name">Endereço</label>
      <input name="address" bind:value={address}/>
    </div>
    <div class="action">
      <button class="primary">Salvar</button>
      <button class="black">Limpar</button>
    </div>
  </form>
</div>
