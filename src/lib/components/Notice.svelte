<script lang="ts">
    import { fly } from "svelte/transition";
    import { notice } from "$lib/stores/notice.svelte";
</script>

{#if notice.message}
    <div class="notice" role="alert" transition:fly={{ y: -24, duration: 250 }}>
        <span>{notice.message}</span>
        <button onclick={() => notice.hide()} aria-label="Dismiss">✕</button>
    </div>
{/if}

<style>
    .notice {
        position: fixed;
        top: 1.25rem;
        left: 0;
        right: 0;
        margin: 0 auto;              /* centers it without using transform, which the slide-in needs */
        width: fit-content;
        max-width: min(90vw, 28rem);
        z-index: 200;
        display: flex;
        align-items: center;
        gap: 0.9rem;
        padding: 0.7rem 1rem 0.7rem 1.2rem;
        background-color: var(--paper);
        background-image: var(--grain);
        border: 1.5px solid var(--ink-soft);
        border-left: 6px solid var(--accent);    /* like a bookmark ribbon on the note */
        border-radius: 3px;
        box-shadow: 0 8px 20px rgba(30, 20, 5, 0.4);
        font-family: var(--font-hand);
        font-size: 1.35rem;
        color: var(--ink);
    }
    button {
        background: none;
        border: none;
        color: var(--ink-soft);
        font-size: 1rem;
        padding: 0.1rem 0.3rem;
    }
    button:hover {
        color: var(--accent);
    }
</style>
