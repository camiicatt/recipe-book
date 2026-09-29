<script lang="ts">
    import type { Recipe } from "$lib/types/recipe";
    import { recipeStore } from "$lib/stores/recipes.svelte";
    import { formatIngredient } from "$lib/utils/exportRecipes";

    let { recipe }: { recipe: Recipe } = $props();
</script>

<h2>{recipe.title}</h2>

<h3>Ingredients</h3>
<ul>
    {#each recipe.ingredients as item}
        <li>{formatIngredient(item)}</li>
    {/each}
</ul>

<h3>Instructions</h3>
<ol>
    {#each recipe.instructions as step}
        <li>{step}</li>
    {/each}
</ol>

<button onclick={() => (recipeStore.selectedId = null)}>+ New recipe</button>
<button onclick={() => recipeStore.removeRecipe(recipe.id)}>Delete</button>

<style>
    h2 {
        font-size: 1.9rem;
        text-align: center;
        padding-bottom: 0.5rem;
        border-bottom: 2px double var(--ink-soft);
    }
    h3 {
        font-size: 1.1rem;
        color: var(--accent);
        margin-bottom: 0.25rem;
    }
    ul {
        margin: 0;
        padding-left: 1.2rem;
        font-family: var(--font-hand);
        font-size: 1.4rem;
        line-height: 1.5;
    }
    ol {
        margin: 0;
        padding-left: 1.4rem;
        line-height: 1.6;
    }
    ol li {
        padding-left: 0.3rem;
        margin-bottom: 0.3rem;
    }
    button {
        margin-top: 1rem;
        margin-right: 0.5rem;
        background: none;
        border: 1.5px solid var(--ink-soft);
        border-radius: 3px;
        padding: 0.4rem 0.9rem;
        color: var(--ink);
    }
    button:hover {
        border-color: var(--accent);
        color: var(--accent);
    }
</style>