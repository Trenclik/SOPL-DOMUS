<script>
  import Footer from "$lib/Components/Footer.svelte";
  import Header from "$lib/Components/Header.svelte";
  let { data, children } = $props();
</script>

<Header/>

<main>
  {@render children()}
</main>

<Footer data={data} />

<style>
  main{
    position: relative;
    top: 30px;
    bottom: 50px;
  }
</style>
