"use client";

import React, { useContext, useState } from "react";
import { Product } from "@/types";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { ProductContext, ProductContextType } from "@/contexts";

//! Define the type of the query key
type QueryKeyType = [string, { page?: number }?];
//! Data fetching function
const retrieveProducts = async (
  context: QueryFunctionContext<QueryKeyType>
) => {
  const { queryKey, pageParam } = context;

  // Destructure queryKey
  const [endpoint, params] = queryKey;
  const page = params?.page ?? pageParam ?? 1;

  // const api = `http://localhost:3001/${queryKey[0]}`;
  const api = `http://localhost:3001/${endpoint}`;

  const res = await axios.get(api);
  return res.data;
};

const ProductsList = () => {
  const [page, setPage] = useState(1);

  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const { setProductId } = context as ProductContextType;
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retrieveProducts,
    retry: false,
    // refetchInterval: 1000,
    refetchInterval: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products &&
          products.map((product: Product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-2 border rounded-sm"
              onClick={() => {
                const id = parseInt(product.id, 10);
                setProductId(id);
              }}
            >
              {/* <Image
                className="object-cover h-64 w-96 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
                width={384}
                height={216}
              /> */}
              <p className="text-xl my-3">{product?.title}</p>
              {/* <p className="text-base my-3">{product?.description}</p> */}
              <p className="text-base my-3">${product?.price}</p>
            </li>
          ))}
      </ul>

      <div className="flex">
        {products?.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            {" "}
            Prev{" "}
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            {" "}
            Next{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
