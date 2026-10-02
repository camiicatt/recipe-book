import type { Recipe, Ingredient } from "$lib/types/recipe";

export function formatIngredient(i: Ingredient): string {
    return [i.amount, i.unit, i.name].filter((part) => part !== "").join(" ");
}

//putting export local storage recipes into a text file 
export function exportRecipes(recipes: Recipe[]): string {
    

    return recipes.map((r) => {
        const ingredients = r.ingredients.map((i) => `- ${formatIngredient(i)}`).join("\n");
        const steps = r.instructions.map((step, n) => `${n + 1}. ${step}`).join("\n");
        return `# ${r.title}\n\n## Ingredients\n${ingredients}\n\n## Instructions\n${steps}`;
    }).join("\n\n---\n\n");
}

export function downloadTextFile(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
