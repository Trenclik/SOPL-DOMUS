<script>
    import { goto } from "$app/navigation";
    import { redirect } from "@sveltejs/kit";

    let user = $state(null);
    let loading = $state(true);
    let errorMessage = $state('');
  
    $effect(async () => {
      try {
        const response = await fetch('/Profile', { method: 'GET' });
  
        if (response.ok) {
          user = await response.json();
        } else {
          goto("/Login")
          errorMessage = 'Chyba při načtení profilu';
        }
      } catch (error) {
        errorMessage = 'Chyba při získání dat profilu';
      } finally {
        loading = false;
      }
    });
  
    const logout = async () => {
      await fetch('/Logout', { method: 'POST' });
      window.location.href = '/Login';
    };
  </script>
  
  <div class="profile-container">
    {#if loading}
      <p>Loading...</p>
    {:else if user}
      <h1>Welcome, {user.nickname}</h1>
      <p>Email: {user.email}</p>
      <p>Nickname: {user.nickname}</p>
      <img src={user.profileImage} alt="">
      <button onclick={logout}>Logout</button>
    {:else}
      <p>{errorMessage}</p>
    {/if}
  </div>
  
  <style>
    .profile-container {
      display: grid;
      place-items: center;
      padding: 20px;
      font-family: 'Arial', sans-serif;
    }
  
    h1 {
      color: #ffffff;
    }
  
    p {
      font-size: 16px;
      color: #ffffff;
    }
  
    button {
      background-color: #4a90e2;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 20px;
    }
  
    button:hover {
      background-color: #357abd;
    }
    img{
      max-width: 100%;
    }
  </style>
  