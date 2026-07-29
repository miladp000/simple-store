import React, { useState } from "react";
import { useProducts } from "@/contexts/ProductContext";
import Toast from "@/components/Toast";
import type { Ires } from "@/components/Card";
import type { Product } from "@/pages/Home";

interface IErrors {
  name: string;
  price: string;
}
type TProp = {
  mode?: "create" | "edit";
  initialData?: Product | null;
  editIsDone?: ()=>void;
};

const CreateForm = ({ mode = "create", initialData = null , editIsDone }: TProp) => {
  const { createProduct, updateProduct } = useProducts() as {
    createProduct: (product: Product) => Ires;
    updateProduct: (id: string, product: Product) => Ires;
  };
  const [errors, setErrors] = useState<Partial<IErrors>>({});
  const [inputs, setInput] = useState<Product>(
    !initialData
      ? {
          _id: "",
          name: "",
          price: '',
          description: "",
          image: "",
          createdAt: "",
          updatedAt: "",
        }
      : initialData,
  );
  const createFetch = async ()=>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {_id , createdAt , updatedAt , ...products} = inputs;
    const res = await createProduct(products);
      if (res && res.success) {
        Toast("success", "محصول با موفقیت اضافه شد");
      } else {
        Toast("warning", "ارور در ایجاد محصول");
      }
  }
  const updateFetch= async()=>{
    if (!initialData?._id) {
      Toast("warning", "شناسه محصول یافت نشد");
      return;
    }
    const res = await updateProduct(initialData._id, inputs);
    if (res && res.success) {
      Toast("success", "محصول با موفقیت ویرایش شد");
    } else {
      Toast("warning", res?.message || "خطا در ویرایش محصول");
    }
  }

  const faToEn = (str: string) =>
  str.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());

  const handleInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
  if (name === 'price') {
    const numericOnly = e.target.value.replace(/[^0-9۰-۹]/g, '');
    const english = faToEn(numericOnly);
    const num = parseInt(english, 10);
    const formatted = isNaN(num) ? '' : num.toLocaleString('fa-IR');

    setInput(state => ({ ...state, [name]: formatted }));
  } else {
    setInput(state => ({ ...state, [name]: value }));
  }
  };
  
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextError: Partial<IErrors> = {};
    if (!inputs.name) {
      nextError.name = "وارد کردن نام الزامیست!";
    }
    if (!inputs.price) {
      nextError.price = "وارد کردن قیمت الزامیست!";
    }
    setErrors(nextError);
    if (Object.keys(nextError).length > 0) {
      return;
    } else {
        if(mode === 'create'){
          createFetch();
          setInput({
          _id: "",
          name: "",
          price: '',
          description: "",
          image: "",
          createdAt: "",
          updatedAt: "",
        })
        }
        else if(mode === 'edit' && editIsDone){
          updateFetch();
          editIsDone();
        }
    }
    
  };
  return (
    <form
      className={`flex flex-col max-w-180 m-auto gap-6 dark:bg-stone-800 border border-stone-200 dark:border-stone-600 shadow-md dark:shadow-stone-800 p-4 rounded-md ${mode === "edit" ? "w-full" : ""}`}
    >
      <div className="flex flex-col w-[80%] m-auto">
        <label>نام محصول</label>
        <input
          name="name"
          onChange={handleInputs}
          value={inputs.name}
          required
          className="p-1 bg-stone-200 dark:bg-dark-neutral  rounded-md outline-0 border border-stone-400"
          type="text"
          placeholder=""
        />
        {errors.name && (
          <p className="text-red-500 text-[11px]">{errors.name}</p>
        )}
      </div>
      <div className="flex flex-col  w-[80%] m-auto">
        <label>قیمت(تومان)</label>
        <input
          name="price"
          onChange={handleInputs}
          value={inputs.price}
          required
          className="p-1 bg-stone-200 dark:bg-dark-neutral rounded-md outline-0 border border-stone-400"
          type="text"
          placeholder=""
          
        />
        {errors.price && (
          <p className="text-red-500 text-[11px]">{errors.price}</p>
        )}
      </div>
      <div className="flex flex-col  w-[80%] m-auto">
        <label>آدرس تصویر</label>
        <input
          name="image"
          onChange={handleInputs}
          value={inputs.image || ''}
          required
          className="p-1 bg-stone-200 dark:bg-dark-neutral rounded-md outline-0 border border-stone-400"
          type="text"
          placeholder="www.example.com..."
        />
      </div>
      <div className="flex flex-col w-[80%] m-auto">
        <label>توضیحات</label>
        <textarea
          name="description"
          onChange={handleInputs}
          value={inputs.description || ""}
          className="p-1 bg-stone-200 dark:bg-dark-neutral min-h-30 rounded-md outline-0 border border-stone-400"
        ></textarea>
      </div>
      {<button
          type="submit"
          onClick={handleSubmit}
          className="bg-secendary text-white p-2 rounded-md hover:bg-dark-tertiary transition-colors"
        >
         {mode=== 'create'? " ثبت محصول" : "ذخیره"}
        </button>}
    </form>
  );
};

export default CreateForm;
