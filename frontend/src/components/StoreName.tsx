import { Link } from 'react-router-dom';

const StoreName = () => {
    return (
        <Link
          to={"/"}
          className=" text-2xl sm:text-3xl md:text-4xl font-bold 
            hover:-translate-y-0.5 transition-transform"
        >
          فروشگاه من
        </Link>
    );
}

export default StoreName;
