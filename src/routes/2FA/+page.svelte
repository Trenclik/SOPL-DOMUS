<script>
  import Button from '$lib/Components/Button.svelte';

  let verificationCode = $state('');
  let verificationCodeError = $state('');

  function validateForm() {
    let isValid = true;
    verificationCodeError = '';

    // Validace ověřovacího kódu (musí mít 6 číslic)
    const codeRegex = /^\d{6}$/;
    if (!codeRegex.test(verificationCode)) {
      verificationCodeError = 'Ověřovací kód musí mít 6 číslic.';
      isValid = false;
    }

    return isValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      console.log('Ověřovací kód:', verificationCode);
      alert('Ověření bylo úspěšné!');
      // Přesměrování na dokončení resetu hesla nebo přihlášení
      // goto('/reset-password'); // Příklad přesměrování na další stránku
    }
  }


</script>

<div class="login-container">
  <img src="./logo.png" alt="Logo" />

  <div class="login-box">
    <h2>Dvoufázové ověření</h2>
    <p>Pro pokračování zadejte ověřovací kód, který vám byl zaslán na email.</p>

    <form onsubmit={handleSubmit}>
      <!-- Použití Input komponenty pro ověřovací kód -->
      <input label="Ověřovací kód" type="text" placeholder="Zadejte kód" value={verificationCode} oninput={(e) => (verificationCode = e.target.value)} />
      
      {#if verificationCodeError}<p class="error-message">{verificationCodeError}</p>{/if}

      <Button label="Ověřit" type="submit" color="purple" />
    </form>
  </div>
</div>

<style lang="scss">
.login-container {
  display: grid;
  place-items: center;
  height: 100vh;
  background-image: url('/src/static/BackGround.svg');
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
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 90%;
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
      background-color: #4A90E2;
      color: #fff;
      border: none;
      padding: 12px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
      transition: background-color 0.3s;
    }
  }
}

@media (min-width: 768px) {
  .login-box {
    width: 400px;
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
    padding: 20px;
  }

  .login-box {
    width: 500px;
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
