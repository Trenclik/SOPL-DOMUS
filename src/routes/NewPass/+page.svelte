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

  const goBack = () => {
    window.history.back();
  };
</script>

<div class="login-container">
  <div class="login-box">
    <button class="back-arrow" onclick={goBack} aria-label="Go back">&larr;</button>
    <h2>Zadejte nové heslo</h2>
    <p>Pro dokončení změny hesla zadejte nové heslo a potvrďte ho.</p>

    <form onsubmit={handleSubmit}>
      <!-- Použití Input komponenty pro pole hesla -->
      <input label="Nové heslo" type="password" placeholder="Zadejte nové heslo" value={newPassword} oninput={(e) => (newPassword = e.target.value)} />
      
      <input label="Potvrďte heslo" type="password" placeholder="Potvrďte nové heslo" value={confirmPassword} oninput={(e) => (confirmPassword = e.target.value)} />

      {#if passwordError}<p class="error-message">{passwordError}</p>{/if}

      <Button label="Změnit heslo" type="submit" />
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
        width: 32px; /* Ensure uniform size */
        height: 32px; /* Maintain square dimensions */
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px; /* Adjust font size for better visibility */
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
