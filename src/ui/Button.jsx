import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, to, disabled, type }) {
  if (to)
    return (
      <Link className={styles[type]} to={to}>
        Order pizzas
      </Link>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {" "}
      {children}
    </button>
  );
}
