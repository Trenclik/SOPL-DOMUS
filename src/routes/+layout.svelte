<script>
    import { onMount } from 'svelte';
  
    let user = null;
    let loading = true;
    let errorMessage = '';
  
    onMount(async () => {
        try {
            const response = await fetch('/api/getUserProfile', { method: 'GET' });

            if (response.ok) {
              user = await response.json();
            } else {
              errorMessage = 'Failed to load user profile.';
            }
        } catch (error) {
            errorMessage = 'Error fetching profile data.';
        } finally {
            loading = false;
        }
    });
  
    const logout = async () => {
        await fetch('/Logout', { method: 'POST' });
        window.location.href = '/Login';
    };
</script>
  
    <header>
        <a href="/">Home</a>
        <a href="/Login">Login</a>
        <a href="/Register">Register</a>
        <a href="/2FA">2FA</a>
        <a href="/NewPass">New Pass</a>
        <a href="/ForgotPass">Forgot Password</a>
        <a href="/Profile">Profile</a>
  
        {#if user}
        <img src={user.profileImage} alt="" class="profile-pic" />
        {/if}
    </header>
    <main>
        <!-- Render inner content (children) passed to this layout -->
        <slot />
    </main>


  
  <style>
    header {
      display: flex;
      margin: 0%;
      justify-content: space-between;
      align-items: center;
      background-color: #f1f1f1;
      height: 10vh;
    }
  
    .profile-pic {
      height: 80%;
      margin-right: 1vh;
      border-radius: 50%;
      object-fit: cover;
    }
  </style>  