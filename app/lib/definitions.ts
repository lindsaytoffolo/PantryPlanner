// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
// Types for Users Table
export interface User {
  id: string; // UUID
  name: string;
  email: string;
  password: string;
  created_at?: Date; // Timestamp with Time Zone, optional if not provided
}

// Types for Recipes Table
export interface Recipe {
  id: string; // UUID
  user_id: string; // UUID (Foreign Key to users.id)
  title: string;
  image?: string; // Optional field
  description?: string; // Optional field
  servings?: number; // Optional field
  prep_time_hours?: number; // Optional field
  prep_time_minutes?: number; // Optional field
  cook_time_hours?: number; // Optional field
  cook_time_minutes?: number; // Optional field
  created_at?: Date; // Timestamp with Time Zone, optional if not provided
}

// Types for Ingredients Table
export interface Ingredient {
  id: string; // UUID
  recipe_id: string; // UUID (Foreign Key to recipes.id)
  name: string;
  quantity?: string; // Optional field
  modifier?: string; // Optional field
  created_at?: Date; // Timestamp with Time Zone, optional if not provided
}

// Types for Instructions Table
export interface Instruction {
  id: string; // UUID
  recipe_id: string; // UUID (Foreign Key to recipes.id)
  step_number: number;
  instruction: string;
  created_at?: Date; // Timestamp with Time Zone, optional if not provided
}

// Types for Grocery Lists Table
export interface GroceryList {
  id: string; // UUID
  user_id: string; // UUID (Foreign Key to users.id)
  name: string;
  created_at?: Date; // Timestamp with Time Zone, optional if not provided
}

// Types for Grocery Items Table
export interface GroceryItem {
  id?: string; // UUID
  grocery_list_id?: string; // UUID (Foreign Key to grocery_lists.id)
  name: string;
  quantity?: string; // Optional field
  checked?: boolean; // Optional field
  image?: string;
  sort_order?: number;
  comment?: string;
  created_at?: Date; // Timestamp with Time Zone, optional if not provided
}


export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

type InvoiceStatus = 'pending' | 'paid';

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: InvoiceStatus;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: InvoiceStatus;
};
