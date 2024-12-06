<script>
  import Input from '$lib/Components/Input.svelte';
  import Button from '$lib/Components/Button.svelte';

  let newPassword = '';
  let confirmPassword = '';
  let passwordError = '';

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

  function handleSubmit() {
    if (validateForm()) {
      console.log('Nové heslo:', newPassword);
      alert('Heslo bylo změněno!');
      // Přesměrování na přihlášení
      // goto('/login');  // Nezapomeň na přesměrování, až to bude fungovat
    }
  }
</script>

<div class="login-container">
  <div class="login-box">
    <h2>Zadejte nové heslo</h2>
    <p>Pro dokončení změny hesla zadejte nové heslo a potvrďte ho.</p>

    <form on:submit|preventDefault={handleSubmit}>
      <!-- Použití Input komponenty pro pole hesla -->
      <Input label="Nové heslo" type="password" placeholder="Zadejte nové heslo" value={newPassword} on:input={(e) => (newPassword = e.target.value)} />
      
      <Input label="Potvrďte heslo" type="password" placeholder="Potvrďte nové heslo" value={confirmPassword} on:input={(e) => (confirmPassword = e.target.value)} />

      {#if passwordError}<p class="error-message">{passwordError}</p>{/if}

      <Button label="Změnit heslo" type="submit" />
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
