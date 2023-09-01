import Link from "next/link";
import classes from "./styles.module.scss";
import Image from "next/image";
import ZenskaObuca from "../../public/compresed/Zenska_obuca-min.jpg";
import MuskaObuca from "../../public/compresed/Muska_obuca-min.jpg";
import ZenskaOdeca from "../../public/compresed/Zenska_odeca-min.jpg";
import MuskaOdeca from "../../public/compresed/Muska_odeca-min.jpg";
import Akseosoari from "../../public/compresed/accesories-min.jpg";

export default function HomeProdavnica() {
  const imageStyle = {
    borderRadius: "60px",
    width: "100%",
    height: "100%",
  };

  const accesoriesImgStyle = {
    borderRadius: "60px",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top",
  };

  return (
    <div className={classes.width}>
      <div className={`${classes.container} ${classes.home}`}>
        <div className={classes.grid_container}>
          <Link href="/prodavnica/zenska-obuca">
            <div className={classes.zenska_oduca}>
              <div className={classes.img_container}>
                <Image
                  src={ZenskaObuca}
                  style={imageStyle}
                  alt="Ženska Obuća"
                />
                <div className={classes.background}>
                  <h2>Ženska obuća</h2>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/prodavnica/muska-obuca">
            <div className={classes.muska_obuca}>
              <div className={classes.img_container}>
                <Image src={MuskaObuca} style={imageStyle} alt="Muška Obuća" />
                <div className={classes.background}>
                  <h2>Muška obuća</h2>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/prodavnica/zenska-odeca">
            <div className={classes.zenska_odeca}>
              <div className={classes.img_container}>
                <Image
                  src={ZenskaOdeca}
                  style={imageStyle}
                  alt="Ženska Odeća"
                />
                <div className={classes.background}>
                  <h2>Ženska Odeća</h2>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/prodavnica/muska-odeca">
            <div className={classes.muska_odeca}>
              <div className={classes.img_container}>
                <Image src={MuskaOdeca} style={imageStyle} alt="Muška Odeća" />
                <div className={classes.background}>
                  <h2>Muška odeća</h2>
                </div>
              </div>
            </div>
          </Link>

          <div className={classes.accesories}>
            <Link href="/prodavnica/aksesoari">
              <div className={classes.img_container}>
                <Image
                  src={Akseosoari}
                  style={accesoriesImgStyle}
                  alt="Aksesoari"
                />
                <div className={classes.background}>
                  <h2>Aksesoari</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
