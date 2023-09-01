import ProdavnicaHeader from "@/components/prodavnicaHeader";
import classes from "../../styles/Prodavnica.module.scss";
import HomeProdavnica from "@/components/prodavnicaMain";
import Footer from "@/components/footer";
import CartContext from "@/components/context/cartContext";
import { useContext, useEffect } from "react";
import Head from "next/head";

export default function Prodavnica() {
  const context = useContext(CartContext);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartNitNis"))) {
      const cartItems = JSON.parse(localStorage.getItem("cartNitNis"));
      context.setCartItems(cartItems.length);
    }
  }, []);

  return (
    <div className={classes.prod}>
      <Head>
        <title>NitNis - Ručno rađena obuća i odeća</title>
      </Head>
      <ProdavnicaHeader
        active="prodavnica"
        background={"default"}
        context={context}
      />
      <HomeProdavnica />
      <Footer />
    </div>
  );
}
