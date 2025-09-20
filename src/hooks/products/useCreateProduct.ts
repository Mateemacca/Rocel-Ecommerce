import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../actions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      navigate("/dashboard/productos");
    },
    onError: (error) => {
      toast.error("Error al crear producto");
      console.log(error);
    },
  });

  return {
    mutate,
    isPending,
  };
};
