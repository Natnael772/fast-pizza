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
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
      <Header />
      {isLoading && <Loader />}
      {/* <Loader /> */}
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl ">
          {/* <h1>content</h1> */}

          {/* render child routes  */}
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
