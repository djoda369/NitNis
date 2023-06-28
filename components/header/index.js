import classes from "./styles.module.scss";
import NavBar from "./Navbar";
import Link from "next/link";

export default function Header({ active }) {
  return (
    <div className={classes.head}>
      <NavBar active={active} />
      <div className={classes.head__main}>
        <div className={classes.head__main_logo}>
          <img src="../../logo/NitLogo1.png" alt="logo" />
        </div>
        <div className={classes.head__main_text}>
          <p>
            Originalni dizajn koji razbija tabue, učiniće da se izdvojite stavom
            i stilom
          </p>
        </div>
        <div className={classes.head__main_btns}>
          {/* <button className={classes.head__main_btns_1}>Poruci</button> */}
          <Link href="/prodavnica">
            <button className={classes.head__main_btns_2}>
              Istraži Ponudu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
