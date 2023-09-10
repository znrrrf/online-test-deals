"use client";
import { getAllProduct } from "@/app/api/service";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FilterCheck, PaginationGlob, SearchBar } from "..";

interface Props {
  headers: string[];
  allCategory: string[] | undefined;
  allBrands: string[] | undefined;
  side: string;
  productCart: any;
}

function TableGlobal(props: Props) {
  const { headers, allCategory, allBrands, side, productCart } = props;
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [allProduct, setAllProduct] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [wholeProducts, setWholeProducts] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [justStarted, setJustStarted] = useState(false);
  const itemsPerPage = 5;

  const fetchingData = async (data: any) => {
    let allproduct: any;
    if (!data) {
      allproduct = await getAllProduct(search, side);
    } else if (data) {
      allproduct = data;
    }

    const filtered: any[] = allproduct?.filter((product: any) => {
      if (categoryFilter.length > 0 && brandFilter.length > 0) {
        if (Number(priceFilter) < 1) {
          return (
            categoryFilter.includes(product.category) &&
            brandFilter.includes(product.brand)
          );
        } else {
          return (
            categoryFilter.includes(product.category) &&
            brandFilter.includes(product.brand) &&
            Number(product.price) < Number(priceFilter)
          );
        }
      } else if (categoryFilter.length > 0 && brandFilter.length == 0) {
        if (Number(priceFilter) < 1) {
          return categoryFilter.includes(product.category);
        } else {
          return (
            categoryFilter.includes(product.category) &&
            Number(product.price) < Number(priceFilter)
          );
        }
      } else if (categoryFilter.length < 1 && brandFilter.length > 0) {
        if (priceFilter < 1) {
          return brandFilter.includes(product.category);
        } else {
          return (
            brandFilter.includes(product.category) &&
            Number(product.price) < Number(priceFilter)
          );
        }
      } else if (categoryFilter.length < 1 && brandFilter.length < 1) {
        if (priceFilter < 1 && allproduct) {
          return allproduct;
        } else {
          return Number(product.price) < Number(priceFilter);
        }
      }
    });

    setAllProduct(filtered);
  };

  const remembering = async () => {
    await new Promise(() => {
      const data = localStorage.getItem("product");
      if (data) {
        const dataParse = JSON.parse(data);

        setBrandFilter(dataParse.brandFilter || []);
        setPriceFilter(dataParse.priceFilter || []);
        setCategoryFilter(dataParse.categoryFilter || []);
        setSearch(dataParse.search || "");

        setJustStarted(true);
      } else {
        fetchingData(undefined);
      }
    });
  };

  useEffect(() => {
    if (side === "product") {
      remembering();
    } else if (side === "cartDetail" && productCart.length > 0) {
      fetchingData(productCart);
    }
  }, [productCart, side]);

  useEffect(() => {
    if (justStarted) {
      fetchingData(undefined);
    }
  }, [justStarted]);

  useEffect(() => {
    if (allProduct) {
      setWholeProducts(allProduct);
      const pageCount = Math.ceil(allProduct.length / itemsPerPage);
      setPageCount(pageCount);

      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const currentItems = allProduct.slice(startIndex, endIndex);
      setCurrentItems(currentItems);
    }
  }, [allProduct, itemOffset]);

  const handlePageClick = (event: any) => {
    if (allProduct) {
      const newOffset = (event.selected * itemsPerPage) % allProduct.length;
      setItemOffset(newOffset);
      setCurrentPage(event.selected);
    }
  };

  useEffect(() => {}, [categoryFilter]);
  const submited = (e: any) => {
    if (e) e.preventDefault();
    if (side === "product") {
      fetchingData(undefined);
    } else if (side === "cartDetail" && productCart.length > 0) {
      fetchingData(productCart);
    }
    setSubmiting(true);
    setCurrentPage(0);
    localStorage.setItem(
      side,
      JSON.stringify({ priceFilter, categoryFilter, brandFilter, search })
    );
  };

  return (
    <>
      <form onSubmit={submited}>
        <section className="flex justify-end">
          <FilterCheck
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            allCategory={allCategory}
            allBrands={allBrands}
            setBrandFilter={setBrandFilter}
            brandFilter={brandFilter}
            submiting={submiting}
            setPriceFilter={setPriceFilter}
            priceFilter={priceFilter}
            side={side}
          />
          {side === "product" ? (
            <SearchBar
              allProduct={wholeProducts}
              setSearch={setSearch}
              search={search}
              submiting={submiting}
              setSubmiting={setSubmiting}
            />
          ) : null}
        </section>
      </form>

      <section className="overflow-x-scroll w-auto rounded-2xl text-[11px] mt-2 mb-5">
        <table className="table-fixed text-left w-full">
          <thead className="w-full">
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
                return (
                  <tr key={index}>
                    <td className="w-[150px] p-4">{el.title}</td>
                    {side === "product" ? (
                      <>
                        <td className="flex w-[250px] p-4">
                          <Image
                            src={el.images[0]}
                            alt={el.title}
                            width={100}
                            height={100}
                            className="h-[50px] w-auto"
                          />
                        </td>
                        <td className="w-[150px] p-4">{el.brand}</td>
                        <td className="w-[150px] p-4">{el.category}</td>
                      </>
                    ) : null}

                    <td className="w-[150px] p-4">{el.price}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  <h1>No Product</h1>
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
    </>
  );
}

export default TableGlobal;
