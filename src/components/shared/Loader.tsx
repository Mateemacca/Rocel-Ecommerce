// import { CgSpinnerAlt } from "react-icons/cg";
// import { ImSpinner2 } from "react-icons/im";
import { TbLoader2 } from "react-icons/tb";
// import { PiSpinnerGapThin } from "react-icons/pi";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <TbLoader2 className="animate-spin" size={70} />
    </div>
  );
};
