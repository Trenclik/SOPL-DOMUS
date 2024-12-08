<script>
    import { page } from '$app/stores';
  $: currentPath = $page.url.pathname; // Reactive statement to get the path
  $: currentPage = currentPath.split('/').filter(Boolean).pop() || 'Home';
</script>

<header>
    <p>{currentPage}</p>
    <a href="/#"><img src="./notification.svg" alt=""></a>
</header>

<style lang="scss">
    header{
        position: fixed;
        top: 0;
        width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-right: 2px;
        background-color: rgb(145, 65, 138);
        height: 50px;
        a img{
            height: 30px;
            
        }
    }
    
</style>