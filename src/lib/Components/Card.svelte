<script>
    // Použití $props pro získání vlastností
    let { nadpis = "Nadpis", obsah = "obsah", odkaz = "#", star = "./star_uncolor.svg" } = $props();

    // Funkce pro přepínání stavu hvězdy
    function toggleStar() {
        star = star === "./star_uncolor.svg" 
            ? "./star-color.svg" 
            : "./star_uncolor.svg";
    }
</script>

<section>
    <a href={odkaz}>
        <div id="text">
            <h3>{nadpis}</h3>
            <p>{obsah}</p>
        </div>
    </a>

    <div style="justify-content: flex-end;">
        <button onclick={toggleStar}>
            <img src={star} alt="Star icon">
        </button>
    </div>
</section>

<style lang="scss">
    a{
        width: 90%;
        text-decoration: none;
    }
    section {
        width: 90%;
        display: flex;
        justify-content: space-around;
        background-color: aqua;
        border-radius: 20px;
        padding: 5px;
        div {
            display: flex;
            flex-direction: column;
            button {
                background: none;
                border: none;
                padding: 0;
                cursor: pointer;
                img {
                    height: 30px;
                }
            }
        }
    }
</style>
