const getAllProduct = async (word: string, side: string) => {
  try {
    if (side === "product") {
      if (word.length > 0) {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${word}`
        );

        const data = await res.json();
        const dataSliced: any[] = data.products.slice(0, 5);
        return data.products;
      } else {
        const res = await fetch("https://dummyjson.com/products/");
        const data = await res.json();
        const dataSliced: any[] = data.products.slice(0, 5);
        return data.products;
      }
    } else if (side === "cartDetail") {
    }
  } catch (error) {
    console.log(error);

    return { data: [{ message: "error" }] };
  }
};

const getAllCategory = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllBrands = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products/");
    const data = await res.json();

    const uniqueBrands: string[] = [];
    await data.products.forEach((product: any) => {
      if (!uniqueBrands.includes(product.brand)) {
        uniqueBrands.push(product.brand);
      }
    });

    return uniqueBrands;
  } catch (error) {
    console.log(error);
  }
};

const getPriceRange = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products/");
    const data = await res.json();
    const uniquePrice: number[] = [];
    await data.products.forEach((product: any) => {
      if (!uniquePrice.includes(product.price)) {
        uniquePrice.push(product.price);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const filteringData = async (word: string) => {
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${word}`);
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.log(error);
  }
};

const cartData = async () => {
  interface User {
    id: number;
  }
  interface Cart {
    userId: number;
  }
  try {
    const resCart = await fetch("https://dummyjson.com/carts");
    const allCart = await resCart.json();

    return allCart.carts;
  } catch (error) {
    console.log(error);
  }
};

const getUserData = async () => {
  try {
    const resUsers = await fetch("https://dummyjson.com/users");
    const allUsers = await resUsers.json();

    return allUsers.users;
  } catch (error) {
    console.log(error);
  }
};

const getOneCart = async (id: number) => {
  try {
    const resCart = await fetch("https://dummyjson.com/carts");
    const allCart = await resCart.json();

    const cart = allCart.carts.filter((data: any) => data.id === Number(id));
    return cart;
  } catch (error) {
    console.log(error);
  }
};
const getOneUser = async (id: any) => {
  try {
    const resUsers = await fetch("https://dummyjson.com/users");
    const allUser = await resUsers.json();

    const user = allUser.users.filter((data: any) => data.id == Number(id));
    return user;
  } catch (error) {
    console.log(error);
  }
};
export {
  getUserData,
  getAllProduct,
  getAllCategory,
  getAllBrands,
  getPriceRange,
  filteringData,
  cartData,
  getOneCart,
  getOneUser,
};
