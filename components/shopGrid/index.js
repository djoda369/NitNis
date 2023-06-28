import classes from "./styles.module.scss";
import Card from "../KarticeProdizvoda";

export default function ItemsGrid({ filteredShoes }) {
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
