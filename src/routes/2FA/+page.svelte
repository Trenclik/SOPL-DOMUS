<script>
  import Input from '$lib/Components/Input.svelte';
  import Button from '$lib/Components/Button.svelte';

  let verificationCode = '';
  let verificationCodeError = '';

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

  function handleSubmit() {
    if (validateForm()) {
      console.log('Ověřovací kód:', verificationCode);
      alert('Ověření bylo úspěšné!');
      // Přesměrování na dokončení resetu hesla nebo přihlášení
      // goto('/reset-password'); // Příklad přesměrování na další stránku
    }
  }
</script>

<div class="login-container">
  <div class="login-box">
    <h2>Dvoufázové ověření</h2>
    <p>Pro pokračování zadejte ověřovací kód, který vám byl zaslán na email.</p>

    <form on:submit|preventDefault={handleSubmit}>
      <!-- Použití Input komponenty pro ověřovací kód -->
      <Input label="Ověřovací kód" type="text" placeholder="Zadejte kód" value={verificationCode} on:input={(e) => (verificationCode = e.target.value)} />
      
      {#if verificationCodeError}<p class="error-message">{verificationCodeError}</p>{/if}

      <Button label="Ověřit" type="submit" />
    </form>
  </div>
</div>

<style lang="scss">
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;

    .login-box {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 300px;
      text-align: center;

      h2 {
        margin-bottom: 20px;
      }

      .error-message {
        color: red;
        margin-bottom: 10px;
      }

      button {
        background-color: #4A90E2;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin-top: 20px;

        &:hover {
          background-color: #357ABD;
        }
      }
    }
  }
</style>
