import { Product } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

type UpdateProductProps = {
  productToUpdate: Product | null;
  setProductToUpdate: React.Dispatch<React.SetStateAction<Product | null>>;
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateProduct = ({
  productToUpdate,
  setProductToUpdate,
  setOpenUpdateModal,
}: UpdateProductProps) => {
  const queryClient = useQueryClient();

  //! mutation function to handle update product
  const updateMutation = useMutation({
    mutationFn: (updatedProduct: Product) =>
      axios.put(
        `http://localhost:3001/products/${updatedProduct.id}`,
        updatedProduct
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  //! handle change function
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
    setProductToUpdate((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //! Submit data function
  const submitData = async () => {
    if (!productToUpdate) return;
    updateMutation.mutate(productToUpdate);
    setOpenUpdateModal(false);
  };

  return (
    <>
      <div className="m-2 p-2 w-[740px] bg-gray-100  text-black mb-20">
        <h2 className="text-2xl my-2 text-black">Update Product</h2>
        {updateMutation.isSuccess && <p>Product Added!</p>}
        <form className="flex flex-col text-black" onSubmit={submitData}>
          <input
            type="text"
            value={productToUpdate?.title}
            name="title"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product title"
          />
          <textarea
            value={productToUpdate?.description}
            name="description"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product description"
          />

          <input
            type="number"
            value={productToUpdate?.price}
            name="price"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product price"
          />
          <input
            type="text"
            value={productToUpdate?.thumbnail}
            name="thumbnail"
            onChange={handleChange}
            className="my-2 border p-2 rounded"
            placeholder="Enter a product thumbnail URL"
          />
          <div className="flex gap-x-2">
            <button
              type="submit"
              className="bg-black m-auto text-white text-xl p-1 rounded-md"
            >
              Update
            </button>
            <button
              className="bg-red-400 m-auto text-white text-xl p-1 rounded-md"
              onClick={() => setOpenUpdateModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
