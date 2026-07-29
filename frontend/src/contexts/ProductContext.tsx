import { createContext, useContext, useState } from "react";
import type { AuxProps } from "@/contexts/themeContext";
import type { Product } from "@/pages/Home";


const ProductContext = createContext({});

export const ProductProvider = ({children}:AuxProps)=>{
    const [products, setProduct] = useState<Product[]>([]);

    const getProducts = async() : Promise<void>=>{
        try{
            const res = await fetch('/api/products' , {method:"GET"});
            const data = await res.json();
            setProduct(data.data);
        }
        catch(error){
            console.error("Error getProducts: " , error)
        }
            
    }
    const createProduct = async (newProduct: Product): Promise<{success:boolean; data?: Product; error?: unknown}>=>{
        try{
            const res = await fetch('/api/products', {method:"POST", headers:{"Content-Type":"application/json"} , body:JSON.stringify(newProduct)});
            const data = await res.json();

            if (!res.ok || !data?.success) {
                console.error("Error createProduct: ", data?.message || "Unknown error");
                return {success: false, error: data?.message || "Unknown error"};
            }

            setProduct((state)=>[...state,data.data]);
            return {success: true , data: data.data}
        }
        catch(error){
            console.error("Error createProduct: " , error)
            return {success: false , error: error}
        }
    }
    const deleteProduct = async (pid: string)=>{
        try {
            const res = await fetch(`/api/products/${pid}` , {method:"DELETE"});
            const data = await res.json();
            if(!res.ok || !data.success){
                return {success:false , message:"Error deleteProduct"}
            }
            setProduct((state)=> state.filter((product)=>product._id !== pid));
            return {success:true , message:"محصول با موفقیت حذف شد"};
        } catch {
            return{success:false , message:`ارور در حذف محصول`};
        }
    }
    const updateProduct = async (pid:string , newProduct:Product):Promise<{success: boolean , data?: Product , message?:unknown}> =>{
        try {
            const res = await fetch(`/api/products/${pid}` , {method:"PUT" ,headers:{"Content-Type":"application/json"}, body:JSON.stringify(newProduct)});
            const data = await res.json();
            if(!res.ok || !data?.data){
                return {success:false , message:"Error updateProduct"};
            }
            setProduct((state)=> state.map((product)=> product._id === pid ? data.data : product));
            return {success:true , data: data.data};
        } catch (error) {
            return {success:false , message:error}
        }
    }
    return <ProductContext.Provider value={{products , getProducts , createProduct , deleteProduct , updateProduct}}>{children}</ProductContext.Provider>
}
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts=()=>{
    const context = useContext(ProductContext);
    if(!context){
        throw new Error("useProdects must be used within ProductProvider")
    }
    return context;

}