<script lang="ts">
    import RecipeList from "$lib/components/RecipeList.svelte";
    import RecipeForm from "$lib/components/RecipeForm.svelte";
    import { recipeStore } from "$lib/stores/recipes.svelte";
    import RecipeDetail from "$lib/components/RecipeDetail.svelte";
</script>

<div class="book">
    <div class="page left">
        <RecipeList />
    </div>
    <div class="page right">
        {#key recipeStore.selectedId} 
            <div class="sheet">
                {#if recipeStore.selected !== null}
                    <RecipeDetail recipe={recipeStore.selected} />
                {:else}
                    <RecipeForm />
                {/if}
            </div>
        {/key}
    </div>
</div>

<style>
    .book {
        display: flex;
        width: 900px;
        max-width: 95vw;
        height: 600px;
        /* the cover extends 9px more below than above (page edges), so nudge the book up to balance it */
        margin: 1.5rem 0 calc(1.5rem + 9px);
        position: relative;
        isolation: isolate;         /* lets the cover sit behind the pages */
        border-radius: 4px;
        /* stacked page edges along the bottom */
        box-shadow:
            0 3px 0 var(--paper-edge),
            0 6px 0 #d3c093,
            0 9px 0 var(--paper-edge);
    }
    /* leather cover underneath: barely visible on top and sides, thick along the bottom */
    .book::before {
        content: "";
        position: absolute;
        /* 14px of brown on every side; the extra 9px at the bottom is hidden behind the stacked page edges */
        inset: -14px -14px -23px -14px;
        z-index: -1;
        background: linear-gradient(#6b3624, #4d2416);
        border-radius: 6px 6px 12px 12px;
        box-shadow: 0 25px 40px rgba(0, 0, 0, 0.65);
    }
    .page {
        flex: 1;
        padding: 2.25rem 2.5rem;
        overflow-y: auto;
        background-color: var(--paper);
    }
    .left {
        /* shadow curving into the spine on the right edge */
        background-image:
            linear-gradient(to left, rgba(60, 35, 10, 0.28), rgba(60, 35, 10, 0) 9%),
            var(--grain);
        border-right: 1px solid rgba(60, 35, 10, 0.35);
    }
    .right {
        padding: 0;
        perspective: 1500px;
        background-image: var(--grain);
    }
    .sheet {
        min-height: 100%;
        padding: 2.25rem 2.5rem;
        box-sizing: border-box;
        background-color: var(--paper);
        /* shadow curving into the spine on the left edge */
        background-image:
            linear-gradient(to right, rgba(60, 35, 10, 0.28), rgba(60, 35, 10, 0) 9%),
            var(--grain);
        transform-origin: left center;
        animation: turn 0.7s ease-out;
    }
    @keyframes turn {
        from { transform: rotateY(-100deg); box-shadow: -10px 0 30px rgba(0, 0, 0, 0.4); }
        to   { transform: rotateY(0);       box-shadow: none; }
    }
</style>
