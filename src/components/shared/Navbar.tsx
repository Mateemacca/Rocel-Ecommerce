import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../../constants/links";
import { HiOutlineSearch, HiOutlineShoppingBag } from "react-icons/hi";
import { FaBarsStaggered, FaRegUser } from "react-icons/fa6";
import { Logo } from "./Logo";
import { useGlobalStore } from "../../store/global.store";
import { useCartStore } from "../../store/cart.store";
import { useCustomer, useUser } from "../../hooks";
import { TbLoader2 } from "react-icons/tb";

export const Navbar = () => {
  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart);
  const openSheet = useGlobalStore((state) => state.openSheet);
  const setActiveNavMobile = useGlobalStore(
    (state) => state.setActiveNavMobile
  );

  const { session, isLoading } = useUser();

  const userId = session?.user?.id;

  const { data: customer } = useCustomer(userId!);

  return (
    <header className="bg-white text-gray-800 py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">
      <Logo />
      <nav className="space-x-5 hidden md:flex">
        {navbarLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `${
                isActive ? "font-semibold text-black underline" : ""
              } transition-all duration-300 font-medium hover:font-semibold hover:text-black hover:underline`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
      <div className="flex gap-5 items-center">
        <button onClick={() => openSheet("search")}>
          <HiOutlineSearch size={25} />
        </button>
        {isLoading ? (
          <TbLoader2 className="animate-spin" size={40} />
        ) : session ? (
          <div className="relative">
            {/* User Nav */}
            <Link
              to="/account"
              className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold"
            >
              {customer && customer.full_name[0].toUpperCase()}
            </Link>
          </div>
        ) : (
          <Link to={"/login"}>
            <FaRegUser size={25} />
          </Link>
        )}
        <button className="relative" onClick={() => openSheet("cart")}>
          <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">
            {totalItemsInCart}
          </span>
          <HiOutlineShoppingBag size={25} />
        </button>
      </div>
      <button className="md:hidden" onClick={() => setActiveNavMobile(true)}>
        <FaBarsStaggered size={25} />
      </button>
    </header>
  );
};
