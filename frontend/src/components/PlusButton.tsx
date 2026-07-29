import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const PlusButton = () => {
  return (
    <Link
      to={"/create"}
      className="p-2 bg-stone-600 hover:bg-stone-500  rounded-md transition-colors"
    >
      <FaPlus />
    </Link>
  );
};

export default PlusButton;
