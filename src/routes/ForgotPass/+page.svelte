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
  
  <h1>Zapomenuté heslo</h1>
  <p>Pro resetování hesla zadejte svůj email.</p>
  
  <form on:submit|preventDefault={handleSubmit}>
    <Input label="Email" type="email" value={email} onChange={(val) => (email = val)} />
    {#if emailError}<p style="color: red;">{emailError}</p>{/if}
  
    <Button label="Odeslat kód" type="submit" />
  </form>
  