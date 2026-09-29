import type { Recipe } from "$lib/types/recipe";

class RecipeStore {
    recipes = $state<Recipe[]>([]);
    selectedId = $state<number | null>(null);
    nextId = 1;

    selected = $derived(this.recipes.find((r) => r.id === this.selectedId) ?? null);

    addRecipe(recipe: Omit<Recipe, "id">) {
        const newRecipe: Recipe = { ...recipe, id: this.nextId++ };
        this.recipes.push(newRecipe);
    }
    selectRecipe(id: number) {
        this.selectedId = id;
    }

    removeRecipe(id: number) {
        this.recipes = this.recipes.filter((r) => r.id !== id);
        if (this.selectedId === id) {
            this.selectedId = null;
        }
    }
}

export const recipeStore = new RecipeStore();