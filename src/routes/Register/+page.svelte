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

	// Go back to the previous page
	function goBack() {
		window.history.back();
	}
	const logout = async () => {
      await fetch('/Logout', { method: 'POST' });
      window.location.href = '/Login';
    };
</script>

<div class="register-container">
	{#if user}
	<div class="register-box">
		<p>Already logged in</p>
		<button onclick={logout}>Logout</button>
	</div>
	{:else}
		<div class="register-box">
			<button class="back-arrow" onclick={goBack} aria-label="Go back">&larr;</button>
			<h2>Register</h2>
			{#if notification}
				<div class="error-message" transition:fade>{notification}</div>
			{/if}
			<input type="text" bind:value={username} placeholder="Username" />
			<input type="email" bind:value={email} placeholder="Email" />
			<input type="password" bind:value={password} placeholder="Password" />
			<input type="password" bind:value={confirmPassword} placeholder="Confirm Password" />
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
        		width: 32px; /* Ensure uniform size */
        		height: 32px; /* Maintain square dimensions */
        		display: flex;
        		justify-content: center;
        		align-items: center;
        		font-size: 20px; /* Adjust font size for better visibility */
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

			.error-message, .success-message {
				font-size: 14px;
				margin-bottom: 15px;
				color: #d9534f;

				&.success-message {
					color: #5cb85c;
				}
			}

			input {
				padding: 12px;
				margin: 10px auto;
				border: 1px solid #ccc;
				border-radius: 5px;
				font-size: 14px;
				width: calc(100% - 40px);

				&:focus {
					border-color: #4a90e2;
					outline: none;
					box-shadow: 0 0 4px rgba(74, 144, 226, 0.3);
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
			width: 90%;
			padding: 20px;
		}
	}
</style>