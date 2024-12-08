<script>
    // Použití $props pro získání vlastností
    let { nadpis = "Nadpis", obsah = "obsah", odkaz = "", star = "/star-uncolor.svg" } = $props();

    // Funkce pro přepínání stavu hvězdy
    function toggleStar() {
        star = star === "/star-uncolor.svg" 
            ? "/star-color.svg" 
            : "/star-uncolor.svg";
    }
</script>

<section>
    <a href={odkaz}>
        <div>
            <h1>{nadpis}</h1>
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
    section {
        display: flex;
        flex-direction: column;
        div {
            display: flex;
            flex-direction: column;
            button{
                background-color: none;

            }
        }
    }
</style>
