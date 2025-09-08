export const AboutPage = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-center text-4xl font-semibold tracking-tight mb-5">
        Nuestra empresa
      </h1>

      <img
        src="https://villa-luro.licuo.com.ar/12.0media/slide-img-decoracion.jpg"
        alt="Imagen de fondo"
        className="h-[400px] w-full object-cover"
      />
      <div className="flex flex-col gap-4 tracking-tighter leading-7 text-sm font-medium text-slate-800">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui impedit
          non facere tenetur voluptates amet asperiores nihil. Pariatur ipsum
          unde corrupti necessitatibus? Tempore quo corrupti, dolore dolores
          eaque recusandae id! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Unde, blanditiis! Accusantium accusamus assumenda
          animi nostrum impedit, itaque quaerat nobis repellat doloremque dolore
          esse non error, iusto amet, porro vero reprehenderit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A officia
          aspernatur mollitia ex enim, veritatis labore commodi dicta alias
          aliquam odit, maxime ipsum nihil dolores reprehenderit assumenda
          quaerat eum corporis. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Doloribus iusto quo hic soluta veritatis distinctio,
          ipsam exercitationem architecto, iure quis placeat ad delectus numquam
          nemo voluptatibus ex perspiciatis pariatur id.
        </p>

        <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
          ¡No esperes más y compra y/o restaura tus muebles en Rocel Muebles!
        </h2>
        <p>
          Para mas informacion no dudes en ponerte en contacto con nosotros a
          traves de nuestro correo electronico
          <a href="mailto:correo@rocel.com"> correo@rocel.com</a> o enviandonos
          mensaje por whatsapp <a href="https://wa.me/1234567890">1132011288</a>
        </p>
      </div>
    </div>
  );
};
