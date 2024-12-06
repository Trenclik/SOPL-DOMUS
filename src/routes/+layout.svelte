<script>
    let { children } = $props();
</script>

<header>
    <a href="/Login">Login</a>
    <a href="/Register">Register</a>
    <a href="/2FA">2</a>
    <a href="/NewPass">New Pass</a>
    <a href="/ForgotPass">Zapomenuté</a>
</header>

<main>
    {@render children()}
</main>
