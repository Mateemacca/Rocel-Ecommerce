import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrder, useUser } from "../hooks";
import { Loader } from "../components/shared/Loader";
import { CiCircleCheck } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa6";
import { formatPrice } from "../helpers";
import { useEffect } from "react";
import { supabase } from "../supabase/client";

export const ThankYouPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useOrder(Number(id));

  const { isLoading: isLoadingSession } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login");
      }
    });
  }, [navigate]);

  if (isError) return <div>Error al cargar el pedido</div>;

  //   if (isLoading || !data)
  //     return (
  //       <div>
  //         <Loader />
  //       </div>
  //     );

  return (
    <div className="flex flex-col h-screen">
      <header className="text-black flex items-center justify-center flex-col px-10 py-12">
        <Link
          to="/"
          className="text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl"
        >
          <p>
            Rocel
            <span className="text-cyan-600">Muebles</span>
          </p>
        </Link>
      </header>
      <main className="container flex-1 flex flex-col items-center gap-10">
        {isLoading || !data || isLoadingSession ? (
          <Loader />
        ) : (
          <>
            <div className="flex gap-3 items-center">
              <CiCircleCheck size={40} />
              <p className="text-4xl">¡Gracias, {data.customer.fullName}!</p>
            </div>
            <div className="border border-slate-200 w-full md:w-[600px] p-5 rounded-md space-y-3">
              <h3 className="font-medium">Tu pedido está confirmado</h3>
              <p className="text-sm">
                Gracias por realizar tu compra en Rocel, para realizar la
                transferencia te compartimos los siguientes datos:
              </p>
              <div className="space-y-0.5 text-sm">
                <p className="">Banco Ciudad</p>
                <p className="">Razon Social: Rocel Muebles</p>
                <p className="">CUIT: 20-12345678-9</p>
                <p className="">Cuenta Corriente en Pesos: 1234567890</p>
                <p className="">CBU: 0000000890123456789012</p>
                <p className="">Alias: rocel.muebles</p>
              </div>
              <p className="text-sm">
                Una vez realizada la transferencia, enviar comprobante a:
                ventas@rocel.com.ar o a{" "}
                <Link
                  to="https://wa.me/5491123456789"
                  target="_blank"
                  className="font-semibold underline"
                >
                  nuestro WhatsApp{" "}
                  <FaWhatsapp size={20} className="inline-block align-top" />
                </Link>{" "}
                para procesarla y realizar el envio.
              </p>
            </div>
            <div className="border border-slate-200 w-full p-5 rounded-md space-y-3 md:w-[600px]">
              <h3 className="font-medium">Detalles del pedido</h3>
              <div className="flex flex-col gap-5">
                <ul className="space-y-3">
                  {data.orderItems.map((item, index) => (
                    <li
                      className="flex justify-between items-center gap-3"
                      key={index}
                    >
                      <div className="flex">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 object-contain"
                        />
                      </div>

                      <div className="flex-1 space-y-2 ">
                        <div className="flex justify-between">
                          <p className="font-semibold">{item.productName}</p>
                          <p className="text-sm font-medium text-gray-600 mt-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <p className="text-[13px] text-gray-600">
                            {item.storage} / {item.color_name}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">
                    {formatPrice(data.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col text-sm">
                  <p className="font-semibold">Informacion de contacto:</p>
                  <p>{data.customer.email}</p>
                </div>
                <div className="flex flex-col text-sm">
                  <p className="font-semibold">Metodos de pago:</p>
                  <p>Deposito bancario - {formatPrice(data.totalAmount)}</p>
                </div>
                <div className="flex  flex-col text-sm">
                  <p className="">Direccion de envio:</p>
                  <p className="">{data.address.addressLine1}</p>
                  <p className="">
                    {data.address.addressLine2 && data.address.addressLine2}
                  </p>
                  <p>{data.address.city}</p>
                  <p>{data.address.state}</p>
                  <p> {data.address.postalCode}</p>
                  <p> {data.address.country}</p>
                </div>
                <div className="flex flex-col text-sm">
                  <p className="font-semibold">Metodo de envio:</p>
                  <p>Standard</p>
                </div>
              </div>
            </div>

            <div className="justify-between flex flex-col items-center w-full mb-5 gap-3 sm:flex-row md:w-[600px] md:gap-0">
              <p className="text-sm ">
                Necesitas ayuda?{" "}
                <Link
                  to="https://wa.me/5491123456789"
                  className="font-semibold underline"
                >
                  Contactanos
                </Link>
              </p>

              <Link
                to="/muebles"
                className=" bg-black text-white py-4 px-5 text-sm rounded-md tracking-tight font-semibold"
              >
                Seguir comprando
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
};
