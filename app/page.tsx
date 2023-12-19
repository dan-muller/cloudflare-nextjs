import supabase from "~/supabase/server";
import Todos from "~/components/Todos";
import NewTodo from "~/components/NewTodo";
import { Suspense } from "react";

export const revalidate = 0;
export const runtime = 'edge';

export default async function Home() {
  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .order("is_complete,created_at");

  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <section className="flex flex-col gap-8">
          <NewTodo />
          {todos?.length ? (
            <Todos initial={todos} />
          ) : (
            <div>Create your first todo...</div>
          )}
        </section>
      </Suspense>
    </main>
  );
}
