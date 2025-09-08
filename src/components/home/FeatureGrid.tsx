import { FaHammer } from "react-icons/fa6";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { MdLocalShipping, MdVerifiedUser } from "react-icons/md";

export const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5 ">
      <div className="flex items-center gap-6">
        <MdLocalShipping size={40} className="text-slate-600" />

        <div className="space-y-1">
          <p className="font-semibold">Envio gratis</p>
          <p className="text-sm">Superando los $200.000</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <HiMiniReceiptRefund size={40} className="text-slate-600" />

        <div className="space-y-1">
          <p className="font-semibold">Devoluciones</p>
          <p className="text-sm">
            Hasta 72 horas despues en muebles seleccionados
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <FaHammer size={40} className="text-slate-600" />

        <div className="space-y-1">
          <p className="font-semibold">Soporte los dias habiles</p>
          <p className="text-sm">Soporte tecnico en durante la semana</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <MdVerifiedUser size={40} className="text-slate-600" />

        <div className="space-y-1">
          <p className="font-semibold">Garantia</p>
          <p className="text-sm">Garantia de 6 meses en todos los productos</p>
        </div>
      </div>
    </div>
  );
};
