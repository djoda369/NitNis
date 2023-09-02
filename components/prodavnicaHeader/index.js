import { useEffect, useState } from "react";
import NavBar from "../header/Navbar";
import classes from "./styles.module.scss";

export default function ProdavnicaHeader({ active, background, context }) {
  const [page, setPage] = useState("");

  useEffect(() => {
    setPage(background);
  }, [background]);

  return (
    <div
      className={`${classes.head} ${
        page === "zenska-obuca"
          ? classes.img_zenske
          : page === "muska-obuca"
          ? classes.img_muske
          : page === "default"
          ? classes.img
          : page === "zenska-odeca"
          ? classes.odecaZ
          : page === "muska-odeca"
          ? classes.odecaM
          : page === "aksesoari"
          ? classes.akses
          : ""
      }`}
    >
      <NavBar active={active} transparent={false} context={context} />
      <div className={classes.head__text}>
        <h1>
          {page === "zenske-cipele"
            ? "Ženska Obuća"
            : page === "muske-cipele"
            ? "Muška obuća"
            : "nit prodizvodi"}
        </h1>
        <p>
          {page === "default"
            ? "Istražite neki od naših već napravljenih proizvoda i pronađite nešto u čemu ćete zablistati."
            : ""}
        </p>
      </div>
    </div>
  );
}
