"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Product } from "@/types";

const AddProduct = () => {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  console.log(state);

  const mutation = useMutation({
    mutationFn: (newProduct: Product) =>
      axios.post("http://localhost:3001/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const submitData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData = { ...state, id: crypto.randomUUID().toString() };
    mutation.mutate(newData);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = event.target.name;
    let value: string | number;

    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "number"
    ) {
      value = event.target.valueAsNumber;
    } else {
      value = event.target.value;
    }
    setState({
      ...state,
      [name]: value,
    });
  };

  if (mutation.isPending) {
    return <span>Submitting...</span>;
  }
  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2 text-black">
      <h2 className="text-2xl my-2 text-black">Add a Product</h2>
      {mutation.isSuccess && <p>Product Added!</p>}
      <form className="flex flex-col text-black" onSubmit={submitData}>
        <input
          type="text"
          value={state.title}
          name="title"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product title"
        />
        <textarea
          value={state.description}
          name="description"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product description"
        />

        <input
          type="number"
          value={state.price}
          name="price"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product price"
        />
        <input
          type="text"
          value={state.thumbnail}
          name="thumbnail"
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product thumbnail URL"
        />

        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-1 rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
