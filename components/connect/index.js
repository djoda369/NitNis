import Link from "next/link";
import classes from "./styles.module.scss";
import { RiFacebookFill, RiInstagramLine } from "react-icons/ri";

export default function Connect() {
  return (
    <div>
      <div className={`${classes.connect} ${classes.container}`}>
        <div className={classes.connect__img}>
          <img src="../../background/Rectangle_3.png" alt="" />
        </div>
        <div className={classes.connect__details}>
          <h1>Kontakt</h1>
          <p>Slobodno nas kontaktirajte. Tu smo za Vas.</p>
          <div className={classes.connect__details_list}>
            <div className={classes.connect__details_list_data}>
              <img src="../../Connect/Phone.png" alt="" />
              <a href="tel:+381691234567" target="blank">
                +381 69 1234 567
              </a>
            </div>
            <div className={classes.connect__details_list_data}>
              <img src="../../Connect/Mail.png" alt="" />
              <a href="mailto:office@nitnis.com" target="blank">
                office@nitnis.com
              </a>
            </div>
            <div className={classes.connect__details_list_data}>
              <img src="../../Connect/Location.png" alt="" />
              <span>Bulevar Nemanjića bb, Niš, Srbija</span>
            </div>
          </div>
          <div className={classes.connect__details_socials}>
            <span>Društvene Mreže</span>
            <div className={classes.social__container}>
              <div className={classes.social__container_box}>
                <a href="https://www.instagram.com/nit_nis018/" target="blank">
                  <RiInstagramLine />
                </a>
              </div>
              <div className={classes.social__container_box}>
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
