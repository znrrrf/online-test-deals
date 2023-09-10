import React, { useEffect } from "react";
import { cartData } from "../api/service";
import { TableCarts } from "@/components";

interface Props {}

function Page(props: Props) {
  const {} = props;

  const dataCart = cartData();
  const headers: string[] = ["User", "Price(Total)", "Price(Discount)"];

  return (
    <div className="w-full min-h-screen mx-4 overflow-x-hidden">
      <section className="my-2  p-2 w-full flex justify-center md:block">
        <h1 className="font-bold text-2xl">Carts</h1>
      </section>

      <TableCarts headers={headers} />
    </div>
  );
}

export default Page;
