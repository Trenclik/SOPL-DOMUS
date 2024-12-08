<script>
    // Get properties using $props() with default values
    let { nadpis = "Nadpis", obsah = "obsah", odkaz = "#", star = "./star_uncolor.svg" } = $props();
  
    // Toggle star state
    function toggleStar() {
      star = star === "./star_uncolor.svg" 
        ? "./star-color.svg" 
        : "./star_uncolor.svg";
    }
  </script>
  
  <section>
    <!-- Link wrapping the card content -->
    <a href={odkaz}>
      <div id="text">
        <h3>{nadpis}</h3>
        <p>{obsah}</p>
      </div>
    </a>
  
    <!-- Star toggle button -->
    <div class="star-button-container">
      <button onclick={toggleStar}>
        <img src={star} alt="Star icon">
      </button>
    </div>
  </section>
  
  <style lang="scss">
    a {
      width: 90%;
      text-decoration: none;
    }
  
    section {
      width: 90%;
      display: flex;
      justify-content: space-between; /* Align content across section */
      background-color: aqua;
      border-radius: 20px;
      padding: 10px;
      align-items: center; /* Vertically center content */
      
      /* Inner div containing text */
      #text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          margin: 0;
          font-size: 1.2rem;
        }
        p {
          margin: 0;
          font-size: 1rem;
        }
      }
  
      /* Container for the star button */
      .star-button-container {
        display: flex;
        justify-content: flex-end; /* Align the button to the right */
        align-items: center;
      }
  
      button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
      }
  
      img {
        height: 30px;
      }
    }
  </style>
  