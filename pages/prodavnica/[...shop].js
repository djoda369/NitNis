import ProdavnicaHeader from "@/components/prodavnicaHeader";
import db from "@/helpers/db";
import classes from "../../styles/ViewProducts.module.scss";
import Cath from "@/models/Category";
import Product from "@/models/Products";
import { useRef, useState, useEffect } from "react";
import Filter from "@/components/filter/filter";
import { CSSTransition } from "react-transition-group";
import { useRouter } from "next/router";
import ItemsGrid from "@/components/shopGrid";
import Footer from "@/components/footer";
import { VscListFilter } from "react-icons/vsc";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import paths from "@/helpers/paths";

export default function Shop({ shoes, slug, selectedCategories }) {
  const [filter, showFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const cath = shoes.map((shoe) => shoe.category);
  const filterRef = useRef(null);
  const [displeyShoes, setDisplayShoes] = useState(shoes);
  const [sortValue, setSortValue] = useState("Sortiraj");
  console.log(slug);

  const router = useRouter();

  const togglefilter = function () {
    showFilter((prevstate) => !prevstate);
  };

  const toggleSort = function () {
    setSort((prevstate) => !prevstate);
  };

  const sortDown = function () {
    if (selectedCategories.length > 0) {
      setDisplayShoes(filteredShoes.sort((a, b) => b.price - a.price));
    }
    setDisplayShoes(shoes.sort((a, b) => b.price - a.price));
    setSortValue("Cene opadajuće");
  };

  const sortUp = function () {
    if (selectedCategories.length > 0) {
      setDisplayShoes(filteredShoes.sort((a, b) => a.price - b.price));
    }
    setDisplayShoes(shoes.sort((a, b) => a.price - b.price));
    setSortValue("Cene rastuće");
  };

  const filteredShoes =
    selectedCategories.length > 0
      ? shoes.filter((shoe) => selectedCategories.includes(shoe.category.slug))
      : shoes;

  return (
    <>
      <div className={classes.obuca}>
        <ProdavnicaHeader active="prodavnica" background={slug} />
        <CSSTransition
          in={filter}
          nodeRef={filterRef}
          unmountOnExit
          timeout={500}
          classNames={{
            enter: classes.dropdownFormEnter,
            enterActive: classes.dropdownFormEnterActive,
            exit: classes.dropdownFormExit,
            exitActive: classes.dropdownFormExitActive,
          }}
        >
          <div
            className={classes.filtercontainer}
            ref={filterRef}
            onClick={togglefilter}
          >
            <Filter
              categories={cath}
              togglefilter={togglefilter}
              selectedCategories={selectedCategories}
              ref={filterRef}
            />
          </div>
        </CSSTransition>
        <div className={classes.obuca__container}>
          <div className={classes.obuca__filter}>
            <div className={classes.filter} onClick={togglefilter}>
              <VscListFilter />
              <span>filter</span>
            </div>
            <div className={classes.sort}>
              {/* <span className={classes.sort_1}>sortiraj po:</span> */}
              <div className={classes.sort_2} onClick={toggleSort}>
                <span>{sortValue}</span>
                {sort && (
                  <div className={classes.sort__dropdown}>
                    <span onClick={sortDown}>Cene opadajuća</span>
                    <span onClick={sortUp}>Cene rastuća</span>
                  </div>
                )}
                <MdOutlineKeyboardArrowDown />
              </div>
            </div>
          </div>
          <ItemsGrid filteredShoes={filteredShoes} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const slug = params.shop[0];
  const query = params.shop;

  console.log("kveri", query);

  db.connectDb();

  const categoriesParam = query.find((element) =>
    element.includes("categories=")
  );

  const categoriesValue = categoriesParam ? categoriesParam.split("=")[1] : "";
  const selectedCategories = categoriesValue ? categoriesValue.split(",") : [];

  let shoes = await Product.find({ tip: slug })
    .populate({ path: "category", model: Cath })
    .lean();

  return {
    props: {
      shoes: JSON.parse(JSON.stringify(shoes)),
      selectedCategories: selectedCategories,
      slug,
    },
  };
}

export async function getStaticPaths() {
  db.connectDb();
  const path = await paths.getPaths();

  return {
    paths: path,
    fallback: "blocking",
  };
}
