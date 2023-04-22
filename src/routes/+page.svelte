<script>
	import { onMount } from 'svelte';
	import { Registry } from '$lib/auth/Registry';
	import AuthGuard from '$lib/auth/AuthGuard.svelte';

	onMount(() => {
		Registry.auth.checkParams();
	});

	let login = () => {
		Registry.auth.login({ redirectUri: location.href });
	};

	let logout = () => {
		Registry.auth.logout();
	};
</script>


<AuthGuard manual={true}>
	<div slot="authed" let:user>
	<div class="container">
		<div class="text">
			<h1>TASK  MANAGER</h1>
			<p>On this platform, you will be able to effectively keep track of your daily tasks in a simple and intuitive way. 
				With our tool, you will be able to assign responsibilities, set deadlines and track the progress of your tasks.</p>
			<a href="https://youtube.com" class="button">Continue!</a>
		</div>
		<div class="image">
			<img src="image.png" alt="">
	    </div>
		<button on:click={logout}>Logout</button>
	</div>
	</div>
	<button slot="not_authed" on:click={login}>Login</button>
</AuthGuard>
