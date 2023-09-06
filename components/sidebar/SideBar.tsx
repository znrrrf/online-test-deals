"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BsBox2, BsCart2, BsChevronRight } from "react-icons/bs";

interface Props {}
interface navigationType {
  name: string;
  icon: any;
  navi: string;
}

function SideBar(props: Props) {
  const {} = props;
  const router = useRouter();
  const [isActive, setIsActive] = useState("/");
  const [open, setOpen] = useState(true);

  const navigation: navigationType[] = [
    {
      name: "Products",
      icon: BsBox2,
      navi: "/",
    },
    {
      name: "Carts",
      icon: BsCart2,
      navi: "/carts",
    },
  ];

  const NavigateTo = (navi: string) => {
    setIsActive(navi);
    router.push(navi);
  };

  return (
    <nav
      className={`bg-white ${
        open ? "w-[300px]" : "w-[80px]"
      } duration-300  h-screen `}
    >
      <div className=" flex w-full my-5 px-2 font-bold text-2xl">
        <div className="w-full overflow-x-hidden">
          <div className=" w-[300px]">
            {open ? (
              <h1 className="flex justify-center gap-1">
                ONLINE <span className="text-[#3F72AF]">TEST</span>
              </h1>
            ) : null}
          </div>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className={`relative flex items-center justify-center cursor-pointer -right-6  h-10 w-10  border-2 rounded-full bg-white p-3 z-50 ${
            !open && "rotate-180"
          } text-[20px]`}
        >
          <BsChevronRight />
        </div>
      </div>
      <div>
        <ul className="flex flex-col gap-5 pl-3 overflow-x-hidden">
          {navigation?.map((el, index) => {
            return (
              <li
                key={index}
                className={`flex items-center w-full cursor-pointer p-4 gap-7 border-r-8 ${
                  isActive === el.navi
                    ? "border-[#3F72AF] text-[#3F72AF]"
                    : "border-white"
                }  `}
                onClick={() => NavigateTo(el.navi)}
              >
                <div className="flex justify-center w-7 text-2xl">
                  <el.icon />
                </div>
                <span>{el.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
