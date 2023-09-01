import "@/styles/globals.scss";
import { useState, createContext } from "react";
import CartContext from "@/components/context/cartContext";

export default function App({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState(0);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}
