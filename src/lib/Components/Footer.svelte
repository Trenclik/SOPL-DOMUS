<script>
    let { data, children } = $props();
</script>
<footer>
    <img class="house" src="./house.svg" alt="">
    <img class="lupa" src="./magnifying-glass.svg" alt="">
    <img class="bublina" src="./speechbubble.svg" alt="">
    <img class="bublina-clovek" src="./buble-person.svg" alt="">
    {#if data.user}
        <a href="/Profile"><img src={data.user.profileImage} alt="User Profile"></a>
    {:else}
        <a href="/Login">Login</a>
    {/if}
</footer>

<style lang="scss">
    footer {
        width: 100vw;
        position: fixed;
        bottom: 0px;
        
        display: flex; /* Flexbox pro zobrazení obrázků vedle sebe */
        justify-content: space-around; /* Srovnání obrázků do středu */
        align-items: center;
        height: 50px;
        background-color: rgb(145, 65, 138);

        a{
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;

            img{
                width: 100%;
                object-fit: cover;
                border-radius: 50%;
            }
        }

        img {
            height: 80%;
            object-fit: contain; /* Udržuje obrázek v proporcích a nezkresluje jej */
        }
    }
</style>
