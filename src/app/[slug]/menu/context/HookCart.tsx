import { useContext } from "react";

import { CartContext } from "./Cart";

export const HookCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("fora de escopo");
  }

  return context;
};
