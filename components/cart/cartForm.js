import classes from "./styles.module.scss";

export default function CartForm({ cena }) {
  const finalPrice = (Number(cena) + 440).toLocaleString("en-US");

  return (
    <div className={classes.cartForm}>
      <div className={classes.cartForm__form}>
        <div className={classes.cartForm__form_podaci}>
          <h1>Moji Podaci</h1>
          <form>
            <label>
              <span>Ime</span>
              <input type="text" name="ime" />
            </label>
            <label>
              <span>Prezime</span>
              <input type="text" name="ime" />
            </label>
            <label>
              <span>Email adresa</span>
              <input type="text" name="ime" />
            </label>
            <label>
              <span>Kontakt telefon</span>
              <input type="text" name="ime" />
            </label>
            <label>
              <span>Grad</span>
              <input type="text" name="ime" />
            </label>
            <label>
              <span>Poštanski broj</span>
              <input type="text" name="ime" />
            </label>
            <label>
              <span>Ulica</span>
              <input type="text" name="ime" />
            </label>
            <label>
              <span>Broj Ulice</span>
              <input type="text" name="ime" />
            </label>
            <label>
              <span>Sprat</span>
              <input type="text" name="ime" />
            </label>
            <label>
              <span>Broj Stana</span>
              <input type="text" name="ime" />
            </label>
          </form>
        </div>
        <form className={classes.placanje}>
          <h1>Način Plaćanja</h1>
          <div className={classes.radio}>
            <div className={classes.radio__box}>
              <input type="radio" name="nacinPlacanja" />
              <div className={classes.btn_text}>
                <label>Platna Kartica</label>
                <span>
                  Platite online sigurno i lako koristeći Visa, Visa Electron,
                  Dina, MasterCard ili Maestro platnu karticu koju je banka
                  izdavalac odobrila za internet plaćanje.
                </span>
              </div>
            </div>
            <div className={classes.radio__box}>
              <input type="radio" name="nacinPlacanja" />
              <div className={classes.btn_text}>
                <label>Gotovina</label>
                <span>
                  Platite kuriru tokom isporuke. Ukoliko ste u mogućnosti
                  pripremite tačnu sumu.
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className={classes.cartForm__troskovi}>
        <div className={classes.kupovina}>
          <div className={classes.header}>
            <h1>Tvoja kupovina</h1>
          </div>
          <div className={classes.cena}>
            <div className={classes.flex_container}>
              <div className={classes.cena__posebno}>
                <p>Prozivodi:</p>
                <span>{cena.toLocaleString("en-US")} RSD</span>
              </div>
              <div className={classes.cena__posebno}>
                <p>Troškovi dostave:</p>
                <span>440 RSD</span>
              </div>
              <div className={classes.cena__ukupno}>
                <p>Ukupno:</p>
                <span>{finalPrice} RSD</span>
              </div>
            </div>
            <div className={classes.btn_container}>
              <button>potvrdi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
