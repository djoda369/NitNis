import classes from "./styles.module.scss";
import { RiCloseLine } from "react-icons/ri";

export default function SizesPopUp({ onClose }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.popup} onClick={handleClick}>
        <div className={classes.close} onClick={onClose}>
          <RiCloseLine />
        </div>
        <div className={classes.popup__container}>
          <img src="../../products/mere.jpg" alt="mere" />
          <div className={classes.text}>
            <p>
              *Pored broja koji standardno nosite potrebno je da nam posaljete
              duzinu stopala, obime prstiju i risa. Sve merite krojackim metrom
              i to tako sto stanete i oslonite se na nogu koja Vam je jaca.
            </p>
            <div className={classes.slova}>
              <span>A: Obim najsireg dela u predelu prsta</span>
              <span>B: Obim risa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
