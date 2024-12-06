<script>
    import Input from '$lib/Components/Input.svelte';
    import Button from '$lib/Components/Button.svelte';
  
    let verificationCode = '';
    let verificationCodeError = '';
  
    function validateForm() {
      let isValid = true;
      verificationCodeError = '';
  
      // Validate verification code (should be 6 digits)
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
      }
    }
  </script>
  
  <h1>Dvoufázové ověření</h1>
  <p>Pro pokračování zadejte ověřovací kód, který vám byl zaslán na email.</p>
  
  <form on:submit|preventDefault={handleSubmit}>
    <Input label="Ověřovací kód" type="text" value={verificationCode} onChange={(val) => (verificationCode = val)} />
    {#if verificationCodeError}<p style="color: red;">{verificationCodeError}</p>{/if}
  
    <Button label="Ověřit" type="submit" />
  </form>
  