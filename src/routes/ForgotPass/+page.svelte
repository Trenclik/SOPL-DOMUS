<script>
  import Input from '$lib/Components/Input.svelte';
  import Button from '$lib/Components/Button.svelte';

  let email = '';
  let emailError = '';

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

  function handleSubmit() {
    if (validateForm()) {
      console.log('Email:', email);
      alert('Ověřovací kód byl odeslán na email!');
      // Přesměrování na 2FA
      // goto('/2fa');  // Nezapomeň na přesměrování, až to bude fungovat
    }
  }
</script>

<div class="login-container">
  <div class="login-box">
    <h2>Zapomenuté heslo</h2>
    <p>Pro resetování hesla zadejte svůj email.</p>

    <form on:submit|preventDefault={handleSubmit}>
      <!-- Použití Input komponenty pro email -->
      <Input label="Email" type="email" placeholder="Zadejte váš email" value={email} on:input={(e) => (email = e.target.value)} />
      
      {#if emailError}<p class="error-message">{emailError}</p>{/if}

      <Button label="Odeslat kód" type="submit" />
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
