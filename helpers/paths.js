import db from "@/helpers/db";
import Product from "@/models/Products";

async function getPaths() {
  await db.connectDb();
  const paths = await Product.distinct("tip");
  const path = paths.map((tip) => ({
    params: { shop: tip },
  }));
  return path;
}

const paths = { getPaths };

export default paths;
