<script>
    import { onMount } from 'svelte';
    import Header from '$lib/Components/Header.svelte';
    import Footer from '$lib/Components/Footer.svelte';
  
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
  
<Header/>

    <main>
        <!-- Render inner content (children) passed to this layout -->
        <slot />
    </main>

<Footer/>
  
  <style>

  </style>  
