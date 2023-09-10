"use client";
import { cartData, getUserData } from "@/app/api/service";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PaginationGlob } from "..";

interface Props {
  headers: string[];
}

function TableCarts(props: Props) {
  const { headers } = props;
  const itemsPerPage = 5;
  const [carts, setCarts] = useState<any[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const route = useRouter();

  const NavigateTo = (navi: string) => {
    route.push(navi);
  };

  const fetchingCart = async () => {
    const data = await cartData();
    setCarts(data);
  };
  const fetchingUser = async () => {
    const data = await getUserData();
    setUsers(data);
  };
  useEffect(() => {
    fetchingCart();
    fetchingUser();
  }, []);

  useEffect(() => {
    if (carts) {
      const pageCount = Math.ceil(carts.length / itemsPerPage);
      setPageCount(pageCount);

      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const currentItems = carts.slice(startIndex, endIndex);
      setCurrentItems(currentItems);
    }
  }, [carts, itemOffset]);

  const handlePageClick = (event: any) => {
    if (carts) {
      const newOffset = (event.selected * itemsPerPage) % carts.length;
      setItemOffset(newOffset);
      setCurrentPage(event.selected);
    }
  };
  return (
    <div>
      <section className="overflow-x-scroll w-auto rounded-2xl text-[11px] mb-5">
        <table className="table-fixed text-left w-full">
          <thead>
            <tr>
              {headers?.map((el, index) => {
                return (
                  <th key={index} className=" w-[150px]  bg-[#F9F7F7] p-4">
                    {el}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white overflow-y-scroll w-full">
            {currentItems.length > 0 ? (
              currentItems.map((el: any, index: number) => {
                const user = users.find((us) => us.id === el.userId);
                return (
                  <tr
                    onClick={() => NavigateTo(`carts/${el.id}`)}
                    key={index}
                    className="cursor-pointer hover:bg-[#3F72AF] hover:text-[#F9F7F7]"
                  >
                    <td className="w-[150px] p-4">
                      {user ? user.username : "No User"}
                    </td>
                    <td className="w-[150px] p-4">{el.total}</td>
                    <td className="w-[150px] p-4">{el.discountedTotal}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  <h1>No Cart</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <section className="flex justify-end mb-5 text-[11px]">
        <PaginationGlob
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          currentPage={currentPage}
        />
      </section>
    </div>
  );
}

export default TableCarts;
