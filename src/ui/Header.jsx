import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <header className="font-roboto flex items-center  justify-between border-b border-stone-200 bg-yellow-500 px-4  py-3 font-medium uppercase sm:px-6">
      <Link to="/" className="tracking-normal">
        Fast Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
