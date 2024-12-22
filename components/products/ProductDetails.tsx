"use client";

import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

//! Define the type of the query key
type QueryKeyType = [string, number | undefined];
const retrieveProduct = async (obj: QueryFunctionContext<QueryKeyType>) => {
  const api = `http://localhost:3001/${obj.queryKey[0]}/${obj.queryKey[1]}`;
  const res = await axios.get(api);
  return res.data;
};

const ProductDetails = ({ id }: { id: number | undefined }) => {
  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retrieveProduct,
  });

  console.log(product);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="w-1/5">
      <h1 className="text-3xl my-2">Product Details</h1>
      <div className="border bg-gray-100 text-black p-1 text-md rounded flex flex-col">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover h-24 w-24 border rounded-full m-auto"
        />
        <p>{product.title}</p>
        <p>{product.description}</p>
        <p>USD {product.price}</p>
        <p>{product.rating}/5</p>
      </div>
    </div>
  );
};

export default ProductDetails;
