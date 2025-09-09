import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/global.store";
import { formatPrice } from "../../helpers";
import { searchProducts } from "../../actions";
import type { Product } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const closeSheet = useGlobalStore((state) => state.closeSheet);

  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      const products = await searchProducts(searchTerm);
      setSearchResults(products);
    }
  };

  let timeout: NodeJS.Timeout;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      if (e.target.value.trim()) {
        const products = await searchProducts(e.target.value);
        setSearchResults(products);
      }
    }, 750); // 750 ms de retraso
  };

  return (
    <>
      <div className="py-5 px-7 flex gap-10 items-center border-b border-slate-200">
        <form
          className="flex gap-3 items-center flex-1"
          onSubmit={handleSearch}
        >
          <HiOutlineSearch size={22} />
          <input
            type="text"
            placeholder="Busca tu producto..."
            className="w-full outline-none text-sm"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </form>
        <button onClick={closeSheet}>
          <IoMdClose size={25} className="text-black " />
        </button>
      </div>

      {/* Resultados de busqueda */}
      <div className="p-5">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((product) => (
              <li className="py-2 group" key={product.id}>
                <button
                  className="flex items-center gap-3"
                  onClick={() => {
                    navigate(`/muebles/${product.slug}`);
                    closeSheet();
                  }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-20 w-20 object-contain p-3"
                  />

                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold group-hover:underline">
                      {product.name}
                    </p>
                    <p className="text-[13px] text-gray-600">
                      {product.variants[0].storage} /{" "}
                      {product.variants[0].color_name}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {formatPrice(product.variants[0].price)}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No se encontraron resultados</p>
        )}
      </div>
    </>
  );
};

// en la app tengo un problema, cuando agrego un producto al carrito e intento sumar su cantidad desde el contador si respeta el stock, pero cuando agrego un producto, pongo la quantity al maximo y luego vuelvo a agregarlo al mismo producto al carrito no respeta el stock, es decir, si el stock es 5 y ya tengo 5 en el carrito y vuelvo a agregar el mismo producto al carrito me deja agregarlo y se va a 6, 7, 8, etc. no deberia dejarme agregar mas del stock que hay, que puedo hacer_
