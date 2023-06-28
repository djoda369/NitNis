import classes from "./styles.module.scss";
import { RiInstagramLine, RiFacebookFill, RiCloseLine } from "react-icons/ri";

export default function ConnectPopup({ onClose }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.popup} onClick={handleClick}>
        <div className={classes.popup__container}>
          <div className={classes.close} onClick={onClose}>
            <RiCloseLine />
          </div>
          <h1>Kontakt</h1>
          <p>Slobodno nas kontaktirajte. Tu smo za Vas.</p>
          <div className={classes.info}>
            <div className={classes.info_box}>
              <img src="../../Connect/Phone.png" alt="" />
              <span>+381 69 1234 567</span>
            </div>
            <div className={classes.info_box}>
              <img src="../../Connect/Mail.png" alt="" />
              <span>office@nitnis.com</span>
            </div>
            <div className={classes.info_box}>
              <img src="../../Connect/Location.png" alt="" />
              <span>Bulevar Nemanjića bb, Niš, Srbija</span>
            </div>
          </div>
          <div className={classes.soc}>
            <span>Društvene Mreže</span>
            <div className={classes.soc__container}>
              <div className={classes.soc__container_box}>
                <a
                  href="https://www.instagram.com/nit_nis/?hl=en"
                  target="blank"
                >
                  <RiInstagramLine />
                </a>
              </div>
              <div className={classes.soc__container_box}>
                <a
                  href="https://www.facebook.com/nitnishandmade/"
                  target="blank"
                >
                  <RiFacebookFill />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
