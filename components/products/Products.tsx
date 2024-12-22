"use client";

import ProductDetails from "@/components/products/ProductDetails";
import ProductsList from "@/components/products/ProductsList";
import React from "react";
import { ProductContext } from "@/contexts";
import { useContext } from "react";

const Products = () => {
  const productContext = useContext(ProductContext);

  let productId;
  if (productContext) {
    productId = productContext.productId;
  }

  return (
    <div className="flex gap-x-4 justify-between">
      <ProductsList />
      <ProductDetails id={productId} />
    </div>
  );
};

export default Products;
