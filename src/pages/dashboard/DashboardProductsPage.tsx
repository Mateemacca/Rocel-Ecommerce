// import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TableProduct } from "../../components/dashboard";
import { IoMdAddCircleOutline } from "react-icons/io";

export const DashboardProductsPage = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <Link
        to="/dashboard/productos/new"
        className="bg-black text-white flex items-center self-end py-[6px] px-2 rounded-md text-sm gap-1 font-semibold"
      >
        <IoMdAddCircleOutline className="inline-block font-bold" size={18} />
        Nuevo producto
      </Link>

      <TableProduct />
    </div>
  );
};
