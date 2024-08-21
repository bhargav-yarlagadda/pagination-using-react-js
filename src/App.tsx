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
  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <div>
    <div className="grid grid-cols-1 bg-black sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" >
        {
          products.slice(page*10-10,page*10).map(
            (product)=>{
              if (product){
                return(
                  <div key={product.id} className="max-w-[300px] bg-blue-700 text-white rounded-md p-9 ">
                    <div className="max-w-40 h-40 flex mx-auto m-3 overflow-hidden ">
                    <img src={product.images[0]} alt={product.title} />
                    </div>
                    <div className="text-center" >
                      <p className="font-bold text-2xl" >{product.title}</p>
                      <p>{product.description}</p>
                      <p className="font-bold text-black" >price: {product.price}$</p>
                    </div>
                  </div>
                )
              }
            }
          )
          


        }
             
    </div>
    {products.length > 0 && <div className="flex gap-4 justify-center bg-black text-white ">
        <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "cursor pointer"}>◀</span>

        {[...Array(products.length / 10)].map((_, i) => {
          return <span key={i} className={page === i + 1 ? "" : "cursor-pointer "} onClick={() => selectPageHandler(i + 1)}>{i + 1}</span>
        })}

        <span onClick={() => selectPageHandler(page + 1)} className={page < products.length / 10 ? "" : "pagination__disable"}>▶</span>
      </div>}
      
    </div>
  );
};
export default App;
