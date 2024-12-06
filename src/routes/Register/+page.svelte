<script>
  import Input from '$lib/Components/Input.svelte';
  import { writable } from 'svelte/store';

  let username = writable('');
  let email = writable('');
  let password = writable('');
  let confirmPassword = writable('');
  let errorMessage = writable('');

  $: if ($username.trim() === '' || $email.trim() === '' || $password.trim() === '' || $confirmPassword.trim() === '') {
    errorMessage.set('Všechna pole jsou povinná');
  } else if ($password !== $confirmPassword) {
    errorMessage.set('Hesla se neshodují');
  } else {
    errorMessage.set(''); // Reset chybové zprávy, pokud jsou všechny podmínky splněny
  }

  const handleSubmit = () => {
    if ($errorMessage === '') {
      // Zpracování registrace
      console.log('Uživatelské jméno:', $username);
      console.log('Email:', $email);
      console.log('Heslo:', $password);
    }
  };
</script>

<style lang="scss">
  .register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;

    .register-box {
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

<div class="register-container">
  <div class="register-box">
    <h2>Registrace</h2>
    {#if $errorMessage}
      <div class="error-message">{$errorMessage}</div>
    {/if}
    <Input type="text" bind:value={$username} placeholder="Uživatelské jméno" />
    <Input type="email" bind:value={$email} placeholder="Email" />
    <Input type="password" bind:value={$password} placeholder="Heslo" />
    <Input type="password" bind:value={$confirmPassword} placeholder="Potvrďte heslo" />
    <button on:click={handleSubmit}>Registrovat</button>
  </div>
</div>
