<script>
    let { nadpis = "Nadpis", obsah = "obsah", odkaz = "#", star = "./star_uncolor.svg" } = $props();

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
            <p id="obsah">{obsah}</p>
        </div>
    </a>

    <div class="star-container">
        <button onclick={toggleStar}>
            <img src={star} alt="Star icon">
        </button>
    </div>
</section>

<style lang="scss">
    a {
        width: 100%;
        text-decoration: none;
    }

    #obsah{
        max-height: 50px;
        overflow: hidden;

    }

    section {
        width: 90%;
        margin: 10px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(240, 240, 240, 0.7);
        border-radius: 15px;
        padding: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        max-height: 107px;

        #text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-right: 20px;
            color: #333;
            width: 100%;  

            h3 {
                margin: 0;
                font-size: 1.2rem;
                font-weight: bold;
                overflow: hidden;
                word-wrap: break-word; 
                overflow-wrap: break-word;
                word-break: break-word;  
                max-height: 40px;
                overflow: hidden;
            }

            p {
                margin: 5px 0;
                font-size: 0.9rem;
                color: #666;
                word-wrap: break-word; 
                overflow-wrap: break-word;
                word-break: break-word;  
            }
        }

        .star-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
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
    }
</style>
