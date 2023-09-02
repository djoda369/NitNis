import classes from "./styles.module.scss";
import Card from "../KarticeProdizvoda";
import { useRouter } from "next/router";

export default function ItemsGrid({ filteredShoes }) {
  const router = useRouter();

  const vertikal =
    router.query.shop === "zenska-odeca" ||
    router.query.shop === "muska-odeca" ||
    router.query.shop === "aksesoari";

  if (!vertikal) {
    return (
      <div className={classes.grid}>
        {filteredShoes.map((shoe) => {
          return (
            <Card
              key={shoe._id}
              image={shoe.images[0]}
              name={shoe.name}
              price={shoe.price}
              limited={shoe.limited}
              exclusive={shoe.exclusive}
              sale={shoe.sale}
              slug={shoe.slug}
              tip={shoe.tip}
            />
          );
        })}
      </div>
    );
  }
  if (vertikal) {
    return (
      <div className={classes.grid__vertikal}>
        {filteredShoes.map((shoe) => {
          return (
            <Card
              key={shoe._id}
              image={shoe.images[0]}
              name={shoe.name}
              price={shoe.price}
              limited={shoe.limited}
              exclusive={shoe.exclusive}
              sale={shoe.sale}
              slug={shoe.slug}
              tip={shoe.tip}
            />
          );
        })}
      </div>
    );
  }
}
