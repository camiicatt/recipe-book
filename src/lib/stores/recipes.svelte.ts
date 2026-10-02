import type { Recipe } from "$lib/types/recipe";
import { loadRecipes, saveRecipes } from "$lib/utils/storage";

class RecipeStore {
    recipes = $state<Recipe[]>(loadRecipes());
    selectedId = $state<number | null>(null);
    // continue numbering after the highest saved id so new recipes never reuse one
    nextId = Math.max(0, ...this.recipes.map((r) => r.id)) + 1;

    selected = $derived(this.recipes.find((r) => r.id === this.selectedId) ?? null);

    addRecipe(recipe: Omit<Recipe, "id">) {
        const newRecipe: Recipe = { ...recipe, id: this.nextId++ };
        this.recipes.push(newRecipe);
        saveRecipes(this.recipes);
    }
    selectRecipe(id: number) {
        this.selectedId = id;
    }

    removeRecipe(id: number) {
        this.recipes = this.recipes.filter((r) => r.id !== id);
        if (this.selectedId === id) {
            this.selectedId = null;
        }
        saveRecipes(this.recipes);
    }
}

export const recipeStore = new RecipeStore();
