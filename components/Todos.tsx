"use client";

import React, { useEffect, useState } from "react";
import { usePGSubscription } from "~/supabase/client";
import { Tables } from "~/supabase/types";
import { toggleTodo } from "~/actions/ToggleTodo";
import { deleteTodo } from "~/actions/DeleteTodo";

const sortTodos = (todos: Tables<"todos">[]) =>
  todos.toSorted(
    (a, b) =>
      Number(a.is_complete) - Number(b.is_complete) ||
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

const Todos: React.FC<{ initial: Tables<"todos">[] }> = ({ initial }) => {
  const [todos, setTodos] = useState(initial);

  useEffect(() => {
    setTodos(initial);
  }, [initial]);

  usePGSubscription<Tables<"todos">>({ table: "todos" }, (payload) => {
    switch (payload.eventType) {
      case "INSERT":
        return setTodos((todos) => sortTodos([...todos, payload.new]));
      case "DELETE":
        return setTodos((todos) =>
          sortTodos(todos.filter((t) => t.id !== payload.old.id)),
        );
      case "UPDATE":
        return setTodos((todos) =>
          sortTodos(
            todos.map((t) => (t.id === payload.new.id ? payload.new : t)),
          ),
        );
    }
  });

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

const Todo: React.FC<{ todo: Tables<"todos"> }> = ({ todo }) => {
  const [checked, setChecked] = useState(!!todo.is_complete);

  useEffect(() => {
    setChecked(!!todo.is_complete);
  }, [todo]);

  return (
    <div className="group flex flex-row gap-2">
      <label className="flex flex-row gap-2 cursor-pointer">
        <input
          id={todo.id.toString()}
          type="checkbox"
          checked={checked}
          onChange={async () => {
            setChecked(!checked);
            await toggleTodo(todo);
          }}
        />
        <span className={checked ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>
      </label>
      <button
        className="text-red-500 invisible group-hover:visible group-hover:opacity-100 group-hover:transition-opacity select-none"
        onClick={async () => {
          await deleteTodo(todo);
        }}
      >
        <pre>x</pre>
      </button>
    </div>
  );
};

export default Todos;
