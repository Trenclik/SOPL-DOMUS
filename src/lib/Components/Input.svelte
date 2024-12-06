<script>
  let {
    label = state(""),
    type = "text",
    placeholder = "",
    value = "",
    onChange = () => {},
  } = $props();

  // Funkce volaná při změně hodnoty
  function handleInput(event) {
    onChange(event.target.value);
  }
</script>

<div class="input-container">
  {#if label}
    <label>{label}</label>
  {/if}
  <input {type} {placeholder} {value} oninput={handleInput} />
</div>

<style>
  .input-container {
    margin-bottom: 1rem;
    box-sizing: border-box;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
</style>
