import type { AuxProps } from '@/contexts/themeContext';

const PageTitle = ({children}:AuxProps) => {
    return (
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">{children}</h1>
    );
}

export default PageTitle;
