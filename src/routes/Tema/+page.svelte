<script>
    import { onMount } from 'svelte';
    import Card from "$lib/Components/Card.svelte"; // Import komponenty Card.svelte

    let { nadpis = "Nadpis", obsah = "obsah", star = "./star_uncolor.svg" } = $props();

    function toggleStar() {
        star = star === "./star_uncolor.svg" 
            ? "./star-color.svg" 
            : "./star_uncolor.svg";
    }

    let scrollPercentage = 0;

    // Používáme onMount pro zajištění, že window je dostupné až po nahrání komponenty
    onMount(() => {
        // Funkce pro sledování scrollování
        function updateScrollPercentage() {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            scrollPercentage = (window.scrollY / scrollHeight) * 100;
        }

        window.addEventListener("scroll", updateScrollPercentage);

        return () => {
            window.removeEventListener("scroll", updateScrollPercentage); // Čistíme listener při unmount
        };

        // Funkce pro změnu hodnoty slideru při kolečku myši
        function handleWheel(event) {
            let newValue = scrollPercentage - event.deltaY / 10; // Měníme rychlost scrollování
            if (newValue < 0) newValue = 0;
            if (newValue > 100) newValue = 100;
            scrollPercentage = newValue;
        }

        // Připojíme událost wheel k divu karet
        const cardsContainer = document.querySelector('.cards-container');
        if (cardsContainer) {
            cardsContainer.addEventListener("wheel", handleWheel);
        }

        return () => {
            if (cardsContainer) {
                cardsContainer.removeEventListener("wheel", handleWheel); // Čistíme listener pro wheel
            }
        };
    });
</script>

<section class="tema">
    <div class="header">
        <!-- Šipka -->
        <a href="/ProhlizecTemat" class="arrow" aria-label="Zpět">
            <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Rounded" transform="translate(-580.000000, -3436.000000)">
                        <g id="Navigation" transform="translate(100.000000, 3378.000000)">
                            <g id="-Round-/-Navigation-/-arrow_back" transform="translate(476.000000, 54.000000)">
                                <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                                <path fill="white" d="M19,11 L7.83,11 L12.71,6.12 C13.1,5.73 13.1,5.09 12.71,4.7 C12.32,4.31 11.69,4.31 11.3,4.7 L4.71,11.29 C4.32,11.68 4.32,12.31 4.71,12.7 L11.3,19.29 C11.69,19.68 12.32,19.68 12.71,19.29 C13.1,18.9 13.1,18.27 12.71,17.88 L7.83,13 L19,13 C19.55,13 20,12.55 20,12 C20,11.45 19.55,11 19,11 Z"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </a>

        <!-- Nadpis -->
        <h3>{nadpis}</h3>

        <!-- Hvězda -->
        <div class="star-container">
            <button onclick={toggleStar} aria-label="Přepnout hvězdu">
                <img src={star} alt="Star icon">
            </button>
        </div>
    </div>

    <!-- Popis problému nebo příběhu -->
    <div class="content">
        <p>{obsah}</p>
    </div>

    <!-- Komentáře -->
    <div class="comments">
        <!-- Komentáře budou zde -->
    </div>

    <!-- Karty -->
    <div class="cards-container">
        <Card nadpis="Karta 1" obsah="Popis karty 1" />
        <Card nadpis="Karta 2" obsah="Popis karty 2" />
        <Card nadpis="Karta 3" obsah="Popis karty 3" />
        <Card nadpis="Karta 4" obsah="Popis karty 4" />
        <Card nadpis="Karta 5" obsah="Popis karty 5" />
        <Card nadpis="Karta 6" obsah="Popis karty 6" />
        <Card nadpis="Karta 7" obsah="Popis karty 7" />
    </div>

    <button class="add-button" aria-label="Přidat novou položku">+</button>
</section>



<style lang="scss">
    /* Vlastní Scrollbar */
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    section {
        display: flex;
        flex-direction: column;
        padding: 20px;
        color: white;
        border-radius: 8px;
        max-width: 600px;
        margin: 0 auto;
        background-image: url('./background.jpg'); /* Přidání pozadí */
        background-attachment: fixed; /* Fixní pozadí při scrollování */
        background-size: cover; /* Úplně pokrývá obrazovku */
        background-position: center center;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        position: sticky;
        top: 0;
        z-index: 20; /* Ujistíme se, že header je nad obsahem */
        background-color: transparent; /* Odstraněno černé pozadí */
        padding: 10px 0;  /* Trochu více prostoru kolem */
    }

    .arrow {
        display: inline-block;
        margin-right: 10px;
    }

    h3 {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
        flex-grow: 1;
        text-align: left;
    }

    .content {
        font-size: 16px;
        color: #ecf0f1;
        margin-top: 20px;
    }

    .star-container {
        button {
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;

            img {
                height: 25px;
                transition: transform 0.2s ease-in-out;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }
    }

    .add-button {
        position: fixed;
        bottom: 60px;
        right: 15px;
        background-color: #9000ff;
        color: white;
        font-size: 24px;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
            background-color: #0056b3;
        }
    }

    .slider {
        position: fixed;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        z-index: 20;
    }

    .slider-range {
        writing-mode: bt-lr;
        transform: rotate(270deg);
        width: 200px;
        padding-right: 10px;
    }

    .comments {
        margin-top: 30px;
    }

    .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Karty budou mít minimálně 250px, ale mohou růst až do 1fr */
    gap: 15px;
    margin-top: 20px;
    margin-bottom: 30px;

 /* Výška kontejneru s kartami, aby bylo vidět jen část */
}

.cards-container > * {
    min-height: 200px;  /* Fixní minimální výška pro karty */
    background-color: rgba(255, 255, 255, 0.1); /* Jemné pozadí karet */
    border-radius: 8px;
    padding: 10px;
}


</style>
