import Link from "next/link";
import classes from "./styles.module.scss";
import ConnectButton from "../connect/connectButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import {
  RiCloseLine,
  RiArrowDownCircleFill,
  RiArrowUpCircleFill,
} from "react-icons/ri";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

export default function NavBar({ active, transparent, context }) {
  const [sidebar, setSideBar] = useState(false);
  const sideRef = useRef(null);
  const [prodavnicaDropDown, setProdavnicaDropDown] = useState(false);
  const [prodavnicaDropDownBig, setProdavnicaDropDownBig] = useState(false);

  const divRef = useRef(null);
  const bigRef = useRef(null);
  const prodavnicRef = useRef(null);

  const trigerSidebar = function () {
    return setSideBar((prevstate) => !prevstate);
  };

  const trigerShopBig = function () {
    return setProdavnicaDropDownBig((prevstate) => !prevstate);
  };

  const trigerShop = function () {
    return setProdavnicaDropDown((prevstate) => !prevstate);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <header
      className={classes.header}
      style={
        transparent
          ? { backgroundColor: "white", color: "#050301" }
          : { backgroundColor: "hwb(30 0% 98% / 0.411)" }
      }
    >
      <div className={`${classes.container} ${classes.header_flex}`}>
        <Link href="/">
          <div className={classes.header__logo}>
            <div className={classes.header__logo_img2}>
              {/* <img src="../../logo/_CompoundPath_.png" alt="" /> */}
              {transparent ? (
                <img src="../../logo/LogoCrni1.png" alt="" />
              ) : (
                <img src="../../logo/_CompoundPath_.png" alt="" />
              )}
            </div>
            <div className={classes.header__logo_img1}>
              {transparent ? (
                <img src="../../logo/LogoCrni.png" alt="" />
              ) : (
                <img src="../../logo/_Path_.png" alt="" />
              )}
            </div>
          </div>
        </Link>
        <div className={classes.header__nav}>
          <Link href="/" className={classes.hover}>
            <span className={active == "home" ? `${classes.active__page}` : ""}>
              Početna
            </span>
          </Link>
          <div className={classes.navigation}>
            <Link href="/prodavnica" className={classes.hover}>
              <span
                className={
                  active == "prodavnica" ? `${classes.active__page}` : ""
                }
                // onMouseOut={trigerShopBig}
              >
                Prodavnica
              </span>
            </Link>
            <HiOutlineChevronDoubleDown onMouseEnter={trigerShopBig} />
            <CSSTransition
              in={prodavnicaDropDownBig}
              // timeout={300}
              unmountOnExit
              nodeRef={bigRef}
              classNames={{
                enter: classes.prodavnicaBig,
                enterActive: classes.prodavnicaBigActive,
                exit: classes.prodavnicaBigExit,
                exitActive: classes.prodavnicaBigExitActive,
              }}
            >
              <div
                ref={bigRef}
                className={classes.prodavnicaOptions}
                onMouseLeave={trigerShopBig}
              >
                <ul>
                  <Link href="/prodavnica/zenska-obuca">
                    <li onClick={trigerSidebar}>Ženska obuća</li>
                  </Link>
                  <Link href="/prodavnica/muska-obuca">
                    <li onClick={trigerSidebar}>Muška obuća</li>
                  </Link>
                  <Link href="/prodavnica/zenska-odeca">
                    <li onClick={trigerSidebar}>Ženska Odeća</li>
                  </Link>
                  <Link href="/prodavnica/muska-odeca">
                    <li onClick={trigerSidebar}>Muška odeća</li>
                  </Link>
                  <Link href="/prodavnica/aksesoari">
                    <li onClick={trigerSidebar}>Akseosoari</li>
                  </Link>
                </ul>
              </div>
            </CSSTransition>
          </div>
          {/* <span className={classes.hover}>Dizajnirajte Cipelu</span> */}
        </div>
        <div className={classes.header__btns}>
          <span>
            <ConnectButton text={"Kontakt"} transparent={transparent} />
          </span>
          <Link href="/cart">
            <button className={classes.header__btns_kontakt}>
              <span className={classes.cartNumber}>{context.cartItems}</span>
              <MdOutlineShoppingCart />
              <span>Korpa</span>
            </button>
          </Link>
        </div>
        <div className={classes.menu__icon}>
          <HiMenuAlt3 onClick={trigerSidebar} />

          <CSSTransition
            in={sidebar}
            timeout={300}
            unmountOnExit
            nodeRef={sideRef}
            classNames={{
              enter: classes.sideBarEnter,
              enterActive: classes.sideBarEnterActive,
              exit: classes.sideBarExit,
              exitActive: classes.sideBarExitActive,
            }}
          >
            <div className={classes.overlay} onClick={trigerSidebar}>
              <div
                className={classes.sidebar}
                ref={sideRef}
                onClick={handleClick}
              >
                <div className={classes.sidebar__content}>
                  <RiCloseLine onClick={trigerSidebar} />
                  {/* <img src="../../logo/NitLogo.png" alt="Logo" /> */}
                  <div className={classes.links}>
                    <Link href="/" className={classes.hover}>
                      <span>Početna</span>
                    </Link>

                    <div className={classes.prodavnicaSide} ref={divRef}>
                      <div className={classes.prodavnicaSide__start}>
                        <Link href="/prodavnica" className={classes.hover}>
                          <span>Prodavnica</span>
                        </Link>
                        {!prodavnicaDropDown && (
                          <RiArrowDownCircleFill onClick={trigerShop} />
                        )}
                        {prodavnicaDropDown && (
                          <RiArrowUpCircleFill onClick={trigerShop} />
                        )}
                      </div>
                      <CSSTransition
                        timeout={200}
                        unmountOnExit
                        in={prodavnicaDropDown}
                        nodeRef={prodavnicRef}
                        classNames={{
                          enter: classes.prodavnicaEnter,
                          enterActive: classes.prodavnicaEnterActive,
                          exit: classes.prodavnicaExit,
                          exitActive: classes.prodavnicaExitActive,
                        }}
                      >
                        <div
                          className={classes.prodavnicaSide__dropdown}
                          ref={prodavnicRef}
                          // style={{
                          //   display: prodavnicaDropDown ? "block" : "none",
                          // }}
                        >
                          <ul>
                            <Link href="/prodavnica/zenska-obuca">
                              <li onClick={trigerSidebar}>Ženska obuća</li>
                            </Link>
                            <Link href="/prodavnica/muska-obuca">
                              <li onClick={trigerSidebar}>Muška obuća</li>
                            </Link>
                            <Link href="/prodavnica/zenska-odeca">
                              <li onClick={trigerSidebar}>Ženska Odeća</li>
                            </Link>
                            <Link href="/prodavnica/muska-odeca">
                              <li onClick={trigerSidebar}>Muška odeća</li>
                            </Link>
                            <Link href="/prodavnica/aksesoari">
                              <li onClick={trigerSidebar}>Akseosoari</li>
                            </Link>
                          </ul>
                        </div>
                      </CSSTransition>
                    </div>

                    <span>
                      <ConnectButton
                        text={"Kontakt"}
                        transparent={transparent}
                        sidebar={true}
                      />
                    </span>

                    <Link href="/cart">
                      <span>Korpa</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </header>
  );
}
