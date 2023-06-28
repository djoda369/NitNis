import classes from "../styles/Home.module.scss";
import Head from "next/head";
import Header from "@/components/header";
import ONama from "@/components/o_nama";
import Highlighted from "@/components/highlighted";
import Design from "@/components/design";
import Connect from "@/components/connect";
import Footer from "@/components/footer";
import db from "@/helpers/db";
import Product from "@/models/Products";

export default function App({ heighlits }) {
  return (
    <div>
      <Head>
        <title>NitNis</title>
      </Head>
      <main className={classes.main}>
        <Header active="home" />
        <ONama />
        <Highlighted heighlits={heighlits} />
        <Design />
        <Connect />
        <Footer />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  db.connectDb();
  let heighlits = await Product.find({ featured: true }).lean();
  db.disconnectDb();
  return {
    props: {
      heighlits: JSON.parse(JSON.stringify(heighlits)),
    },
  };
}
