import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../../actions";
import toast from "react-hot-toast";

export const useChangeOrderStatus = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", "admin"] });
    },
    onError: (error) => {
      toast.error("Error al actualizar el estado de la orden");
      console.log(error);
    },
  });

  return {
    mutate,
    isPending,
  };
};
