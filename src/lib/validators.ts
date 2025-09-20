import z from "zod";
import type { JSONContent } from "@tiptap/react";

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

const isContentEmpty = (value: JSONContent): boolean => {
  if (!value || !Array.isArray(value.content) || value.content.length === 0) {
    return true;
  }
  return !value.content.some((node) => {
    if (!node.content || !Array.isArray(node.content)) return false;
    return node.content.some(
      (textNode) =>
        textNode.type === "text" && textNode.text && textNode.text.trim() !== ""
    );
  });
};

export const productSchema = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  brand: z.string().min(1, "La marca del producto es obligatoria"),
  slug: z
    .string()
    .min(1, "El slug del producto es obligatorio")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "El slug solo puede contener letras minusculas, numeros y guiones"
    ),
  features: z.array(
    z.object({
      value: z.string().min(1, "El valor de la caracteristica es obligatorio"),
    })
  ),

  description: z.custom<JSONContent>(
    (value): value is JSONContent => !isContentEmpty(value as JSONContent),
    {
      message: "La descripcion no puede estar vacia",
    }
  ),
  variants: z
    .array(
      z.object({
        id: z.string().optional(),
        stock: z.number(),
        price: z.number().min(1, "El precio debe ser al menos 1"),
        storage: z.string().min(1, "El almacenamiento es requerido"),
        color: z
          .string()
          .regex(
            /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|(rgb|hsl)a?\(\s*([0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*(,\s*(0|1|0?\.\d+))?\s*\))$/,
            "El color debe ser un valor válido en formato hexadecimal, RGB o HSL"
          ),
        colorName: z.string().min(1, "El nombre del color es obligatorio"),
      })
    )
    .min(1, "Debe haber al menos una variante de producto"),
  images: z.array(z.any()).min(1, "Tiene que haber al menos una imagen"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
