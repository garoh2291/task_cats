import React, { memo } from "react";
import { NavList } from "../NavList";
import "./styles.css";

export const Navbar = memo(() => {
  return (
    <div className="navigation_bar">
      <NavList />
    </div>
  );
}, []);
