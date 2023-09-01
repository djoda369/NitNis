import classes from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Card({
  image,
  name,
  price,
  limited,
  exclusive,
  sale,
  featured,
  slug,
  tip,
}) {
  const priceComa = price.toLocaleString("en-US");
  const vertical =
    tip === "zenska-odeca" || tip === "muska-odeca" || tip === "aksesoari";
  const horizontal = tip === "zenska-obuca" || tip === "muska-obuca";

  return (
    <div className={classes.card}>
      <Link href={`/prodavnica/${tip}/${slug}`}>
        <div
          className={
            vertical
              ? `${classes.image__vertical}`
              : `${classes.image__container}`
          }
        >
          <Image
            src={image}
            alt={name}
            width={384}
            height={256}
            loading="lazy"
            placeholder="blur"
            blurDataURL={image}
            style={{
              objectFit: "cover",
              zIndex: 1,
              // borderRadius: "40px",
              height: "100%",
              width: "100%",
            }}
            // unoptimized
            quality={100}
          />
        </div>
      </Link>
      <div className={classes.card__info}>
        <Link href={`/prodavnica/zenske-cipele/${slug}`}>
          <span className={classes.card__info_name}>{name}</span>
        </Link>
        {!featured && (
          <span className={classes.card__info_price}>{priceComa} RSD</span>
        )}
      </div>
      {limited && (
        <div className={classes.banner}>
          <div className={classes.banner__box}>
            <span>ograniceno</span>
          </div>
        </div>
      )}
      {exclusive && (
        <div className={`${classes.banner} ${classes.banner_exclusive}`}>
          <div
            className={`${classes.banner__box} ${classes.banner__box_exclusive}`}
          >
            <span>Ekskluzivno</span>
          </div>
        </div>
      )}
      {sale && (
        <div className={`${classes.banner} ${classes.banner_sale}`}>
          <div className={`${classes.banner__box} ${classes.banner__box_sale}`}>
            <span>Sale</span>
          </div>
        </div>
      )}
    </div>
  );
}
