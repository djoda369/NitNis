import NavBar from "@/components/header/Navbar";
import classes from "../styles/cart.module.scss";
import CartCard from "@/components/cartCards";
import { useEffect, useState } from "react";
import CartForm from "@/components/cart/cartForm";
import Footer from "@/components/footer";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartContext from "@/components/context/cartContext";
import { useContext } from "react";
import Head from "next/head";

export default function Cart() {
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState();
  const context = useContext(CartContext);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartNitNis"))) {
      const cartItems = JSON.parse(localStorage.getItem("cartNitNis"));
      const price = cartItems
        .map((product) => product.price)
        .reduce((partialSum, a) => partialSum + a, 0);
      setPrice(price);
      setIsLoading(false);
      setItems(cartItems);
      context.setCartItems(cartItems.length);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading === false) {
    const showCart = price === 0 ? false : true;

    return (
      <div>
        <Head>
          <title>NitNis - Ručno rađena obuća i odeća</title>
        </Head>
        <div className={classes.nav}>
          <NavBar transparent={true} context={context} />
        </div>
        <div className={classes.width}>
          <div className={`${classes.container} ${classes.cart}`}>
            {showCart && (
              <div className={classes.cart__cards}>
                <h1>moja korpa</h1>
                <div className={classes.cart__cards_container}>
                  <div className={classes.cards}>
                    {items.map((card, i) => {
                      return (
                        <div className={classes.border} key={i}>
                          <CartCard
                            card={card}
                            setItem={(value) => setItems(value)}
                            setPrice={(value) =>
                              setPrice((prevState) => prevState - value)
                            }
                            context={context}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className={classes.price}>
                    <p>
                      Ukupno: <span>{price.toLocaleString("en-US")} RSD</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
            {showCart && <CartForm cena={price} />}
            {!showCart && (
              <div className={classes.cart__empty}>
                <MdOutlineShoppingCart />
                <span>Vaša korpa je prazna</span>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
