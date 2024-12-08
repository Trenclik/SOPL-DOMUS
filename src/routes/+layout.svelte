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
    top: 50px;
    bottom: 50px;
    background-image: url('/src//static//BackGround.svg');
    min-height: 100vh;
    min-width: 100vw;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-family: 'Arial', sans-serif;
    box-sizing: border-box;
  }
  
</style>
