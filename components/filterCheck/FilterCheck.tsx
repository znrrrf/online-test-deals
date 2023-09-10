"use client";
import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronUp } from "react-icons/bs";

interface Props {
  allCategory: string[] | undefined;
  allBrands: string[] | undefined;
  setCategoryFilter: any;
  categoryFilter: string[];
  brandFilter: string[];
  setBrandFilter: any;
  submiting: boolean;
  priceFilter: number;
  setPriceFilter: any;
  side: string;
}

function FilterCheck(props: Props) {
  const {
    allCategory,
    allBrands,
    setCategoryFilter,
    categoryFilter,
    brandFilter,
    setBrandFilter,
    submiting,
    priceFilter,
    setPriceFilter,
    side,
  } = props;
  const [open, setOpen] = useState(false);

  const toggleFilter = () => {
    setOpen(!open);
  };
  const getValueCategory = (status: boolean, value: string) => {
    const tmpCategory = categoryFilter;

    if (!tmpCategory.includes(value)) {
      if (status === true) {
        tmpCategory.push(value);
        setCategoryFilter(tmpCategory);
      }
    } else {
      if (status === false) {
        const deleteData = tmpCategory.filter((category) => category !== value);
        setCategoryFilter(deleteData);
      }
    }
  };
  const getValueBrand = (status: boolean, value: string) => {
    const tmpbrand = brandFilter;

    if (!tmpbrand.includes(value)) {
      if (status === true) {
        tmpbrand.push(value);
        setBrandFilter(tmpbrand);
      }
    } else {
      if (status === false) {
        const deleteData = tmpbrand.filter((brand) => brand !== value);
        setBrandFilter(deleteData);
      }
    }
  };

  useEffect(() => {
    if (submiting) {
      setOpen(false);
    }
  }, [submiting]);

  return (
    <div className="text-[11px] w-[350px]  flex flex-col">
      <div className=" h-full flex justify-end items-center">
        <div
          onClick={() => toggleFilter()}
          className={`bg-white h-10 p-2 flex items-center justify-center gap-1 ${
            side === "product" ? "rounded-l-lg" : "rounded-lg"
          }  cursor-pointer`}
        >
          <p>Filter</p>

          <div className={`${!open && "rotate-180"}`}>
            <BsChevronUp />
          </div>
        </div>
      </div>
      <div
        className={`${
          open ? "flex" : "hidden"
        } duration-300  absolute bg-white shadow-lg rounded-lg overflow-scroll h-fit -right-1 mr-4  justify-center ${
          side === "product" ? "top-32" : "top-56"
        } `}
      >
        <div className={` p-2 max-h-[500px]`}>
          {side === "product" ? (
            <>
              <div className="mt-3">
                <label className="font-bold">Category</label>
              </div>
              <ul className="mt-3 grid grid-cols-2 md:grid-cols-3 w-[280px] gap-3">
                {allCategory?.map((el, index) => {
                  return (
                    <li key={index} className="flex items-center gap-1 w-full">
                      <input
                        type="checkbox"
                        value={el}
                        onChange={(e) =>
                          getValueCategory(e.target.checked, e.target.value)
                        }
                        id={el}
                      />
                      <label htmlFor={el}>{el}</label>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3">
                <label className="font-bold mt-1">Brands</label>
              </div>
              <ul className="mt-2 grid grid-cols-2 md:grid-cols-3 w-[280px] gap-3">
                {allBrands?.map((el, index) => {
                  return (
                    <li key={index} className="flex items-center gap-1 w-full">
                      <input
                        type="checkbox"
                        value={el}
                        id={el}
                        onChange={(e) =>
                          getValueBrand(e.target.checked, e.target.value)
                        }
                      />
                      <label htmlFor={el}>{el}</label>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}

          <div className="mt-3">
            <label className="font-bold mt-1">Price Range</label>
          </div>
          <ul className="mt-3 grid grid-cols-2 md:grid-cols-3 w-[280px] gap-3 pb-4">
            <li className="flex items-center gap-1">
              <input
                checked={Number(priceFilter) === 0 ? true : false}
                type="checkbox"
                value={0}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
              All
            </li>
            <li className="flex items-center gap-1">
              <input
                checked={Number(priceFilter) === 50 ? true : false}
                type="checkbox"
                value={50}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
              <BsChevronLeft />
              50
            </li>
            <li className="flex items-center gap-1">
              <input
                checked={Number(priceFilter) === 100 ? true : false}
                type="checkbox"
                value={100}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
              <BsChevronLeft />
              100
            </li>
            <li className="flex items-center gap-1">
              <input
                checked={Number(priceFilter) === 500 ? true : false}
                type="checkbox"
                value={500}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
              <BsChevronLeft />
              500
            </li>
            <li className="flex items-center gap-1">
              <input
                checked={Number(priceFilter) === 1000 ? true : false}
                type="checkbox"
                value={1000}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
              <BsChevronLeft />
              1000
            </li>
            <li className="flex items-center gap-1">
              <input
                checked={Number(priceFilter) === 2000 ? true : false}
                type="checkbox"
                value={2000}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
              <BsChevronLeft />
              2000
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FilterCheck;
