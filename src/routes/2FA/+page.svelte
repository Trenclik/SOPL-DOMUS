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

  const goBack = () => {
    window.history.back();
  };
</script>

<div class="login-container">
  <div class="login-box">
    <button class="back-arrow" onclick={goBack} aria-label="Go back">&larr;</button>
    <h2>Dvoufázové ověření</h2>
    <p>Pro pokračování zadejte ověřovací kód, který vám byl zaslán na email.</p>

    <form onsubmit={handleSubmit}>
      <!-- Použití Input komponenty pro ověřovací kód -->
      <input label="Ověřovací kód" type="text" placeholder="Zadejte kód" value={verificationCode} oninput={(e) => (verificationCode = e.target.value)} />
      
      {#if verificationCodeError}<p class="error-message">{verificationCodeError}</p>{/if}

      <Button label="Ověřit" type="submit" />
    </form>
  </div>
</div>

<style lang="scss">
  .login-container {
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: white;

    .login-box {
      background-color: #fff;
      padding: 25px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 320px;
      text-align: center;
      display: grid;
      gap: 15px;
      position: relative;

      .back-arrow {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 24px;
        cursor: pointer;
        color: #4a90e2;
        background: none;
        border: none;
        transition: color 0.3s, background-color 0.3s;

        &:hover {
          color: #fff;
          background-color: #4a90e2;
        }
      }

      h2 {
        margin-bottom: 20px;
        font-size: 22px;
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
        width: calc(100% - 40px); /* Odsazení 20px z každé strany */
        max-width: 250px;

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

  @media (max-width: 480px) {
    .login-box {
      width: 90%; // Přizpůsobení menším obrazovkám
      padding: 20px;
    }

    input {
      width: calc(100% - 40px); // Odsazení 20px z každé strany na menších obrazovkách
    }

    button {
      padding: 10px 20px;
    }
  }
</style>
