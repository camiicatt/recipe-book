import { browser } from "$app/environment";
import type { Recipe } from "$lib/types/recipe";

const STORAGE_KEY = "cookbook-recipes";

// guard function to check if a value is a Recipe
function isRecipe(value: unknown): value is Recipe {
    const r = value as Recipe;
    return (
        typeof r === "object" &&
        r !== null &&
        typeof r.id === "number" &&
        typeof r.title === "string" &&
        Array.isArray(r.ingredients) &&
        Array.isArray(r.instructions)
    );
}

export function loadRecipes(): Recipe[] {
    if (!browser) return [];   // localStorage only exists in the browser
    try {
        const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
        return Array.isArray(parsed) ? parsed.filter(isRecipe) : [];
    } catch {
        return [];
    }
}

export function saveRecipes(recipes: Recipe[]): void {
    if (!browser) return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    } catch {
        // storage can be full or blocked (private mode), so just skip saving
    }
}
