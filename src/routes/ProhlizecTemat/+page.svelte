<script>
    import Card from "$lib/Components/Card.svelte";
    import { page } from '$app/stores';
    let tema = $state([]);
    let loading = $state(true);
    let errorMessage = $state('');
  
    // Fetch theme data from the server
    $effect(async () => {
        try {
            const response = await fetch('/ProhlizecTemat', { method: 'GET' });
  
            if (response.ok) {
                tema = await response.json();
            } else {
                errorMessage = 'Failed to load themes.';
            }
        } catch (error) {
            errorMessage = 'Error fetching theme data.';
        } finally {
            loading = false;
        }
    });
  </script>
  
  <section id="card_container">
    {#if loading}
      <p>Loading...</p>
    {:else if errorMessage}
      <p>{errorMessage}</p>
    {:else}
      {#each tema as t}
        <Card nadpis={t.name} obsah={t.content} />
      {/each}
    {/if}
  </section>
  
  <style>
    #card_container {
      display: grid;
      justify-items: center;
      gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  </style>
  