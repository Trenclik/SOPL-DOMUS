<script>
  import Button from '$lib/Components/Button.svelte';


  let email = $state('');
  let emailError = $state('');

  function validateForm() {
    let isValid = true;
    emailError = '';

    // Validace emailu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError = 'Zadejte platnou emailovou adresu.';
      isValid = false;
    }

    return isValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      console.log('Email:', email);
      alert('Ověřovací kód byl odeslán na email!');
      // Přesměrování na 2FA
      // goto('/2fa');  // Nezapomeň na přesměrování, až to bude fungovat
    }
  }


</script>

<div class="login-container">
  <img src="./logo.png" alt="Logo" />

  <div class="login-box">
    <h2>Zapomenuté heslo</h2>
    <p>Pro resetování hesla zadejte svůj email.</p>

    <form onsubmit={handleSubmit}>
      <!-- Použití Input komponenty pro email -->
      <input label="Email" type="email" placeholder="Zadejte váš email" value={email} oninput={(e) => (email = e.target.value)} />
      
      {#if emailError}<p class="error-message">{emailError}</p>{/if}

      <Button label="Odeslat kód" type="submit" color="purple"/>
    </form>
  </div>
</div>

<style lang="scss">
.login-container {
  display: grid;
  place-items: center;
  height: 100vh;
  background-image: url('/src//static//BackGround.svg'); 
  margin: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
  padding: 0;

  img {
    width: 150px; 
    height: auto;
    margin-bottom: 20px;
    z-index: 1; 
  }

  .login-box {
    display: grid;
    gap: 15px;
    background-color: rgba(255, 255, 255, 0.9); 
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 90%; 
    max-width: 400px;
    min-width: 280px;
    position: relative;
    text-align: center;
    box-sizing: border-box;

    h2 {
      margin-bottom: 20px;
      font-size: 20px;
      color: #333;
    }

    .error-message {
      color: #d9534f;
      font-size: 14px;
      margin-bottom: 15px;
    }

    input {
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
      width: 100%;
      margin: 10px auto;
      box-sizing: border-box;

      &:focus {
        border-color: #4a90e2;
        outline: none;
        box-shadow: 0 0 4px rgba(74, 144, 226, 0.3);
        background-color: #ffffff;
      }
    }

    button {
      background-color: #be4cd8;
      color: #fff;
      border: none;
      padding: 12px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #357abd;
      }

      &:active {
        background-color: #2b5e92;
      }
    }
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .login-box {
    width: 80%;
    padding: 25px;
    h2 {
      font-size: 24px;
    }
    input {
      font-size: 16px;
    }
    button {
      font-size: 18px;
      padding: 14px 24px;
    }
  }
}

@media (min-width: 769px) {
  .login-box {
    width: 320px;
    padding: 30px;
    h2 {
      font-size: 26px;
    }
    input {
      font-size: 16px;
    }
    button {
      font-size: 18px;
      padding: 14px 28px;
    }
  }
}

</style>
