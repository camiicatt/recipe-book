<script lang="ts">
    import { recipeStore } from "$lib/stores/recipes.svelte";
</script>

<div class="list">
    <h2>Recipes</h2>

    {#each recipeStore.recipes as recipe (recipe.id)}
        <div class="item">
            <button
                class:active={recipeStore.selectedId === recipe.id}
                onclick={() => recipeStore.selectRecipe(recipe.id)}
            >
                {recipe.title}
            </button>
        </div>
    {:else}
        <p class="empty">No recipes yet. Write one on the next page →</p>
    {/each}
</div>

<style>
    h2 {
        font-size: 1.9rem;
        text-align: center;
        padding-bottom: 0.5rem;
        border-bottom: 2px double var(--ink-soft);
    }
    .item {
        border-bottom: 1px dashed rgba(122, 98, 71, 0.5);
    }
    .item button {
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        padding: 0.55rem 0.25rem;
        font-family: var(--font-hand);
        font-size: 1.55rem;
        color: var(--ink);
        transition: padding-left 0.15s, color 0.15s;
    }
    .item button:hover {
        padding-left: 0.9rem;
        color: var(--accent);
    }
    .item button.active {
        color: var(--accent);
        font-weight: 700;
    }
    .empty {
        font-style: italic;
        color: var(--ink-soft);
        text-align: center;
        margin-top: 2rem;
    }
</style>
