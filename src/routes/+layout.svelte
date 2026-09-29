<script lang="ts">
	import SaveButton from "$lib/components/SaveButton.svelte";
	import Notice from "$lib/components/Notice.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" />
</svelte:head>

<SaveButton />
<Notice />

{@render children()}

<style>
	:global(:root) {
		--ink: #3b2a1a;
		--ink-soft: #7a6247;
		--paper: #f6ecd2;
		--paper-edge: #e3d2a8;
		--accent: #8b3a2b;
		--font-heading: "Playfair Display", Georgia, serif;
		--font-body: "Lora", Georgia, serif;
		--font-hand: "Caveat", "Segoe Script", cursive;

		/* paper grain: tiny SVG noise tiled behind the page colour */
		--grain: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.1  0 0 0 0.09 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
	}

	:global(body) {
		margin: 0;
		min-height: 100vh;
		display: grid;
		place-items: center;        /* centers the book both ways */
		font-family: var(--font-body);
		color: var(--ink);
		/* sage green vertical stripes with a soft vignette toward the edges */
		background:
			radial-gradient(ellipse at center, rgba(255, 255, 255, 0.2) 0%, rgba(30, 55, 30, 0.35) 100%),
			repeating-linear-gradient(90deg, #9cb08a 0 3px, #8ba079 3px 7px, #a9bc97 7px 12px);
		background-attachment: fixed;
	}

	:global(h1, h2, h3) {
		font-family: var(--font-heading);
		color: var(--ink);
		margin-top: 0;
	}

	:global(button) {
		font-family: var(--font-body);
		cursor: pointer;
	}
</style>
