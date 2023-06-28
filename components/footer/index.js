import Link from "next/link";
import classes from "./styles.module.scss";
import { RiFacebookFill, RiInstagramLine } from "react-icons/ri";
import ConnectButton from "../connect/connectButton";

export default function Footer() {
  return (
    <div className={classes.foot}>
      <div className={`${classes.container}`}>
        <div className={`${classes.footer}`}>
          <div className={classes.footer__logo}>
            <div className={classes.footer__logo_1}>
              <img src="../../logo/_CompoundPath_.png" alt="" />
            </div>
            <div className={classes.footer__logo_2}>
              <img src="../../logo/_Path_.png" alt="" />
            </div>
          </div>
          <div className={classes.footer__socials}>
            <span>Posetite Nas</span>
            <div className={classes.footer__socials_container}>
              <div className={classes.box}>
                <a
                  href="https://www.instagram.com/nit_nis/?hl=en"
                  target="blank"
                >
                  <RiInstagramLine />
                </a>
              </div>
              <div className={classes.box}>
                <a
                  href="https://www.facebook.com/nitnishandmade/"
                  target="blank"
                >
                  <RiFacebookFill />
                </a>
              </div>
            </div>
          </div>
          <div className={classes.footer__links}>
            <span>
              <Link href="/">Početna</Link>
            </span>
            <span>
              <Link href="/prodavnica">Prodavnica</Link>
            </span>
            <span>
              <ConnectButton text={"Kontakt"} footer={true} />
            </span>
            <span>
              <Link href="/cart">korpa</Link>
            </span>
          </div>
          <div className={classes.footer__policy}>
            <span>© 2023 Nit Nis</span>
            <span>
              <Link href="/uslovi_kupovine">Uslovi Kupovine</Link>
            </span>
            <span>
              <Link href="/politika_privatnosti">Politika Privatnosti</Link>
            </span>
          </div>
        </div>
      </div>
      <div className={classes.foot__biglogo}>
        <img src="../../logo/BigLogo.png" alt="" />
      </div>
      <div className={classes.foot__biglogo2}>
        <img src="../../logo/LogoFlex.png" alt="" />
      </div>
    </div>
  );
}
