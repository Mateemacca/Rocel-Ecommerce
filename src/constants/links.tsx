import {
  FaBoxOpen,
  FaCartShopping,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

export const navbarLinks = [
  {
    id: 1,
    title: "Inicio",
    href: "/",
  },
  {
    id: 2,
    title: "Muebles",
    href: "/muebles",
  },
  {
    id: 3,
    title: "Nosotros",
    href: "/nosotros",
  },
];

export const socialLinks = [
  {
    id: 1,
    title: "Instagram",
    href: "https://www.instagram.com/rocel_muebles/",
    icon: <FaInstagram />,
  },
  {
    id: 2,
    title: "Facebook",
    href: "https://www.facebook.com/Rocel.muebles",
    icon: <FaFacebookF />,
  },
  {
    id: 3,
    title: "Twitter",
    href: "https://www.twitter.com/rocelmuebles",
    icon: <FaXTwitter />,
  },
  {
    id: 4,
    title: "TikTok",
    href: "https://www.tiktok.com/@rocelmuebles",
    icon: <FaTiktok />,
  },
];

export const dashboardLinks = [
  {
    id: 1,
    title: "Productos",
    href: "/dashboard/productos",
    icon: <FaBoxOpen size={25} />,
  },
  {
    id: 2,
    title: "Ordenes",
    href: "/dashboard/ordenes",
    icon: <FaCartShopping size={25} />,
  },
];
