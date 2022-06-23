import React from "react";
import "./styles.css";

export const NavItem = ({ category, addCategoryDetails }) => {
  const { id, name } = category;
  return (
    <li className="category_item" onClick={() => addCategoryDetails(id)}>
      {name}
    </li>
  );
};
