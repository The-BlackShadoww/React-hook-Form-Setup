"use client";

import React, { useContext, useState } from "react";
import { Product } from "@/types";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { ProductContext, ProductContextType } from "@/contexts";
import UpdateProduct from "./UpdateProduct";

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

  // const api = `http://localhost:3001/${endpoint}`;
  const api = `http://localhost:3001/${endpoint}?_page=${page}&_per_page=6`;

  const res = await axios.get(api);
  return res.data;
};

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);
  const queryClient = useQueryClient();
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
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
    retry: false,
    // refetchInterval: 1000,
    refetchInterval: false,
    // refetchOnWindowFocus: false,
  });

  //! function to handle update product
  const handleUpdate = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    console.log(id);
    // retrieve the product that needs to be updated
    const { data } = await axios.get(`http://localhost:3001/products/${id}`);
    console.log(data);
    setProductToUpdate(data);
    setOpenUpdateModal(true);
  };

  //! Mutation function to handle delete product
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`http://localhost:3001/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", { page }] });
    },
  });

  //! function to handle delete product
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteMutation.mutate(id);
  };

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
        {products.data &&
          products.data.map((product: Product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-2 p-4 rounded-md border cursor-pointer hover:shadow-md ease-linear transition-all duration-300"
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
              <div className="flex gap-x-4">
                <button
                  onClick={(e) => handleUpdate(e, product.id)}
                  className="p-1 mx-1 bg-blue-600 border cursor-pointer rounded-sm"
                >
                  Update
                </button>
                <button
                  onClick={(e) => handleDelete(e, product.id)}
                  className="p-1 mx-1 bg-red-600 border cursor-pointer rounded-sm"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
      </ul>

      {/* Update Modal */}
      {openUpdateModal && (
        <UpdateProduct
          productToUpdate={productToUpdate}
          setProductToUpdate={setProductToUpdate}
          setOpenUpdateModal={setOpenUpdateModal}
        />
      )}

      <div className="flex text-black mt-8">
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
