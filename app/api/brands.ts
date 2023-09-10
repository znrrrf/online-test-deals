export default async (req: Request, res: any) => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      error: "Gagal mengambil data produk",
    });
  }
};
