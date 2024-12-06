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

<h1>Dvoufázové ověření</h1>
<p>Pro pokračování zadejte ověřovací kód, který vám byl zaslán na email.</p>

<form on:submit|preventDefault={handleSubmit}>
  <!-- Použití Input komponenty pro ověřovací kód -->
  <Input label="Ověřovací kód" type="text" placeholder="Zadejte kód" value={verificationCode} on:input={(e) => (verificationCode = e.target.value)} />
  
  {#if verificationCodeError}<p style="color: red;">{verificationCodeError}</p>{/if}

  <Button label="Ověřit" type="submit" />
</form>
