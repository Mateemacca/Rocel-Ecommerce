import type { Color, Product, VariantProduct } from "../interfaces";

// Funcion para formatear el precio a pesos
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

//Funcion para preparar los productos - celulares
export const prepareProducts = (products: Product[]) => {
  return products.map((product) => {
    // Agrupar las variantes por color
    const colors = product.variants.reduce(
      (acc: Color[], variant: VariantProduct) => {
        const existingColor = acc.find((item) => item.color === variant.color);
        if (existingColor) {
          existingColor.price = Math.min(existingColor.price, variant.price);
        } //mantenemos el precio minimo
        else {
          acc.push({
            color: variant.color,
            price: variant.price,
            name: variant.color_name,
          });
        }
        return acc;
      },
      []
    );

    //obtener el precio mas bajo de las variantes agrupadas
    const price = Math.min(...colors.map((item) => item.price));

    // devolver el producto formateado
    return {
      ...product,
      price,
      colors: colors.map(({ name, color }) => ({ name, color })),
      variants: product.variants,
    };
  });
};

// Funcion para formatear la fecha a formato 3 de enero de 2025

export const formatDateLong = (date: string): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

//Funcion para formatear la fecha a formato dd/mm/yyyy
export const formatDate = (date: string): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
};

// Funcion para obtener el estado del pedido en espa;ol

export const getStatus = (status: string): string => {
  switch (status) {
    case "Pending":
      return "Pendiente";
    case "Paid":
      return "Pagado";
    case "Shipped":
      return "Enviado";
    case "Delivered":
      return "Entregado";
    case "Cancelled":
      return "Cancelado";
    default:
      return status;
  }
};

// Funcion para generar el slug de un producto

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};
