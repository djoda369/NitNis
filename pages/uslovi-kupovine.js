import NavBar from "@/components/header/Navbar";
import classes from "../styles/uslovi.module.scss";
import Footer from "@/components/footer";
import CartContext from "@/components/context/cartContext";
import { useContext, useEffect } from "react";
import { MdOutlineShoppingBag, MdOutlineLocalShipping } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import Head from "next/head";
export default function UsloviKupovine() {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartNitNis"))) {
      const cartItems = JSON.parse(localStorage.getItem("cartNitNis"));
      context.setCartItems(cartItems.length);
    }
  }, []);
  const context = useContext(CartContext);
  return (
    <div>
      <Head>
        <title>NitNis - Ručno rađena obuća i odeća</title>
      </Head>
      <div className={classes.nav}>
        <NavBar transparent={true} context={context} />
      </div>
      <main className={classes.uslovi}>
        <div className={classes.container}>
          <div className={classes.uslovi__main}>
            <h1>
              Uslovi Kupovine <MdOutlineShoppingBag />
            </h1>

            <p>
              Proizvodi koji se prodaju putem internet prodavnice su ručno
              radjeni . Proizvodi kao takvi, mogu u minimalnoj meri i detaljima
              odstupati od modela koji je fotografisan, što zapravo i daje
              unikatnost svakom komadu. Suštinski, model ostaje isti a detalji
              neprimetni.
            </p>
            <p>
              Za eventualne izmene u vezi modela koji poručujete po personalnim
              merama, morate prethodno dobiti našu potvrdu da je moguće taj
              zahtev ispuniti. Rok za izradu takve porudžbine je 20 dana od dana
              uplate za model po Vašoj meri. Narudžbine koje su na lageru
              (trenutno raspoložive) šalju se u toku sledeća 2 radna dana od
              potvde narudžbine. Porudžbine koje se kreiraju petkom ili
              vikendom, bice obradjene i preuzete od kurirske službe naredne
              nedelje. Za artikle koji se naručuju po personalizovanim merama,
              rok za izradu je 20 dana na šta se dodaje vreme isporuke i to u
              zavisnosti od adrese za isporuku.
            </p>
          </div>
          <div className={classes.uslovi__main}>
            <h1>
              Isporuka <MdOutlineLocalShipping />
            </h1>
            <p>Za narudžbine iz Srbije možete artikle platiti pouzećem.</p>
            <p>
              Narudžbine se šalju kurirskom službom POST EXPRESS ili CITY
              EXPRESS i stižu Vam u roku od 72 sata od trenutka potvrdjivanja
              narudzžbine. Kurirska služba će u koliko Vas ne nadje na datoj
              adresi kontaktirati putem telefona koji ste nam dostavili u
              porudžbini. Molimo Vas da nam dostavite validne kontakt telefone
              da bi vam porudžbina bila isporučena.
            </p>
          </div>
          <div className={classes.uslovi__main}>
            <h1>
              Povraćaj novca <BiMoneyWithdraw />
            </h1>
            <p>
              Za sredstva koja su uplaćena preko platnih kartica, NITNIS je u
              obavezi da povraćaj vrši isključivo preko Banke, odnosno preko
              kartičnih asocijacija.. VISA, MASTER CARD … i to storniranjem ili
              delimičnim storniranjem originalne transakcije, banka će izvršiti
              povraćaj sredstava na račun kupca.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
