"use client";
import { filteringData } from "@/app/api/service";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  setSearch: any;
  search: string;
  allProduct: any[] | undefined;
  submiting: boolean;
  setSubmiting: any;
}

function SearchBar(props: Props) {
  const { setSearch, search, allProduct, submiting, setSubmiting } = props;
  const [productTitles, setProductTitles] = useState<any[]>([]);
  const [timeoutId, setTimeoutId] = useState<any>(0);
  const [choosed, setChoosed] = useState(false);

  useEffect(() => {
    setSubmiting(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (search.length > 1 && !choosed) {
      const newTimeoutId: any = setTimeout(() => {
        filteringData(search)
          .then((data) => setProductTitles(data))
          .catch((err) => console.log(err));
      }, 1000);
      setTimeoutId(newTimeoutId);
    } else {
      if (productTitles.length > 0) {
        setProductTitles([]);
      }
    }
    setChoosed(false);
  }, [search]);

  useEffect(() => {
    setProductTitles([]);
  }, [submiting]);

  const chooseTitle = (word: string) => {
    setSearch(word);
    setProductTitles([]);
    setChoosed(true);
  };

  return (
    <div className="py-2 flex text-[11px]">
      <div>
        <input
          type="search"
          placeholder="search product name..."
          className="h-10 p-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute bg-white mt-2  shadow-lg">
          <ul>
            {productTitles?.map((el, index) => {
              return (
                <li
                  key={index}
                  onClick={() => chooseTitle(el.title)}
                  className="hover:bg-[#DBE2EF] cursor-pointer p-1"
                >
                  {el.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="w-10   flex justify-center items-center bg-[#3F72AF] text-[#F9F7F7] rounded-r-lg cursor-pointer">
        <button type="submit">
          <BsSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
