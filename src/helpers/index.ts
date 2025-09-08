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
