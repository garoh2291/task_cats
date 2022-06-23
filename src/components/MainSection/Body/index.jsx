import React from "react";
import { useSelector } from "react-redux";
import { Card } from "../../Card";
import "./styles.css";

export const Body = () => {
  const { items } = useSelector((state) => state.categories);

  if (items.length === 0) {
    return <h1>No Items</h1>;
  }
  return (
    <div className="main_section_body">
      {items.map((item) => (
        <Card key={item.id} card={item} />
      ))}
    </div>
  );
};
