import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ToggleTheme from "@/components/ToggleTheme";
import PageTitle from "@/components/PageTitle";
import CreateForm from "@/components/CreateForm";
import NavLayout from "@/components/NavLayout";
import StoreName from "@/components/StoreName";

const Create = () => {
  return (
    <div>
      <NavLayout>
        <StoreName/>
        <PageTitle>ایجاد محصول</PageTitle>
        <div className="flex gap-2 items-center text-[11px] sm:text-sm">
          <ToggleTheme/>
          <Link to={'/'} className="p-2 bg-stone-600 hover:bg-stone-500 rounded-md  transition-colors cursor-pointer">
            <FaArrowLeft />
          </Link>
        </div>
      </NavLayout>
      <CreateForm/>
    </div>
  );
};

export default Create;
