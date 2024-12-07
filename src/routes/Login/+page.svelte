<script>
	import { onMount } from 'svelte';

	let email = '';
	let password = $state('');
	let nickname = $state('');
	let rememberMe = $state(false);
	let notification = $state('');
	let loginSuccess = $state(false);
	let errorMessage = $state('');
	let user = $state(null);
	let loading = true;

	$effect(async () => {
      try {
        const response = await fetch('/Profile', { method: 'GET' });
  
        if (response.ok) {
          user = await response.json();
        }
      } catch (error) {
        errorMessage = 'Error fetching profile data.';
      } finally {
        loading = false;
      }
    });

	const handleSubmit = async (event) => {
	  event.preventDefault();
	  notification = '';
	  errorMessage = '';
  
	  // Handle the login logic
	  if (!nickname || !password) {
		errorMessage = 'Incorrect Nickname or Password';
	  } else {
		const formData = new FormData();
		formData.append('nickname', nickname);
		formData.append('password', password);
		formData.append('rememberMe', rememberMe ? 'true' : 'false');
  
		const response = await fetch('/Login', {
		  method: 'POST',
		  body: formData,
		});
  
		if (response.ok) {
		  const result = await response.json();
		  if (result.success) {
			loginSuccess = true;
			setTimeout(() => {
			  window.location.href = '/Profile';
			}, 1000);
		  } else if (result.message === 'Please verify your email before logging in.') {
			notification = 'The email has not been verified yet. Please verify it before logging in.';
		  } else {
			notification = result.message;
		  }
		} else {
		  const errorResult = await response.json();
		  notification = errorResult.message;
		}
	  }
	};
  
	const goBack = () => {
	  window.history.back();
	};
	const logout = async () => {
      await fetch('/Logout', { method: 'POST' });
      window.location.href = '/Login';
    };
</script>

<div class="login-container">
	{#if user}
		<div class="login-box">
			<p>Already logged in</p>
			<button onclick={logout}>Logout</button>
		</div>

	{:else}
		<div class="login-box">
			<button class="back-arrow" onclick={goBack} aria-label="Go back">&larr;</button>
			<h2>Login</h2>
			{#if errorMessage}
				<div class="error-message">{errorMessage}</div>
			{/if}
			{#if notification}
				<div class="notification">{notification}</div>
			{/if}
			{#if loginSuccess}
				<div class="notification" style="color: green">
					Login successful! Redirecting to your profile...
				</div>
			{/if}
			<form onsubmit={handleSubmit}>
				<input type="text" bind:value={nickname} placeholder="Nickname" required />
				<input type="password" bind:value={password} placeholder="Password" required />
				<button type="submit">Login</button>
			</form>
			<div class="forgot-password">
				<a href="/ForgotPass">Forgot password?</a>
			</div>
			<div class="form-buttons">
				<button onclick={goBack}>Home</button>
				<button href="/register">Register</button>
			</div>
		</div>
	{/if}
	
</div>

<style>
	.login-container {
	  display: grid;
	  place-items: center;
	  height: 100vh;
	  background-color: white;
	  font-family: 'Arial', sans-serif;
	}
  
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
	}
  
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
	}
  
	.back-arrow:hover {
	  color: #fff;
	  background-color: #4a90e2;
	}
  
	h2 {
	  margin-bottom: 20px;
	  font-size: 22px;
	  color: #333;
	}
  
	.error-message, .notification {
	  font-size: 14px;
	  margin-bottom: 15px;
	  color: #d9534f;
	}
  
	.notification {
	  color: #28a745;
	}
  
	input {
	  padding: 12px;
	  margin: 10px auto;
	  border: 1px solid #ccc;
	  border-radius: 5px;
	  font-size: 14px;
	  width: calc(100% - 40px);
	  max-width: 250px;
	}
  
	input:focus {
	  border-color: #4a90e2;
	  outline: none;
	  box-shadow: 0 0 4px rgba(74, 144, 226, 0.3);
	  background-color: #ffffff;
	}
  
	.forgot-password {
	  margin-top: 10px;
	  font-size: 14px;
	  color: #666;
	}
  
	.forgot-password a {
	  color: #4a90e2;
	  text-decoration: none;
	}
  
	.forgot-password a:hover {
	  text-decoration: underline;
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
	}
  
	button:hover {
	  background-color: #357abd;
	}
  
	button:active {
	  background-color: #2b5e92;
	}
  
	.form-buttons {
	  display: flex;
	  gap: 10px;
	  justify-content: center;
	}
  
	.form-buttons button {
	  background-color: grey;
	}
  
	@media (max-width: 480px) {
	  .login-box {
		width: 90%;
		padding: 20px;
	  }
  
	  input {
		width: calc(100% - 40px);
	  }
  
	  button {
		padding: 10px 20px;
	  }
	}
</style>
