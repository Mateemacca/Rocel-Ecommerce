import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../../actions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message, { position: "top-right" });
    },
  });

  return {
    mutate,
    isPending,
  };
};
