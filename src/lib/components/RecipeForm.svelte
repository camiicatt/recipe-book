<script lang="ts">
    import { tick } from "svelte";
    import { recipeStore } from "$lib/stores/recipes.svelte";
    import { notice } from "$lib/stores/notice.svelte";
    import { UNITS, type Ingredient } from "$lib/types/recipe";

    let title = $state("");
    let ingredientRows = $state<Ingredient[]>([{ amount: "", unit: "cups", name: "" }]);
    let stepsText = $state("1. ");

    function addRow() {
        ingredientRows.push({ amount: "", unit: "cups", name: "" });
    }

    // valid amounts: 2, 1.5, .5, 1/2, 1 1/2
    const AMOUNT_OK = /^(\d+\s+\d+\/\d+|\d+\/\d+|\d*\.?\d+)$/;

    // drops anything that isn't a digit, ".", "/" or space as the user types
    function cleanAmount(row: Ingredient, event: Event) {
        const input = event.currentTarget as HTMLInputElement;
        const cleaned = input.value.replace(/[^0-9./ ]/g, "");
        input.value = cleaned;
        row.amount = cleaned;
    }

    function removeRow(index: number) {
        ingredientRows.splice(index, 1);
        if (ingredientRows.length === 0) addRow();
    }

    // rewrites every line as "1. ...", "2. ...", so the numbers are always in order
    function renumber(text: string): string {
        return text
            .split("\n")
            .map((line, i) => `${i + 1}. ${line.replace(/^\s*\d+\.\s*/, "")}`)
            .join("\n");
    }

    // Enter in the steps box starts the next numbered line
    async function onStepKey(event: KeyboardEvent) {
        if (event.key !== "Enter") return;
        event.preventDefault();

        const box = event.currentTarget as HTMLTextAreaElement;
        const before = stepsText.slice(0, box.selectionStart);
        const after = stepsText.slice(box.selectionEnd);

        stepsText = renumber(before + "\n" + after);

        await tick();   // wait for the textarea to update, then put the cursor after the new number
        const newLine = before.split("\n").length;
        const lines = stepsText.split("\n");
        const cursor = lines.slice(0, newLine).join("\n").length + 1 + `${newLine + 1}. `.length;
        box.setSelectionRange(cursor, cursor);
    }

    function submitForm(event: SubmitEvent) {
        event.preventDefault();

        const badAmount = ingredientRows.find(
            (row) => row.name.trim() !== "" && row.amount.trim() !== "" && !AMOUNT_OK.test(row.amount.trim())
        );
        if (badAmount) {
            notice.show(`"${badAmount.amount}" isn't a valid amount. Use a number like 2, .5, 1/2 or 1 1/2.`);
            return;
        }

        // ignore empty rows
        const ingredients = ingredientRows
            .filter((row) => row.name.trim() !== "")
            .map((row) => ({ amount: row.amount.trim(), unit: row.unit, name: row.name.trim() }));

        // strip the numbers back off so we store plain steps
        const instructions = stepsText
            .split("\n")
            .map((line) => line.replace(/^\s*\d+\.\s*/, "").trim())
            .filter((line) => line !== "");

        if (!title || ingredients.length === 0 || instructions.length === 0) {
            notice.show("Please fill in all fields.");
            return;
        }

        recipeStore.addRecipe({ title, ingredients, instructions });

        title = "";
        ingredientRows = [{ amount: "", unit: "cups", name: "" }];
        stepsText = "1. ";
    }
</script>

<form onsubmit={submitForm}>
    <h2>New Recipe</h2>

    <label>
        Title
        <input type="text" bind:value={title} placeholder="Pancakes" />
    </label>

    <div class="field">
        <span class="field-label">Ingredients</span>
        {#each ingredientRows as row, i}
            <div class="row">
                <input
                    class="amount"
                    type="text"
                    inputmode="decimal"
                    placeholder="2"
                    maxlength="8"
                    value={row.amount}
                    oninput={(e) => cleanAmount(row, e)}
                />
                <select bind:value={row.unit}>
                    {#each UNITS as unit}
                        <option value={unit}>{unit}</option>
                    {/each}
                </select>
                <input class="name" type="text" placeholder="flour" bind:value={row.name} />
                <button type="button" class="small" onclick={() => removeRow(i)} aria-label="Remove ingredient">✕</button>
            </div>
        {/each}
        <button type="button" class="small add" onclick={addRow}>+ Add ingredient</button>
    </div>

    <label>
        Instructions
        <textarea bind:value={stepsText} onkeydown={onStepKey} rows="4"></textarea>
    </label>

    <button type="submit" class="submit">Add Recipe</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
    }
    h2 {
        font-size: 1.9rem;
        text-align: center;
        padding-bottom: 0.5rem;
        border-bottom: 2px double var(--ink-soft);
    }
    label,
    .field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    label,
    .field-label {
        font-family: var(--font-heading);
        font-size: 0.95rem;
        color: var(--ink-soft);
    }
    input,
    select,
    textarea {
        font-family: var(--font-hand);
        font-size: 1.15rem;
        color: var(--ink);
        background: rgba(255, 255, 255, 0.35);
        border: none;
        border-bottom: 1.5px solid var(--ink-soft);
        border-radius: 2px;
        padding: 0.2rem 0.4rem;
        resize: none;
        min-width: 0;
    }
    input:focus,
    select:focus,
    textarea:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.6);
        border-bottom-color: var(--accent);
    }
    .row {
        display: flex;
        gap: 0.35rem;
        align-items: center;
    }
    .amount {
        width: 4rem;
        text-align: center;
    }
    select {
        width: 5.6rem;
        cursor: pointer;
    }

    @supports (appearance: base-select) {
        select,
        select::picker(select) {
            appearance: base-select;
        }
        select::picker-icon {
            color: var(--ink-soft);
            font-size: 0.8rem;
        }
        select::picker(select) {
            background: var(--paper);
            border: 1.5px solid var(--ink-soft);
            border-radius: 4px;
            padding: 0.2rem;
            margin-top: 2px;
            box-shadow: 0 6px 16px rgba(60, 35, 10, 0.35);
        }
        option {
            font-family: var(--font-hand);
            font-size: 1.15rem;
            color: var(--ink);
            padding: 0.15rem 0.6rem;
            border-radius: 3px;
        }
        option:hover,
        option:focus {
            background: rgba(139, 58, 43, 0.15);
            color: var(--accent);
        }
        option:checked {
            font-weight: 700;
            color: var(--accent);
        }
        option::checkmark {
            display: none;
        }
    }
    .name {
        flex: 1;
    }
    .small {
        background: none;
        border: 1.5px solid var(--ink-soft);
        border-radius: 3px;
        color: var(--ink);
        padding: 0.1rem 0.5rem;
        font-size: 0.9rem;
    }
    .small:hover {
        border-color: var(--accent);
        color: var(--accent);
    }
    .add {
        align-self: flex-start;
    }
    .submit {
        align-self: flex-end;
        background: var(--accent);
        color: #fbf3e0;
        border: none;
        border-radius: 3px;
        padding: 0.55rem 1.2rem;
        font-size: 1rem;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.35);
    }
    .submit:hover {
        background: #a04434;
    }
</style>
