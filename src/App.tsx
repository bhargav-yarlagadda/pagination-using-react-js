import { useState, useEffect } from "react";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [prodLimit, setProdLimit] = useState<number>(100);
  const [click, handleClick] = useState<number>(0);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=${prodLimit}`);
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [click]);

  const handleSearch = (value: string) => {
    const num = Number(value);
    if (isNaN(num)) {
      setProdLimit(100);
    } else {
      setProdLimit(num);
    }
  };

  const selectPageHandler = (selectedPage: number) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(products.length / 10) && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      <div className="bg-black flex flex-col items-center justify-center p-4">
        <label htmlFor="helper-text" className="text-white">Enter number of items to be fetched</label>
        <div className="flex gap-2">
          <input
            type="input"
            id="helper-text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="100"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="text-white bg-blue-500 p-2 rounded-lg" onClick={() => { handleClick(click + 1); }}>Search</button>
        </div>
      </div>
      <div className="grid grid-cols-1 bg-black sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.slice(page * 10 - 10, page * 10).map((product) => (
          <div key={product.id} className="max-w-[300px] bg-blue-700 text-white rounded-md p-9">
            <div className="max-w-40 h-40 flex mx-auto m-3 overflow-hidden">
              <img src={product.images[0]} alt={product.title} />
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl">{product.title}</p>
              <p>{product.description}</p>
              <p className="font-bold text-black">Price: {product.price}$</p>
            </div>
          </div>
        ))}
      </div>
      {products.length > 0 && (
        <div className="flex gap-4 justify-center p-4 bg-black text-white">
          <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "cursor-pointer" : "pointer-events-none"}>◀</span>
          {[...Array(Math.ceil(products.length / 10))].map((_, i) => (
            <span key={i} className={page === i + 1 ? "font-bold" : "cursor-pointer"} onClick={() => selectPageHandler(i + 1)}>
              {i + 1}
            </span>
          ))}
          <span onClick={() => selectPageHandler(page + 1)} className={page < Math.ceil(products.length / 10) ? "cursor-pointer" : "pointer-events-none"}>▶</span>
        </div>
      )}
    </div>
  );
};

export default App;
