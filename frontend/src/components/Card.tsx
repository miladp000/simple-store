import { MdDelete, MdEdit } from "react-icons/md";
import type { Product } from "@/pages/Home";
import { useProducts } from "@/contexts/ProductContext";
import Toast from "@/components/Toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import CreateForm from "./CreateForm";

export interface Ires{
  success:boolean ;
  message:string;
}
interface CardProps {
  product: Product;
}

const Card = ({product}: CardProps) => {
  const {name, price, image = "", description = "" , _id} = product
  const {deleteProduct} = useProducts() as {deleteProduct:(_id:string)=>Ires};
  const [isEditMode , setIsEditMode] = useState(false);
  const handleDelete = async()=>{
    if(_id){
      const response = await deleteProduct(_id);
      console.log(_id);
      if (response.success) {
        Toast("success", response.message);
      } else {
        Toast("warning", response.message);
      }
    }else{
      console.log(_id);
    }
  }
  
  return (
    <>
    <div className="card p-2 flex flex-col justify-between rounded bg-mist-100 shadow-xl border border-gray-200 dark:border-gray-500 dark:bg-stone-800">
      <div className="flex flex-row gap-2 items-start grow">
        <div className="flex flex-col w-40 md:w-28 h-full gap-2 justify-between ">
          <div className="h-40 w-40 overflow-hidden rounded-2xl border p-2 md:h-28 md:w-28 shrink-0">
            <img
              className="h-full w-full rounded-xl object-cover object-center"
              src={image || ""}
              alt=""
            />
          </div>
          <h3 className="dark:text-green-primary text-dark-tertiary font-bold self-center">
            {price}{" "}
            <span className="text-[0.8rem] dark:text-gray-300 text-gray-400 font-light">
              تومان
            </span>
          </h3>
        </div>
        <div className="flex flex-col justify-between gap-2 ">
          <h1 className="text-xl font-bold text-stone-600 dark:text-inherit">
            {name}
          </h1>
          <p className="dark:text-mist-300 text-[0.8rem]">{description}</p>
        </div>
      </div>
      <div className="flex justify-between p-2 gap-4 border-t">
        <button onClick={()=>setIsEditMode(true)} className="flex gap-1 items-center justify-center dark:bg-stone-700 hover:dark:bg-stone-600 text-secendary dark:text-green-primary  hover:bg-secendary hover:text-white py-2 w-full rounded-xl">
          ویرایش
          <MdEdit />
        </button>
        <button onClick={handleDelete} className="flex gap-1 items-center justify-center dark:bg-[#3F2224] hover:dark:bg-[#5e3235] text-rose-600 hover:bg-rose-200 dark:text-rose-300  py-2 w-full rounded-xl transition-colors">
          حذف
          <MdDelete className="pb-1 text-[1.3rem]" />
        </button>
      </div>
    </div>
      <Dialog open={isEditMode} onOpenChange={setIsEditMode}>
      <DialogContent className="p-10 !md:w-[60%] w-full !max-w-150">
        <CreateForm mode={'edit'} initialData={product} editIsDone={()=>setIsEditMode(false)}/>
        
      </DialogContent>
    </Dialog>

    </>
  );
};

export default Card;
