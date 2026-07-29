import type { AuxProps } from "@/contexts/themeContext";

const NavLayout = ({children}:AuxProps) => {
  return (
    <nav
      className="container flex justify-between fixed top-0 left-[50%] translate-x-[-50%]  p-2 ps-3 bg-secendary text-white rounded-b-md 
        dark:bg-dark mb-4 dark:text-green-primary"
    >{children}</nav>
  );
};

export default NavLayout;
