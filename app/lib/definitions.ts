export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
}

export interface Recipe {
  id: string;
  user_id: string;
  title: string;
  image?: string;
  description?: string;
  servings?: number;
  prep_time_hours?: number;
  prep_time_minutes?: number;
  cook_time_hours?: number;
  cook_time_minutes?: number;
  created_at?: Date;
  ingredients?: Ingredient[];
  instructions?: Instruction[];
  match_source?: string;
  ingredient_match?: string;
}

export interface Ingredient {
  id?: string;
  recipe_id?: string;
  name: string;
  quantity?: string;
  comment?: string;
  created_at?: Date;
}

export interface Instruction {
  id?: string;
  recipe_id?: string;
  step_number: number;
  instruction: string;
  created_at?: Date;
}

export interface GroceryList {
  id: string;
  user_id: string;
  name: string;
  created_at?: Date;
}

export interface GroceryItem {
  id?: string;
  grocery_list_id?: string;
  name: string;
  quantity?: string;
  checked?: boolean;
  image?: string;
  sort_order?: number;
  comment?: string;
  created_at?: Date;
}
