import { useTheme } from "@/contexts/themeContext";
import { FiSun } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";

const ToggleTheme = () => {
  const { isDark , toggleTheme } = useTheme() as { isDark: boolean; toggleTheme: () => void };
  return (
    <button className="p-2 bg-stone-600 hover:bg-stone-500 rounded-md  transition-colors cursor-pointer"
        onClick={()=>toggleTheme()}>
      {isDark ? <FiSun />: <FaRegMoon />}
    </button>
  );
};

export default ToggleTheme;
