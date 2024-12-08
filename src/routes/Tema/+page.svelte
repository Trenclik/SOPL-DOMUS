<script>
    let { nadpis = "Nadpis", obsah = "obsah", star = "./star_uncolor.svg" } = $props();

    function toggleStar() {
        star = star === "./star_uncolor.svg" 
            ? "./star-color.svg" 
            : "./star_uncolor.svg";
    }
</script>

<section>
    <div class="header">
        <!-- Šipka -->
        <a href="/ProhlizecTemat" class="arrow">
            <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>arrow_back</title>
                <desc>Created with Sketch.</desc>
                <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Rounded" transform="translate(-580.000000, -3436.000000)">
                        <g id="Navigation" transform="translate(100.000000, 3378.000000)">
                            <g id="-Round-/-Navigation-/-arrow_back" transform="translate(476.000000, 54.000000)">
                                <g>
                                    <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                                    <path fill="white" d="M19,11 L7.83,11 L12.71,6.12 C13.1,5.73 13.1,5.09 12.71,4.7 C12.32,4.31 11.69,4.31 11.3,4.7 L4.71,11.29 C4.32,11.68 4.32,12.31 4.71,12.7 L11.3,19.29 C11.69,19.68 12.32,19.68 12.71,19.29 C13.1,18.9 13.1,18.27 12.71,17.88 L7.83,13 L19,13 C19.55,13 20,12.55 20,12 C20,11.45 19.55,11 19,11 Z" id="🔹-Icon-Color"></path>
                                </g>
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
            <button onclick={toggleStar}>
                <img src={star} alt="Star icon">
            </button>
        </div>
    </div>

    <!-- Popis problému nebo příběhu -->
    <div class="content">
        <p>{obsah}</p>
    </div>

    <div>
        <!-- Komentáře -->
    </div>
    
    <!-- Tlačítko -->
    <button>+</button>
</section>

<style lang="scss">
    section {
        padding: 20px;
        color: white;  /* Text bude bílý */
        border-radius: 8px;
        max-width: 600px;
        margin: 0 auto;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .arrow {
        display: inline-block;
        margin-right: 10px;
    }

    h3 {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
        flex-grow: 1;  /* Zajistí, že nadpis zabere dostupné místo */
        text-align: left;  /* Nadpis bude zarovnán vlevo */
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

    .content p {
        font-size: 16px;
        color: #ecf0f1;  /* Světlejší text pro obsah */
        margin-top: 20px;
    }

    button {
        background-color: #007bff;
        color: white;
        font-size: 18px;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 20px;

        &:hover {
            background-color: #0056b3;
        }
    }
</style>
