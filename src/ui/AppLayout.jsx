import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout() {
  return (
    <div className="layout">
      <Header />

      <main>
        <h1>content</h1>

        {/* render child routes  */}
        <Outlet />
      </main>
    </div>
  );
}
