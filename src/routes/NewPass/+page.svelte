<script>
  import Button from '$lib/Components/Button.svelte';

  let newPassword = $state('');
  let confirmPassword = $state('');
  let passwordError = $state('');

  function validateForm() {
    let isValid = true;
    passwordError = '';

    // Validace hesla
    if (newPassword !== confirmPassword) {
      passwordError = 'Hesla se neshodují.';
      isValid = false;
    }

    if (newPassword.length < 8) {
      passwordError = 'Heslo musí mít alespoň 8 znaků.';
      isValid = false;
    }

    return isValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      console.log('Nové heslo:', newPassword);
      alert('Heslo bylo změněno!');
      // Přesměrování na přihlášení
      // goto('/login');  // Nezapomeň na přesměrování, až to bude fungovat
    }
  }

</script>

<div class="login-container">
  <img src="./logo.png" alt="Logo" />

  <div class="login-box">
    <h2>Zadejte nové heslo</h2>
    <p>Pro dokončení změny hesla zadejte nové heslo a potvrďte ho.</p>

    <form onsubmit={handleSubmit}>
      <!-- Použití Input komponenty pro pole hesla -->
      <input label="Nové heslo" type="password" placeholder="Zadejte nové heslo" value={newPassword} oninput={(e) => (newPassword = e.target.value)} />
      
      <input label="Potvrďte heslo" type="password" placeholder="Potvrďte nové heslo" value={confirmPassword} oninput={(e) => (confirmPassword = e.target.value)} />

      {#if passwordError}<p class="error-message">{passwordError}</p>{/if}

      <Button label="Změnit heslo" type="submit" color= "purple"/>
    </form>
  </div>
</div>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.login-container {
  display: grid;
  place-items: center;
  height: 100vh;
  margin: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
  padding: 0 20px;

  img {
    width: 150px; 
    height: auto;
    margin-bottom: 20px;
    z-index: 1; 
  }

  .login-box {
    background-color: #fff;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 280px;
    text-align: center;
    display: grid;
    gap: 15px;
    position: relative;
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
      margin: 10px auto;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
      width: 90%;

      &:focus {
        border-color: #4a90e2;
        outline: none;
        box-shadow: 0 0 4px rgba(74, 144, 226, 0.3);
        background-color: #ffffff;
      }
    }

    button {
      background-color: #4A90E2;
      color: #fff;
      border: none;
      padding: 12px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #357ABD;
      }

      &:active {
        background-color: #2b5e92;
      }
    }
  }
}

@media (min-width: 768px) {
  .login-box {
    max-width: 360px;
    padding: 30px;
  }

  h2 {
    font-size: 22px;
  }

  input {
    font-size: 16px;
  }

  button {
    font-size: 18px;
    padding: 14px 24px;
  }
}

@media (min-width: 1024px) {
  .login-container {
    padding: 40px;
  }

  .login-box {
    max-width: 480px;
    padding: 40px;
  }

  h2 {
    font-size: 24px;
  }

  input {
    font-size: 18px;
  }

  button {
    padding: 16px 32px;
  }
}


</style>
