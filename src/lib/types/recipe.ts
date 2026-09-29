export const UNITS = ["cups", "tbsp", "tsp", "oz", "lb", "g", "whole"] as const;

export interface Ingredient {
    amount: string;
    unit: string;
    name: string;
}

export interface Recipe {
    id: number;
    title: string;
    ingredients: Ingredient[];
    instructions: string[];
}
