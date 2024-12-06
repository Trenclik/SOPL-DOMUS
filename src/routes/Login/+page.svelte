<script>
	import Input from '$lib/Components/Input.svelte';
	let email = '';
	let password = '';
	let errorMessage = '';
  
	const handleSubmit = () => {
	  if (!email || !password) {
		errorMessage = 'Špatné heslo nebo Uživatelské jméno';
	  } else {
		// Zpracování přihlášení
		console.log('Email:', email);
		console.log('Password:', password);
		errorMessage = ''; // Reset chybové zprávy po úspěšném přihlášení
	  }
	};
  </script>
  
  <div class="login-container">
	<div class="login-box">
	  <h2>Login</h2>
	  {#if errorMessage}
		<div class="error-message">{errorMessage}</div>
	  {/if}
	  <Input type="email" bind:value={email} placeholder="Email" />
	  <Input type="password" bind:value={password} placeholder="Password" />
	  <button on:click={handleSubmit}>Login</button>
	  <div class="forgot-password">
		<a href="/forgot-password">Zapomenuté heslo</a>
	  </div>
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
  
		.forgot-password {
		  margin-top: 10px;
		  font-size: 14px;
  
		  a {
			color: #4A90E2;
			text-decoration: none;
  
			&:hover {
			  text-decoration: underline;
			}
		  }
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