import SizesPopUp from ".";
import classes from "./styles.module.scss";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function SizesBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => {
    setIsOpen(true);
  };
  const closePopup = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button className={classes.btn} onClick={openPopup}>
        Uputstvo za veličine
      </button>
      {isOpen && <SizesPopUp onClose={closePopup} />}
    </>
  );
}
