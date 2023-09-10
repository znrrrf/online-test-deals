import { TableGlobal } from "@/components/";
import Image from "next/image";
import { getAllBrands, getAllCategory } from "./api/service";

interface headers {}

export default async function Home() {
  const headers: string[] = [
    "Image",
    "Product Name",
    "Brand",
    "Category",
    "Price",
  ];

  const allCategory = await getAllCategory();
  const allBrands = await getAllBrands();

  return (
    <main className="w-full min-h-screen mx-4 overflow-x-hidden">
      <section className="my-2  p-2 w-full flex justify-center md:block">
        <h1 className="font-bold text-2xl">Products</h1>
      </section>

      <TableGlobal
        allCategory={allCategory}
        allBrands={allBrands}
        headers={headers}
        side={"product"}
        productCart={undefined}
      />
    </main>
  );
}
