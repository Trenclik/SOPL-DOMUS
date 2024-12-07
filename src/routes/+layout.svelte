<script>
  import Pfp from '$lib/Components/Pfp.svelte'; // Adjust the path as needed
  let { data, children } = $props();
</script>

<header>
  <a href="/">Home</a>
  <a href="/Login">Login</a>
  <a href="/Register">Register</a>
  <a href="/2FA">2FA</a>
  <a href="/NewPass">New Pass</a>
  <a href="/ForgotPass">Forgot Password</a>
  <a href="/Profile">Profile</a>
</header>

<main>
  {@render children()}
</main>

<footer>
  <Pfp user={data?.user} />
</footer>

<style>
  header {
    display: flex;
    margin: 0;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
    height: 10vh;
  }
</style>
