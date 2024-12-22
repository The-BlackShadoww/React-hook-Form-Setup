"use client";
import { ProductContext } from "@/contexts";
import { useState } from "react";

type PropsType = {
  productId: number;
  setProductId: React.Dispatch<React.SetStateAction<number>>;
};
const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [productId, setProductId] = useState<number | undefined>(undefined);
  return (
    <ProductContext.Provider value={{ productId, setProductId }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
