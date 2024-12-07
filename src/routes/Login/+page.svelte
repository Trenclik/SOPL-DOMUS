<script>
	import { onMount } from 'svelte';

	let email = $state('');
	let password = $state('');
	let nickname = $state('');
	let rememberMe = $state(false);
	let notification = $state('');
	let loginSuccess = $state(false);
	let errorMessage = $state('');
	let user = $state(null);
	let loading = $state(true);

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		notification = '';
		errorMessage = '';

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
				<div class="notification success">
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
		background: url('background-image.jpg') no-repeat center center;
		background-size: cover;
		font-family: 'Arial', sans-serif;
		box-sizing: border-box;
		padding: 1rem;
	}

	.login-box {
		display: grid;
		gap: 15px;
		background-color: rgba(255, 255, 255, 0.9); /* Lehce průhledné pozadí */
		padding: 25px;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 400px;
		min-width: 280px;
		position: relative;
		text-align: center;
		box-sizing: border-box;
	}

	.back-arrow {
		position: absolute;
		top: 10px;
		left: 10px;
		width: 32px;
		height: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
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
		font-size: 1.5rem;
		color: #333;
	}

	.error-message,
	.notification {
		font-size: 0.875rem;
		padding: 0.5rem;
		border-radius: 4px;
	}

	.error-message {
		background-color: #f8d7da;
		color: #721c24;
	}

	.notification {
		background-color: #d4edda;
		color: #155724;
	}

	input {
		padding: 12px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 14px;
		width: calc(100% - 40px);
		max-width: 250px;
		box-sizing: border-box;
		margin: 10px auto;
	}

	button {
		background-color: #4a90e2;
		color: white;
		border: none;
		padding: 12px 20px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
		margin-top: 10px;
		transition: background-color 0.3s;
		box-sizing: border-box;
		width: 100%;
	}

	button:hover {
		background-color: #357abd;
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

	.form-buttons {
		display: flex;
		gap: 10px;
		justify-content: center;
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
			padding: 10px;
			font-size: 0.9rem;
		}
	}
</style>
