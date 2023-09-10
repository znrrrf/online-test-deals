"use client";
import {
  getAllBrands,
  getAllCategory,
  getOneCart,
  getOneUser,
} from "@/app/api/service";
import { TableGlobal } from "@/components";
import React, { useState, useEffect } from "react";

interface Props {
  params: {
    cartsId: string;
  };
}

interface User {
  username: string;
}
interface Cart {
  date: number;
  totalProducts: number;
  totalQuantity: number;
  products: any[];
}

function Page(props: Props) {
  const { params } = props;

  const [cartData, setCartData] = useState<Cart | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [product, setProduct] = useState<any[]>([]);
  const [category, setCategory] = useState<any[]>([]);
  const [brands, setBrands] = useState<string[] | undefined>([]);

  const headers: string[] = ["Product Name", "Price"];

  const getCartData = async () => {
    const allCategory = await getAllCategory();
    const allBrands = await getAllBrands();
    const cart = await getOneCart(Number(params.cartsId));

    setBrands(allBrands);

    setCategory(allCategory);
    setCartData(cart[0]);
    setProduct(cart[0].products);
  };

  const getUserData = async (cart: any) => {
    const user = await getOneUser(cart.userId);
    setUserData(user[0]);
  };

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    if (cartData) getUserData(cartData);
  }, [cartData]);

  return (
    <div className="w-full min-h-screen mx-4 overflow-x-hidden">
      <section className="my-2  p-2 w-full flex justify-center md:block">
        <h1 className="font-bold text-2xl">Details Cart</h1>
      </section>
      <section className="w-full my-5">
        <ul className="bg-white font-bold p-2 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-1">
          <li className="flex gap-2">
            <p>User :</p>
            <p>{userData?.username ? userData.username : "No data"}</p>
          </li>
          <li className="flex gap-2">
            <p># of Items :</p>
            <p>
              {cartData?.totalProducts ? cartData?.totalProducts : "No data"}
            </p>
          </li>
          <li className="flex gap-2">
            <p>Added On :</p>
            <p>{cartData?.date ? cartData?.date : "No data"}</p>
          </li>

          <li className="flex gap-2">
            <p>Total Amount :</p>
            <p>
              {cartData?.totalQuantity ? cartData?.totalQuantity : "No data"}
            </p>
          </li>
        </ul>
      </section>
      <TableGlobal
        allCategory={category}
        allBrands={brands}
        headers={headers}
        side={"cartDetail"}
        productCart={product}
      />
    </div>
  );
}

export default Page;
