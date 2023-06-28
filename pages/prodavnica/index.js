import ProdavnicaHeader from "@/components/prodavnicaHeader";
import classes from "../../styles/Prodavnica.module.scss";
import HomeProdavnica from "@/components/prodavnicaMain";
import Footer from "@/components/footer";

export default function Prodavnica() {
  return (
    <div className={classes.prod}>
      <ProdavnicaHeader active="prodavnica" background={"default"} />
      <HomeProdavnica />
      <Footer />
    </div>
  );
}
