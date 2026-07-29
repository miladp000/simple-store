import { FaRegSquarePlus } from "react-icons/fa6";
import { MdListAlt } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const navbar = [
  {
    to: "/",
    content: <><MdListAlt /><div>محصولات</div></>,
  },
  {
    to: "/create",
    content: <><FaRegSquarePlus /><div>افزودن</div></>,
  },
];

const Menu = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="container flex fixed left-[50%] translate-x-[-50%] bg-secendary text-white dark:bg-dark-neutral bottom-0 justify-around p-1 border-t  font-bold border-gray-300 dark:border-gray-700 rounded-t-md">
      {navbar.map((link) => (
        
        <Link
          key={link.to}
          className={`${pathname === link.to ? "bg-white dark:bg-green-primary text-stone-700 dark:text-dark-neutral" : ""} flex flex-col items-center text-sm p-1 px-3 rounded`}
          to={link.to}
        >
          {link.content}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
