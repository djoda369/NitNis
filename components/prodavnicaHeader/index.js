import { useEffect, useState } from "react";
import NavBar from "../header/Navbar";
import classes from "./styles.module.scss";

export default function ProdavnicaHeader({ active, background }) {
  const [page, setPage] = useState("");
  console.log(background);

  useEffect(() => {
    setPage(background);
  }, []);

  return (
    <div
      className={`${classes.head} ${
        page === "zenske-cipele"
          ? classes.img_zenske
          : page === "muske-cipele"
          ? classes.img_muske
          : page === "default"
          ? classes.img
          : ""
      }`}
    >
      <NavBar active={active} transparent={false} />
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
