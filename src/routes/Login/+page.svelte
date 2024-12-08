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
				<a href="/"><button>Home</button></a>
				<a href="/Register"><button>Register</button></a>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
.login-container {
  display: grid;
  place-items: center;
  height: 100vh;
  background-image: url('/src//static//BackGround.svg'); 
  margin: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
  padding: 0;
  img {
    width: 150px; 
    height: auto;
    margin-bottom: 20px;
    z-index: 1; 
  }

  .login-box {
    display: grid;
    gap: 15px;
    background-color: rgba(255, 255, 255, 0.9); 
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 90%; 
    max-width: 400px;
    min-width: 280px;
    position: relative;
    text-align: center;
    box-sizing: border-box;

    h2 {
      margin-bottom: 20px;
      font-size: 1.5rem;
      color: #333;
    }

    .error-message,
    .notification {
      font-size: 0.875rem;
      padding: 0.5rem;
      border-radius: 4px;

      &.error-message {
        background-color: #f8d7da;
        color: #721c24;
      }

      &.notification {
        background-color: #d4edda;
        color: #155724;
      }
    }

    input {
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
      width: 100%;
      margin: 10px auto;
      box-sizing: border-box;
    }

    button {
      background-color: #be4cd8;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 10px;
      transition: background-color 0.3s;
      width: 100%;
    }

    .form-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      gap: 15px;

      a {
        flex: 1;
        text-decoration: none;
      }

      button {
        width: 100%;
        margin: 0;
        padding: 12px;
        font-size: 16px;
        background-color: #be4cd8;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
    }
  }
}

@media (min-width: 768px) {
  .login-box {
    width: 80%;
    max-width: 500px;
    padding: 30px;
  }

  h2 {
    font-size: 1.8rem; 
  }

  input {
    font-size: 16px; 
    width: calc(100% - 20px);
  }

  button {
    padding: 14px 20px;
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .login-container {
    padding: 20px; 
  }

  .login-box {
    width: 60%; 
    max-width: 600px;
    padding: 40px;
  }

  h2 {
    font-size: 2rem; 
  }

  input {
    font-size: 18px;
  }

  button {
    padding: 16px 24px;
    font-size: 1.1rem;
  }
}

</style>
