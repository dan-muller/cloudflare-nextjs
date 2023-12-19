"use server";

import supabase from "~/supabase/server";
import { Tables } from "~/supabase/types";

export async function deleteTodo(todo: Tables<"todos">) {
  return supabase.from("todos").delete({ count: "exact" }).eq("id", todo.id);
}
