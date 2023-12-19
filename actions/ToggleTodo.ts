"use server";

import supabase from "~/supabase/server";
import { Tables } from "~/supabase/types";

export async function toggleTodo(todo: Tables<"todos">) {
  return supabase
    .from("todos")
    .update({ is_complete: !todo.is_complete })
    .eq("id", todo.id);
}
