<script>
	import { goto } from '$app/navigation'; // For navigation redirection
	import { fade } from 'svelte/transition'; // Fade transition for messages
	import { onMount } from 'svelte';

	let registrationSuccess = false;
	let email = '';
	let username = ''; // Bind for the username
	let password = '';
	let confirmPassword = '';
	let notification = '';
	let user = null;
	let loading = true;

	onMount(async () => {
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
	// Function to validate password complexity
	function validatePassword(password) {
		const errors = [];
		if (!/[A-Z]/.test(password)) {
			errors.push('The password must contain at least one uppercase letter.');
		}
		if (!/[0-9]/.test(password)) {
			errors.push('The password must contain at least one number.');
		}
		if (password.length < 8) {
			errors.push('The password must be at least 8 characters long.');
		}
		return errors;
	}

	// Registration handler
	async function register() {
		notification = '';

		// Validate password match
		if (password !== confirmPassword) {
			notification = 'Passwords do not match.';
			return;
		}

		// Validate password complexity
		const passwordErrors = validatePassword(password);
		if (passwordErrors.length > 0) {
			notification = passwordErrors.join(' ');
			return;
		}

		// Prepare form data for submission
		const formData = new FormData();
		formData.append('email', email);
		formData.append('nickname', username);
		formData.append('password', password);

		// Send registration request
		try {
			const response = await fetch('/Register', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.json();
				if (result.success) {
					registrationSuccess = true;
					setTimeout(() => {
						goto('/login'); // Redirect to login after success
					}, 1000);
				} else {
					notification = result.message;
				}
			} else {
				const errorResult = await response.json();
				notification = errorResult.message;
			}
		} catch (error) {
			console.error('Registration failed:', error);
			notification = 'An unexpected error occurred. Please try again.';
		}
	}


	const logout = async () => {
      await fetch('/Logout', { method: 'POST' });
      window.location.href = '/Login';
    };
</script>

<div class="register-container">
	<img src="./logo.png" alt="Logo" />

	{#if user}
	<div class="register-box">
		<p>Already logged in</p>
		<button onclick={logout}>Logout</button>
	</div>
	{:else}
		<div class="register-box">
			<h2>Register</h2>
			{#if notification}
				<div class="error-message" transition:fade>{notification}</div>
			{/if}
			<input type="text" bindvalue={username} placeholder="Username" />
			<input type="email" bindvalue={email} placeholder="Email" />
			<input type="password" bindvalue={password} placeholder="Password" />
			<input type="password" bindvalue={confirmPassword} placeholder="Confirm Password" />
			<button onclick={register}>Register</button>
		</div>
	{/if}
	

	{#if registrationSuccess}
		<div class="success-message" transition:fade>
			Registration successful! Redirecting to login...
		</div>
	{/if}
</div>

<style lang="scss">
.register-container {
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

  .register-box {
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
    .success-message {
      font-size: 0.875rem;
      padding: 0.5rem;
      border-radius: 4px;
      margin-bottom: 15px;

      &.error-message {
        background-color: #f8d7da;
        color: #721c24;
      }

      &.success-message {
        background-color: #d4edda;
        color: #155724;
      }
    }

    input,
    button {
      padding: 12px;
      border-radius: 5px;
      font-size: 14px;
      width: 100%;
      margin: 10px 0;
      box-sizing: border-box;
    }

    input {
      border: 1px solid #ccc;

      &:focus {
        border-color: #4a90e2;
        outline: none;
        box-shadow: 0 0 4px rgba(74, 144, 226, 0.3);
      }
    }

    button {
      background-color: #be4cd8;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #357abd;
      }

      &:active {
        background-color: #2b5e92;
      }
    }
  }

  @media (max-width: 480px) {
    .register-box {
      width: 90%;
      padding: 20px;

      input,
      button {
        font-size: 0.9rem;
      }
    }
  }
}


</style>
