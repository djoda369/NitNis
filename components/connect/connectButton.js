import ConnectPopup from "./connectPopup";
import classes from "./styles.module.scss";
import { useState } from "react";

export default function ConnectButton({
  text,
  transparent,
  padding,
  footer,
  sidebar,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => {
    setIsOpen(true);
  };
  const closePopup = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={openPopup}
        className={`${classes.btn_pop} ${transparent ? classes.dark : ""} ${
          padding ? classes.padding : ""
        } ${footer ? classes.footer : ""} ${
          sidebar ? classes.sidebar_btn : ""
        } `}
      >
        {text}
      </button>
      {isOpen && <ConnectPopup onClose={closePopup} />}
    </>
  );
}
