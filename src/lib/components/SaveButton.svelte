<script lang="ts">
    import {recipeStore} from "$lib/stores/recipes.svelte";
    import {exportRecipes, downloadTextFile} from "$lib/utils/exportRecipes";
    import {notice} from "$lib/stores/notice.svelte";

    function save(){
        if(recipeStore.recipes.length === 0){
            notice.show("No recipes to save yet.");
            return;
        }
        downloadTextFile("recipes.txt", exportRecipes(recipeStore.recipes));
    }

</script>

<button class="save-button" onclick={save}>Save Recipes</button>

<style>
    .save-button {
        position: fixed;
        z-index: 100;               /* keeps it in front of the book */
        bottom: 1rem;
        right: 1rem;
        padding: 0.6rem 1.2rem;
        border-radius: 999px;
        border: 1px solid rgba(0, 0, 0, 0.4);
        background: var(--paper);
        color: var(--ink);
        font-family: var(--font-hand);
        font-size: 1.3rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        cursor: pointer;
    }
    .save-button:hover {
        background: #fff6de;
        color: var(--accent);
    }
</style>