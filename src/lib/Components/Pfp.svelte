<script>
  export let user; // User prop passed from layout
</script>

<nav>
  {#if user}
    <div class="profile">
      <a href="/Profile"><img src={user.profileImage} alt="User Profile"></a>
      <p>{user.name}</p>
    </div>
  {:else}
    <p>User is not logged in.</p>
  {/if}
</nav>

<style>
  nav {
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
    flex-direction: row-reverse;
  }

  nav a img {
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
