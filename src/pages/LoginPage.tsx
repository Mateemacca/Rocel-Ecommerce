import { useState } from "react";
import { TbLoader2 } from "react-icons/tb";
import { Link, Navigate } from "react-router-dom";
import { useLogin, useUser } from "../hooks";
import { Loader } from "../components/shared/Loader";

export const LoginPage = () => {
  const [email, setEmail] = useState("tpq47643@jioso.com");
  const [password, setPassword] = useState("mateo2007");

  const { mutate, isPending } = useLogin();

  const { session, isLoading } = useUser();

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  if (isLoading) return <Loader />;

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-full flex flex-col items-center mt-12 gap-5">
      <h1 className="text-4xl font-bold capitalize">Iniciar sesión</h1>

      <p className="text-sm font-medium">Que bueno tenerte de vuelta!</p>

      {isPending ? (
        <div className="w-full h-full flex justify-center mt-20">
          <TbLoader2 className="animate-spin" size={60} />
        </div>
      ) : (
        <>
          <form
            className="flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]"
            onSubmit={onLogin}
          >
            <input
              type="email"
              className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
              placeholder="Ingresa tu correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full mt-5 w-full">
              Iniciar sesión
            </button>
          </form>

          <p className="text-sm text-stone-800">
            No tienes cuenta?
            <Link to={"/registro"} className=" underline ml-2">
              Registrate
            </Link>
          </p>
        </>
      )}
    </div>
  );
};
