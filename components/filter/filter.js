import { useRef, useState } from "react";
import classes from "./styles.module.scss";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/router";

export default function Filter({ categories, togglefilter, refa }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const router = useRouter();

  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const handleCategoryChange = (category, e) => {
    e.preventDefault();
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }

    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    router.push(`${router.query.shop}?categories=${newCategories.join(",")}`);
  };

  return (
    <div className={`${classes.filter}`} onClick={handleClick} ref={refa}>
      <div className={classes.filter__naslov}>
        <h1>Filter</h1>
        <RiCloseLine onClick={togglefilter} />
      </div>
      <div className={classes.katergorije}>
        <h2>Kategorija proizvoda</h2>
        <ul className={classes.katergorije__list}>
          {sortedCategories.map((category) => (
            <li key={category._id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.slug)}
                  onChange={(e) => handleCategoryChange(category.slug, e)}
                  className={classes.box}
                />
                <span>{category.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
