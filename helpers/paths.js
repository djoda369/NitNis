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

  const shops = await Product.distinct("tip");
  const allPaths = [];

  for (const shop of shops) {
    const productsForShop = await Product.find({ tip: shop });

    productsForShop.forEach((product) => {
      allPaths.push({
        params: { shop: shop, product: product.slug },
      });
    });
  }

  return allPaths;
}

const paths = { getPaths, getProductPaths };

export default paths;
