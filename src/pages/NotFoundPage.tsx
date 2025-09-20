import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
export function NotFoundPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4">
      <h1 className="text-8xl font-extrabold text-black">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Página no encontrada
      </p>
      <p className="mt-2 text-gray-500 text-center max-w-md">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-2xl bg-black px-6 py-3 text-white font-semibold shadow-md transition group"
      >
        <IoMdArrowRoundBack
          size={20}
          className="inline-block mr-2 group-hover:-translate-x-1 transition-transform"
        />
        Volver al inicio
      </Link>
    </div>
  );
}
