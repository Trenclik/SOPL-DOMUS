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
  
  <h1>Zadejte nové heslo</h1>
  <p>Pro dokončení změny hesla zadejte nové heslo a potvrďte ho.</p>
  
  <form on:submit|preventDefault={handleSubmit}>
    <Input label="Nové heslo" type="password" value={newPassword} onChange={(val) => (newPassword = val)} />
    <Input label="Potvrďte heslo" type="password" value={confirmPassword} onChange={(val) => (confirmPassword = val)} />
    {#if passwordError}<p style="color: red;">{passwordError}</p>{/if}
  
    <Button label="Změnit heslo" type="submit" />
  </form>
  