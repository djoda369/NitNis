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

async function getProductPaths() {
  await db.connectDb();
  const pathsSlug = await Product.distinct("slug");
  const paths = await Product.distinct("tip");
  const path = pathsSlug.map((tip) => ({
    params: { product: tip },
  }));
  const paths2 = paths.map((tip) => ({
    params: { shop: tip },
  }));
  return path + paths2;
}

const paths = { getPaths, getProductPaths };

export default paths;
