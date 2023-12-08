import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  console.log(navigation);

  const isLoading = navigation.state === "loading";
  console.log(isLoading);

  return (
    <div className="layout">
      <Header />
      {isLoading && <Loader />}
      <main>
        <h1>content</h1>

        {/* render child routes  */}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
