"use client";

import { useQuery } from "@tanstack/react-query";

const url = "https://jsonplaceholder.typicode.com/todos";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <article>
      <div className="size-full flex justify-center items-center p-20">
        <ul className="flex flex-col space-y-4">
          {data?.map((p: Todo) => (
            <li key={p.id} className="flex  gap-x-2">
              <h3>{p.title}</h3>
              <h4
                className={`${p.completed ? "text-green-400" : "text-red-400"}`}
              >
                {p.completed ? "Done" : "Not Done"}
              </h4>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default TodoList;
