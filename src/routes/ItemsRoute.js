import React, { useState } from "react";
import Nav from "../components/Nav";
import { ItemsProvider } from "../context/ItemsContext";
import ItemsUI from "../pages/itemsPage/ItemsUI";

export default function ItemsRoute() {
  return (
    <>
      <Nav />
      <ItemsProvider>
        <ItemsUI />
      </ItemsProvider>
    </>
  );
}
