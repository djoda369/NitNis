import classes from "./styles.module.scss";
import Image from "next/image";

export default function BigImage({ src, alt }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={classes.big_overlay}>
      <div onClick={handleClick} className={classes.img_container}>
        <Image
          src={src}
          width={1262}
          height={780}
          style={{
            borderRadius: "40px",
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
          unoptimized
          alt={alt}
        />
      </div>
    </div>
  );
}
