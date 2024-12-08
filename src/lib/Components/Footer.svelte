<script>
    let { data, children } = $props();
</script>
<footer>
    <a href="/"><img class="house" src="./house.svg" alt=""></a>
    <a href="/Search"><img class="lupa" src="./magnifying-glass.svg" alt=""></a>
    <a href="/ProhlizecTemat"><img class="bublina" src="./speechbubble.svg" alt=""></a>
    <a href="/Chat"><img class="bublina-clovek" src="./buble-person.svg" alt=""></a>
    {#if data.user}
        <a id="pfp" href="/Profile"><img src={data.user.profileImage} alt=""></a>
    {:else}
        <a id="pfp" href="/Profile"><img src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" alt=""></a>
    {/if}
</footer>

<style lang="scss">
    #pfp{
        object-fit: cover;
        border-radius: 50%;
    }
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
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            

            img{
                height: 100%;
            }
        }

        img {
            height: 80%;
            object-fit: contain; /* Udržuje obrázek v proporcích a nezkresluje jej */
        }
    }
</style>
