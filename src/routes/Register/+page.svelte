<script>
  let username = $state('');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let errorMessage = $state('');

  const validateForm = () => {
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      console.log(username);
      console.log(email);
      console.log(password);
      console.log(confirmPassword);
      return 'Všechna pole jsou povinná';
    } else if (password !== confirmPassword) {
      return 'Hesla se neshodují';
    } else {
      return '';
    }
  };

  const handleSubmit = () => {
    errorMessage = validateForm();
    if (errorMessage === '') {
      console.log('Uživatelské jméno:', username);
      console.log('Email:', email);
      console.log('Heslo:', password);
    }
  };

  const goBack = () => {
    window.history.back();
  };
</script>

<div class="register-container">
  <div class="register-box">
    <button class="back-arrow" onclick={goBack} aria-label="Go back">&larr;</button>
    <h2>Registrace</h2>
    {#if errorMessage}
      <div class="error-message">{errorMessage}</div>
    {/if}
    <input type="text" bind:value={username} placeholder="Uživatelské jméno" />
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Heslo" />
    <input type="password" bind:value={confirmPassword} placeholder="Potvrďte heslo" />
    <button onclick={handleSubmit}>Registrovat</button>
  </div>
</div>

<style lang="scss">
  .register-container {
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: white;

    .register-box {
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
        }
      }

      .register-info {
        font-size: 14px;
        margin-top: 10px;
        color: #666;

        a {
          color: #4a90e2;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      button {
        background-color: #4a90e2;
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

  @media (max-width: 480px) {
    .register-box {
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
