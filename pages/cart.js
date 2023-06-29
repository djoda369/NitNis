import NavBar from "@/components/header/Navbar";
import classes from "../styles/cart.module.scss";
import CartCard from "@/components/cartCards";
import { useEffect, useState } from "react";
import CartForm from "@/components/cart/cartForm";
import Footer from "@/components/footer";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Cart() {
  // const cartItems = JSON.parse(localStorage.getItem("cartNitNis"));
  // console.log(cartItems);

  const [price, setPrice] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState();

  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("cartNitNis"));
    if (cartItems === null && cartItems === undefined) {
      localStorage.setItem("cartNitNis");
      cartItems = JSON.parse(localStorage.getItem("cartNitNis"));
    }
    const price = cartItems
      .map((product) => product.price)
      .reduce((partialSum, a) => partialSum + a, 0);
    setPrice(price);

    setIsLoading(false);
    setItems(cartItems);
  }, []);

  if (isLoading === false) {
    const showCart = price === 0 ? false : true;

    return (
      <>
        <div className={classes.nav}>
          <NavBar transparent={true} />
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
      </>
    );
  } else {
    return <div>Loading</div>;
  }
}
