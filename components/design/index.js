import ConnectButton from "../connect/connectButton";
import classes from "./styles.module.scss";

export default function Design() {
  return (
    <div className={classes.design}>
      <h1 className={classes.design__title}>Dizajnirajte svoju cipelu</h1>
      <div className={classes.design__text}>
        <h2>
          Želite da imate jedinstveni par cipela koji će odgovarati vašem stilu
          i ukusu? Na našem sajtu imate mogućnost da dizajnirate svoju
          jedinstvenu cipelu!
        </h2>
        <p>
          Odaberite model iz naše ponude i preko chata nam se javite sa vašim
          željama za dizajn. Možete izabrati detalje poput boje kože, vrste
          đona, dezena i drugih personalizacija. Neke od naših cipela imaju
          bedževe "ekskluzivno" ili "ograničeno", što znači da su izrađene u
          ograničenim količinama. Dizajniranje vaše cipele kod nas je lako i
          zabavno! Stvorite vaš jedinstveni par cipela kod nas i istaknite se
          svojim stilom
        </p>
      </div>
      <div className={classes.design__btns}>
        {/* <button className={classes.design__btns_kontakt}>Kontakt</button> */}
        <ConnectButton text={"Kontakt"} padding={true} />
        {/* <button className={classes.design__btns_dizajn}>
          Dizajnijate svoju cipelu
        </button> */}
      </div>
    </div>
  );
}
