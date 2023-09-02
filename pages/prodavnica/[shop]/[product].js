import db from "@/helpers/db";
import classes from "../../../styles/Product.module.scss";
import Product from "@/models/Products";
import Cath from "@/models/Category";
import Image from "next/image";
import NavBar from "@/components/header/Navbar";
import { useState, useRef } from "react";
import SizesBtn from "@/components/sizes/sizesBtn";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import Footer from "@/components/footer";
import { CSSTransition } from "react-transition-group";
import BigImage from "@/components/bigImage";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";
import CartContext from "@/components/context/cartContext";
import { useContext, useEffect } from "react";
import Head from "next/head";
import paths from "@/helpers/paths";

export default function ProductInfo({ shoe }) {
  const context = useContext(CartContext);
  const images = shoe.images;
  const priceComa = shoe.price.toLocaleString("en-US");
  const tip = shoe.tip.replace("-", " ");
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [showForm, setShowForm] = useState(false);
  const [bigImage, setBigImage] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [formState, setFormState] = useState({
    obimRisa: "",
    obimPrstiju: "",
    duzinaStopala: "",
    velicina: "",
  });
  const [formStateWardrobe, setFormStateWardrobe] = useState({
    velicina: "",
  });
  const [contactState, setContactState] = useState({
    ime: "",
    prezime: "",
    kontaktTelefon: "",
    email: "",
  });
  const vrsta =
    tip === "zenska odeca"
      ? "Ženska odeća"
      : tip === "muska odeca"
      ? "Muška odeća"
      : tip === "muska obuca"
      ? "Muška obuća"
      : tip === "zenska obuca"
      ? "Ženska obuća"
      : tip === "aksesoari"
      ? "Aksesoari"
      : "";
  const vertical =
    shoe.tip === "zenska-odeca" ||
    shoe.tip === "muska-odeca" ||
    shoe.tip === "aksesoari";

  const cartData = {
    ...formState,
    ...shoe,
  };
  const cartDataWardrobe = {
    ...formStateWardrobe,
    ...shoe,
  };
  const dropdownRef = useRef(null);
  const popUpRef = useRef(null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cartNitNis"))) {
      const cartItems = JSON.parse(localStorage.getItem("cartNitNis"));
      context.setCartItems(cartItems.length);
    }
  }, []);

  const formSubmit = async function (formData) {
    const resposne = await fetch("/api/formdata", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resposne.json();
    console.log(data);
    if (!resposne.ok) {
      setErrorMessage(data.message);
    }
    if (resposne.ok) {
      setErrorMessage(null);
      if (!localStorage.getItem("cartNitNis")) {
        setShowPopUp(true);
        localStorage.setItem("cartNitNis", JSON.stringify([data]));
        setTimeout(() => {
          setShowPopUp(false);
        }, 3000);
        context.setCartItems((prevstate) => prevstate + 1);
      } else {
        let cart = JSON.parse(localStorage.getItem("cartNitNis"));
        const res = cart.find((element) => {
          return element._id === shoe._id;
        });
        if (res === undefined) {
          setShowPopUp(true);
          cart.push({ ...data });
          localStorage.setItem("cartNitNis", JSON.stringify(cart));
          setErrorMessage(null);
          context.setCartItems((prevstate) => prevstate + 1);
          setTimeout(() => {
            setShowPopUp(false);
          }, 3000);
        } else {
          setErrorMessage("Proizvod je vec dodat u korpu!");
        }
      }
    }
  };

  const formCheck = function (cartData) {
    if (
      !cartData.obimPrstiju ||
      !cartData.obimRisa ||
      !cartData.duzinaStopala ||
      !cartData.velicina
    ) {
      setErrorMessage("Pravlino unesite mere!");
    } else {
      setErrorMessage(null);
      formSubmit(cartData);
    }
  };

  const formCheckWardrobe = function (cartData) {
    if (!cartData.velicina) {
      setErrorMessage("Pravlino unesite mere!");
    } else {
      setErrorMessage(null);
      formSubmit(cartData);
      console.log(cartData);
    }
  };

  const handleFormaDataChange = function (event) {
    setFormState((prevstate) => {
      return {
        ...prevstate,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleFormaDataChangeWardrove = function (event) {
    setFormStateWardrobe((prevstate) => {
      return {
        ...prevstate,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleContactFormChange = function (event) {
    setContactState((prevstate) => {
      return {
        ...prevstate,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitContactForm = async function (event) {
    event.preventDefault();
  };

  const handleImageChange = (newImage) => {
    setCurrentImage(newImage);
    setSelectedImage(newImage);
  };

  const handleFormChange = function () {
    setShowForm((prevState) => !prevState);
  };

  const showBigImage = function () {
    setBigImage((prevstate) => !prevstate);
  };

  return (
    <div className={classes.product}>
      <Head>
        <title>NitNis - Ručno rađena obuća i odeća</title>
      </Head>
      <CSSTransition
        in={showPopUp}
        timeout={3000}
        unmountOnExit
        nodeRef={popUpRef}
        classNames={{
          enter: classes.dropdownFormEnterPopUp,
          enterActive: classes.dropdownFormEnterActivePopUp,
          exit: classes.dropdownFormExitPopUp,
          exitActive: classes.dropdownFormExitActivePopUp,
        }}
      >
        <Link href="/cart">
          <div className={classes.popUp} ref={popUpRef}>
            <div className={classes.svg__container}>
              <MdOutlineShoppingCart />
            </div>

            <div className={classes.info__container}>
              <h1>Pregled Korpe</h1>
              <p>
                "<span>{shoe.name}</span>" Proizvod dodat u korpu!
              </p>
            </div>
          </div>
        </Link>
      </CSSTransition>
      <div className={classes.nav}>
        <NavBar active="prodavnica" transparent={true} context={context} />
      </div>
      <div className={`${classes.content}`}>
        <div className={classes.product__images}>
          {!vertical && (
            <div className={classes.main__img} onClick={showBigImage}>
              <Image
                width={900}
                height={600}
                src={currentImage}
                style={{
                  // borderRadius: "40px",
                  zIndex: 1,
                  objectFit: "contain",
                  height: "100%",
                  width: "100%",
                }}
                unoptimized
                alt={shoe.name}
                priority
              />
              {bigImage && (
                <BigImage
                  src={currentImage}
                  showBigImage={showBigImage}
                  alt={shoe.name}
                />
              )}
              {shoe.limited && (
                <div className={classes.banner}>
                  <div className={classes.banner__box}>
                    <span>ograniceno</span>
                  </div>
                </div>
              )}
              {shoe.exclusive && (
                <div
                  className={`${classes.banner} ${classes.banner_exclusive}`}
                >
                  <div
                    className={`${classes.banner__box} ${classes.banner__box_exclusive}`}
                  >
                    <span>Ekskluzivno</span>
                  </div>
                </div>
              )}
              {shoe.sale && (
                <div className={`${classes.banner} ${classes.banner_sale}`}>
                  <div
                    className={`${classes.banner__box} ${classes.banner__box_sale}`}
                  >
                    <span>Sale</span>
                  </div>
                </div>
              )}
            </div>
          )}
          {vertical && (
            <div className={classes.vertikal} onClick={showBigImage}>
              <div className={classes.vertikal__img}>
                <Image
                  width={900}
                  height={600}
                  src={currentImage}
                  style={{
                    // borderRadius: "40px",
                    zIndex: 1,
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                  }}
                  unoptimized
                  alt={shoe.name}
                  priority
                />
                {shoe.limited && (
                  <div className={classes.banner}>
                    <div className={classes.banner__box}>
                      <span>ograniceno</span>
                    </div>
                  </div>
                )}
                {shoe.exclusive && (
                  <div
                    className={`${classes.banner} ${classes.banner_exclusive}`}
                  >
                    <div
                      className={`${classes.banner__box} ${classes.banner__box_exclusive}`}
                    >
                      <span>Ekskluzivno</span>
                    </div>
                  </div>
                )}
                {shoe.sale && (
                  <div className={`${classes.banner} ${classes.banner_sale}`}>
                    <div
                      className={`${classes.banner__box} ${classes.banner__box_sale}`}
                    >
                      <span>Sale</span>
                    </div>
                  </div>
                )}
              </div>
              {bigImage && (
                <BigImage
                  src={currentImage}
                  showBigImage={showBigImage}
                  alt={shoe.name}
                />
              )}
            </div>
          )}
          <div className={classes.small__images}>
            {images.map((image, i) => {
              return (
                <div
                  onMouseEnter={() => {
                    handleImageChange(image);
                  }}
                  onMouseLeave={() => {}}
                  className={`${classes.small__img_container} `}
                  key={i}
                  style={vertical ? { height: "120px" } : { height: "auto" }}
                >
                  <Image
                    width={194.2}
                    height={120}
                    src={image}
                    style={{
                      // borderRadius: "20px",
                      zIndex: 1,
                      // objectFit: "fill",
                      height: "100%",
                      width: "100%",
                    }}
                    alt={shoe.name}
                  />
                  <div
                    className={`${
                      image === selectedImage
                        ? classes.small__img_container_active
                        : classes.small__img_container_inactive
                    } `}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.info}>
          <p className={classes.info__category}>
            <Link href="/">
              <span className={classes.clicable}>Početna</span>
            </Link>{" "}
            /{" "}
            <Link href="/prodavnica">
              <span className={classes.clicable}>Prodavnica</span>{" "}
            </Link>{" "}
            /{" "}
            <Link href={`/prodavnica/${shoe.tip}`}>
              <span className={classes.clicable}>{vrsta}</span>
            </Link>
            / <span>{shoe.name}</span>
          </p>
          <h1 className={classes.info__name}>{shoe.name}</h1>
          <span className={classes.info__price}>{priceComa} RSD</span>
          {shoe.limited && (
            <p className={classes.info__limited}>
              *Zbog ograničenih količina koža, moguće je da ne možemo napraviti
              identičnu kombinaciju. Kako biste bili sigurni u dostupnost,
              molimo Vas da ostavite podatke i neko iz Nit tima će Vas
              kontaktirati radi preciziranja. Naši dizajneri će Vam pomoći da
              nađete kombinaciju po Vašem ukusu.
            </p>
          )}

          <p className={classes.info__description}>{shoe.description}</p>
          <h2 className={classes.info__materijal}>
            Materijal: {vertical && <span>{shoe.materijal}</span>}
          </h2>
          {!vertical && (
            <div className={classes.info__sastav}>
              <div className={classes.info__sastav_flex}>
                <h3>Lice:</h3>
                <span>{shoe.lice}</span>
              </div>
              <div className={classes.info__sastav_flex}>
                <h3>Postava:</h3>
                <span>{shoe.postava}</span>
              </div>
              <div className={classes.info__sastav_flex}>
                <h3>Đon:</h3>
                <span>{shoe.djon}</span>
              </div>
            </div>
          )}

          {/* <div className={classes.info__brend}>
            <h2>Brend:</h2>
            <img src="../../../logo/curiosSmall.png" alt="curios" />
          </div> */}
          {!shoe.limited && (
            <>
              <div className={classes.info__velicine}>
                <h2>Veličina:</h2>
                <SizesBtn />
              </div>
              {!vertical && (
                <div className={classes.info__forma}>
                  <button
                    onClick={handleFormChange}
                    className={showForm ? `${classes.borderBtn}` : ""}
                  >
                    <span>Odaberite Veličinu</span>
                    {!showForm && <RiArrowDownSLine />}
                    {showForm && <RiArrowUpSLine />}
                  </button>
                  <CSSTransition
                    in={showForm}
                    timeout={500}
                    unmountOnExit
                    nodeRef={dropdownRef}
                    classNames={{
                      enter: classes.dropdownFormEnter,
                      enterActive: classes.dropdownFormEnterActive,
                      exit: classes.dropdownFormExit,
                      exitActive: classes.dropdownFormExitActive,
                    }}
                  >
                    <div
                      className={classes.info__forma_input}
                      ref={dropdownRef}
                    >
                      <form>
                        <label>
                          <span>Obim risa:</span>
                          <div>
                            <input
                              type="number"
                              required
                              name="obimRisa"
                              value={formState.obimRisa}
                              onChange={handleFormaDataChange}
                            />
                            <span>cm</span>
                          </div>
                        </label>
                        <label>
                          <span>Obim prstiju:</span>
                          <div>
                            <input
                              type="number"
                              required
                              name="obimPrstiju"
                              value={formState.obimPrstiju}
                              onChange={handleFormaDataChange}
                            />
                            <span>cm</span>
                          </div>
                        </label>
                        <label>
                          <span>Duzina stopala:</span>
                          <div>
                            <input
                              type="number"
                              required
                              name="duzinaStopala"
                              value={formState.duzinaStopala}
                              onChange={handleFormaDataChange}
                            />
                            <span>cm</span>
                          </div>
                        </label>
                        <label>
                          <span>Veličina:</span>
                          <select
                            required
                            value={formState.velicina}
                            name="velicina"
                            onChange={handleFormaDataChange}
                          >
                            <option
                              style={{ display: "none" }}
                              value=""
                            ></option>
                            {shoe.sizes.map((size) => {
                              return (
                                <option value={size} key={size}>
                                  {size}
                                </option>
                              );
                            })}
                          </select>
                        </label>
                      </form>
                    </div>
                  </CSSTransition>
                </div>
              )}
              {vertical && (
                <div className={classes.info__forma}>
                  <button
                    onClick={handleFormChange}
                    className={showForm ? `${classes.borderBtn}` : ""}
                  >
                    <span>Odaberite Veličinu</span>
                    {!showForm && <RiArrowDownSLine />}
                    {showForm && <RiArrowUpSLine />}
                  </button>
                  <CSSTransition
                    in={showForm}
                    timeout={500}
                    unmountOnExit
                    nodeRef={dropdownRef}
                    classNames={{
                      enter: classes.dropdownFormEnterVert,
                      enterActive: classes.dropdownFormEnterActiveVert,
                      exit: classes.dropdownFormExitVert,
                      exitActive: classes.dropdownFormExitActiveVert,
                    }}
                  >
                    <div
                      className={classes.info__forma_input}
                      ref={dropdownRef}
                    >
                      <form>
                        <label>
                          <span>Veličina:</span>
                          <select
                            required
                            value={formStateWardrobe.velicina}
                            name="velicina"
                            onChange={handleFormaDataChangeWardrove}
                          >
                            <option
                              value=""
                              style={{ display: "none" }}
                            ></option>
                            {shoe.sizes.map((size, i) => {
                              return (
                                <option value={size} key={i}>
                                  {size}
                                </option>
                              );
                            })}
                          </select>
                        </label>
                      </form>
                    </div>
                  </CSSTransition>
                </div>
              )}
              <p className={classes.error}>{errorMessage}</p>
              {vertical && (
                <button
                  className={classes.info__submit}
                  onClick={() => formCheckWardrobe(cartDataWardrobe)}
                >
                  dodjate u korpu
                </button>
              )}
              {!vertical && (
                <button
                  className={classes.info__submit}
                  onClick={() => formCheck(cartData)}
                >
                  dodajte u korpu
                </button>
              )}
            </>
          )}
          {shoe.limited && (
            <div className={classes.info__limited_form}>
              <h2>Kontakt o Dostupnosti</h2>
              <form>
                <div className={classes.info__limited_form_name}>
                  <label>
                    <span>Ime</span>
                    <input
                      type="text"
                      onChange={handleContactFormChange}
                      name="ime"
                    />
                  </label>
                  <label>
                    <span>Prezime</span>
                    <input
                      type="text"
                      onChange={handleContactFormChange}
                      name="prezime"
                    />
                  </label>
                </div>
                <label>
                  <span>Kontakt Telefon</span>
                  <input
                    type="tel"
                    onChange={handleContactFormChange}
                    name="kontaktTelefon"
                  />
                </label>
                <label>
                  <span>Email Adresa</span>
                  <input
                    type="email"
                    placeholder="Opciono"
                    onChange={handleContactFormChange}
                    name="email"
                  />
                </label>
                <button
                  className={classes.info__limited_form_btn}
                  onSubmit={submitContactForm}
                >
                  Potvrdi
                </button>
              </form>
            </div>
          )}
          <p className={classes.info__note}>
            *Obuca se radi rucno i po merama kupca, zbog toga je rok izrade i
            isporuke 20-25 dana.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { query } = context;
//   const slug = query.product;
//   db.connectDb();
//   let shoe = await Product.findOne({ slug }).populate({
//     path: "category",
//     model: Cath,
//   });
//   const path1 = paths.getProductPaths();

//   return {
//     props: { shoe: JSON.parse(JSON.stringify(shoe)) },
//   };
// }

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.product;
  db.connectDb();
  let shoe = await Product.findOne({ slug }).populate({
    path: "category",
    model: Cath,
  });
  return {
    props: { shoe: JSON.parse(JSON.stringify(shoe)) },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  db.connectDb();
  const path = await paths.getProductPaths();

  return {
    paths: path,
    fallback: true,
  };
}
