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
import { useRouter } from "next/router";

export default function ProductInfo({ shoe }) {
  const images = shoe.images;
  const priceComa = shoe.price.toLocaleString("en-US");
  const tip = shoe.tip.replace("-", " ");
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [showForm, setShowForm] = useState(false);
  const [bigImage, setBigImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [formState, setFormState] = useState({
    obimRisa: "",
    obimPrstiju: "",
    duzinaStopala: "",
    velicina: "",
  });
  const [contactState, setContactState] = useState({
    ime: "",
    prezime: "",
    kontaktTelefon: "",
    email: "",
  });

  const cartData = {
    ...formState,
    ...shoe,
  };
  const dropdownRef = useRef(null);
  const router = useRouter();

  const formSubmit = async function (formData) {
    const resposne = await fetch("/api/formdata", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resposne.json();
    if (!resposne.ok) {
      // setErrorMessage(data.message);
    }
    if (resposne.ok) {
      setErrorMessage(null);
      if (!localStorage.getItem("cartNitNis")) {
        localStorage.setItem("cartNitNis", JSON.stringify([data]));
      } else {
        let cart = JSON.parse(localStorage.getItem("cartNitNis"));
        const res = cart.find((element) => {
          return element._id === shoe._id;
        });
        if (res === undefined) {
          cart.push({ ...data });
          localStorage.setItem("cartNitNis", JSON.stringify(cart));
          setErrorMessage(null);
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
      router.push("/cart");
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
      <div className={classes.nav}>
        <NavBar active="prodavnica" transparent={true} />
      </div>
      <div className={`${classes.content}`}>
        <div className={classes.product__images}>
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
              <div className={`${classes.banner} ${classes.banner_exclusive}`}>
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
          <span className={classes.info__category}>{tip}</span>
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
          <h2 className={classes.info__materijal}>Materijal:</h2>
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
          <div className={classes.info__brend}>
            <h2>Brend:</h2>
            <img src="../../../logo/curiosSmall.png" alt="curios" />
          </div>
          {!shoe.limited && (
            <>
              <div className={classes.info__velicine}>
                <h2>Veličina:</h2>
                <SizesBtn />
              </div>
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
                  <div className={classes.info__forma_input} ref={dropdownRef}>
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
                          {shoe.sizes.map((size) => {
                            return (
                              <option value={size.size} key={size.size}>
                                {size.size}
                              </option>
                            );
                          })}
                        </select>
                      </label>
                    </form>
                  </div>
                </CSSTransition>
              </div>
              <p className={classes.error}>{errorMessage}</p>
              <button
                className={classes.info__submit}
                onClick={() => formCheck(cartData)}
              >
                dodjate u korpu
              </button>
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

export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.product;
  db.connectDb();
  let shoe = await Product.findOne({ slug }).populate({
    path: "category",
    model: Cath,
  });

  return {
    props: { shoe: JSON.parse(JSON.stringify(shoe)) },
  };
}
