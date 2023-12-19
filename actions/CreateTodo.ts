"use server";

import supabase from "~/supabase/server";

export async function createTodo(title: string) {
  return supabase.from("todos").insert({ title });
}
