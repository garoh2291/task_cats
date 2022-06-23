import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryDetailsThunk,
  setCategoriesThunk,
} from "../../Redux/categorySlice";
import { NavItem } from "../NavItem";
import "./styles.css";

export const NavList = () => {
  const [countPage, setCountPage] = useState(1);
  const [isCategory, setIsCategory] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (isFetching) {
      dispatch(addCategoryDetailsThunk({ isCategory, countPage }));
      setIsFetching((prev) => !prev);
    }
  }, [dispatch, isCategory, isFetching, countPage]);

  const addCategoryDetails = (id) => {
    if (id === isCategory) {
      setCountPage((prev) => prev + 1);
    } else {
      setIsCategory(id);
      setCountPage(1);
    }
    setIsFetching((prev) => !prev);
  };

  if (!categories) {
    return <h1>Loading</h1>;
  }
  return (
    <nav>
      <ul className="categie_list">
        {categories.map((category) => (
          <NavItem
            key={category.id}
            category={category}
            addCategoryDetails={addCategoryDetails}
          />
        ))}
      </ul>
    </nav>
  );
};
