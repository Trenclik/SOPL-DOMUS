<div class="Footer-menu">
    <img class="house" src="./house.svg" alt="">
    <img class="lupa" src="./magnifying-glass.svg" alt="">
    <img class="bublina" src="./speechbubble.svg" alt="">
    <img class="bublina-clovek" src="./buble-person.svg" alt="">
</div>

<style lang="scss">
    .Footer-menu {
        display: flex; /* Flexbox pro zobrazení obrázků vedle sebe */
        gap: 40px; /* Mezera mezi obrázky */
        justify-content: center; /* Srovnání obrázků do středu */
        padding: 10px; /* Mezera kolem celého containeru */
        img {
            width: 35px;
            height: 35px;
            object-fit: contain; /* Udržuje obrázek v proporcích a nezkresluje jej */
        }
    }
</style>
