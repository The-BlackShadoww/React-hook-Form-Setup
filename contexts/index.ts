import { createContext } from "react";

type ProductContextType = {
  productId: number | undefined;
  setProductId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const ProductContext = createContext<ProductContextType | null>(null);

export { ProductContext };
export type { ProductContextType };
