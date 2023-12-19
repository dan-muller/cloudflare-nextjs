"use client";

import { useRef } from "react";
import { createTodo } from "~/actions/CreateTodo";

const NewTodo = () => {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      action={async (formData) => {
        const title = formData.get("title")?.toString();
        if (!title) return;
        await createTodo(title);
        ref.current?.reset();
      }}
      className="flex flex-row gap-4"
      ref={ref}
    >
      <input
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        id="title"
        minLength={1}
        name="title"
        placeholder="Create a new Todo"
        required
        type="text"
      />
      <button
        type="submit"
        className="flex w-auto justify-center rounded-md bg-blue-600 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add
      </button>
    </form>
  );
};
export default NewTodo;
