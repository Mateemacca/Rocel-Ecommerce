import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../actions";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast.success("Producto eliminado");
    },
    onError: (error) => {
      toast.error("Error al eliminar producto");
      console.log(error);
    },
  });

  return {
    mutate,
    isPending,
  };
};
