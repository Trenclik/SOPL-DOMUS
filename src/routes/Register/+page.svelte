<script>
  import Input from '$lib/Components/Input.svelte';
  import Button from '$lib/Components/Button.svelte';

  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';

  let usernameError = '';
  let emailError = '';
  let passwordError = '';
  let confirmPasswordError = '';

  function validateForm() {
    let isValid = true;

    // Reset errors
    usernameError = '';
    emailError = '';
    passwordError = '';
    confirmPasswordError = '';

    // Validate username (min 3 characters)
    if (username.length < 3) {
      usernameError = 'Uživatelské jméno musí mít alespoň 3 znaky.';
      isValid = false;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      emailError = 'Zadejte platný email.';
      isValid = false;
    }

    // Validate password (min 8 characters, at least one uppercase letter, and a number)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
    if (password.length < 8) {
      passwordError = 'Heslo musí mít alespoň 8 znaků.';
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      passwordError = 'Heslo musí obsahovat alespoň jedno velké písmeno a číslo.';
      isValid = false;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      confirmPasswordError = 'Hesla se neshodují.';
      isValid = false;
    }

    return isValid;
  }

  function handleSubmit() {
    if (validateForm()) {
      console.log('Uživatelské jméno:', username);
      console.log('Email:', email);
      console.log('Heslo:', password);
      alert('Registrace proběhla úspěšně!');
    }
  }
</script>

<h1>Registrace</h1>
<form on:submit|preventDefault={handleSubmit}>
  <!-- Použití Input komponenty pro každé pole -->
  <Input label="Uživatelské jméno" type="text" placeholder="Zadejte uživatelské jméno" value={username} on:input={(e) => (username = e.target.value)} />
  {#if usernameError}<p style="color: red;">{usernameError}</p>{/if}

  <Input label="Email" type="email" placeholder="Zadejte email" value={email} on:input={(e) => (email = e.target.value)} />
  {#if emailError}<p style="color: red;">{emailError}</p>{/if}

  <Input label="Heslo" type="password" placeholder="Zadejte heslo" value={password} on:input={(e) => (password = e.target.value)} />
  {#if passwordError}<p style="color: red;">{passwordError}</p>{/if}

  <Input label="Potvrďte heslo" type="password" placeholder="Potvrďte nové heslo" value={confirmPassword} on:input={(e) => (confirmPassword = e.target.value)} />
  {#if confirmPasswordError}<p style="color: red;">{confirmPasswordError}</p>{/if}

  <Button label="Registrovat" type="submit" />
</form>
