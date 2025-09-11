import z from "zod";

export const userRegisterSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100),
  fullName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100),
  phone: z
    .string()
    .min(10, "Numero de telefono invalido")
    .max(10, "El numero de telefono no debe exceder los 10 caracteres")
    .optional(),
});

export const addressSchema = z.object({
  addressLine1: z
    .string()
    .min(1, "La direccion es requerida")
    .max(100, "La direccion no debe exceder los 100 caracteres"),
  addressLine2: z
    .string()
    .max(100, "La direccion no debe exceder los 100 caracteres")
    .optional(),
  city: z
    .string()
    .min(1, "La ciudad es requerida")
    .max(50, "La ciudad no debe exceder los 50 caracteres"),
  state: z
    .string()
    .min(1, "La provincia es requerida")
    .max(50, "La provincia no debe exceder los 50 caracteres"),
  postalCode: z
    .string()
    .min(1, "El codigo postal es requerido")
    .max(10, "El codigo postal no debe exceder los 10 caracteres"),
  country: z.string().min(1, "El pais es requerido"),
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;
export type AddressFormValues = z.infer<typeof addressSchema>;
