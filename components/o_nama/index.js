import classes from "./styles.module.scss";

export default function ONama() {
  return (
    <div className={classes.width}>
      <div className={classes.container}>
        <div className={` ${classes.onama}`}>
          <div className={classes.onama__text}>
            <h1>O Nama</h1>
            <p>
              Mi smo specijalizovani za prodaju rukom rađene obuće, odeće i
              aksesoara. Naš cilj je da vam pružimo najbolju kvalitetu i dizajn,
              sa naglaskom na tradicionalnim metodama izrade. Naš tim je
              sastavljen od stručnih i iskusnih ljudi koji su posvećeni pružanju
              vrhunske usluge i ispunjenju vaših želja. Trudimo se da stvorimo
              personalizovan i autentičan stil, koji odgovara vašim potrebama i
              životnom stilu. Verujemo da je naša uloga da vam pružimo
              jedinstveno iskustvo kupovine i da stvorimo dugoročan odnos sa
              našim klijentima.
            </p>
          </div>
          <div className={classes.onama__img}>
            <img src="../../background/Rectangle_1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
