import classes from "./styles.module.scss";
import Image from "next/image";
import { RiCloseLine } from "react-icons/ri";

export default function CartCard({ card, setItem, setPrice }) {
  const image = card.images[0];
  const price = card.price.toLocaleString("en-US");

  const removeItem = function () {
    const cart = JSON.parse(localStorage.getItem("cartNitNis"));
    const temp = cart.filter((item) => item._id != card._id);
    localStorage.setItem("cartNitNis", JSON.stringify(temp));
    setItem(temp);
    setPrice(card.price);
  };

  return (
    <div className={classes.card}>
      <div className={classes.card__img}>
        <Image
          src={image}
          width={226}
          height={140}
          style={{
            borderRadius: "20px",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          alt={card.description}
        />
      </div>
      <div className={classes.card__info}>
        <div className={classes.prozivod}>
          <span>Proizvod</span>
          <h2>{card.name}</h2>
        </div>
        <div className={classes.sizes}>
          <div className={classes.sizes__title}>
            <div>
              <span>Veličina</span>
              <h2>{card.velicina}</h2>
            </div>
            <div>
              <span>Obim Risa</span>
              <h2>{card.obimRisa} CM</h2>
            </div>
            <div>
              <span>Obim Prstiju</span>
              <h2>{card.obimPrstiju} CM</h2>
            </div>
            <div>
              <span>Dužina Stopala</span>
              <h2>{card.duzinaStopala} CM</h2>
            </div>
          </div>
        </div>
        <div className={classes.price}>
          <span>Cena:</span>
          <h2>{price} RSD</h2>
        </div>
      </div>
      <RiCloseLine onClick={removeItem} />
    </div>
  );
}
