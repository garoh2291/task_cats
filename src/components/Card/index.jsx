import React from "react";
import "./styles.css";

export const Card = ({ card }) => {
  const { url } = card;
  return (
    <div className="img_card">
      <img src={url} alt="cat" />
    </div>
  );
};
