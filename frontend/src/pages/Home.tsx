import Card from "@/components/Card";
import ToggleTheme from "@/components/ToggleTheme";
import PlusButton from "@/components/PlusButton";
import PageTitle from "@/components/PageTitle";
import StoreName from "@/components/StoreName";
import NavLayout from "@/components/NavLayout";
import { useEffect } from "react";
import { useProducts } from "@/contexts/ProductContext";

export interface Product{
  _id?:string;
  name:string;
  description:string | null;
  price:string;
  image:string | null;
  createdAt?:string;
  updatedAt?:string;
}

const Home = () => {
  const {products , getProducts} = useProducts()  as {products:Product[] ; getProducts: ()=> Promise<void>};
  useEffect(()=>{
    getProducts();
  },[])
  return (
    <div className="">
      <NavLayout>
        <StoreName/>
        <PageTitle>محصولات</PageTitle>
        <div className="flex gap-2 items-center text-[11px] sm:text-sm">
          <PlusButton/>
          <ToggleTheme/>
        </div>
      </NavLayout>
      <div className="items grid gap-8 grid-cols-autofit ">
        {!products ? <div>Loading...</div>:
          products.map(p => <Card key={p._id} product={p} />)
        }
        
      </div>
    </div>
    
  );
};

export default Home;
