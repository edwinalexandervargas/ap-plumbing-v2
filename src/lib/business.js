import { faWater, faCamera, faFire, faFaucet, faWrench, faTools, faGasPump } from "@fortawesome/free-solid-svg-icons";

// One place for every business detail — update here, the whole site updates.
export const business = {
  name: "AP Plumbing",
  owner: "Angel Perez",
  phoneDisplay: "(323) 329-7204",
  phoneHref: "tel:3233297204",
  email: "applumbingrooter@gmail.com",
  license: "Lic # 1097944",
  serviceArea: "Los Angeles & San Gabriel Valley",
  tagline: "Fast & Reliable Plumbing Services",
  badges: ["Licensed & Insured", "24/7 Emergency Service", "Free Estimates"],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const aboutParagraphs = [
  "Hi, I'm Angel Perez, the owner and operator of AP Plumbing. I've been passionate about plumbing since I was 18 years old, and have spent years mastering my craft to provide the best service possible to my customers.",
  "At AP Plumbing, I believe in honest, reliable, and affordable service. Whether it's a small leak or a major repair, I treat every job with the same dedication and attention to detail.",
  "From drain cleaning to gas repairs, I offer a wide range of plumbing services to keep your home running smoothly.",
];

export const services = [
  { icon: faWater, title: "Drain Cleaning", description: "We clear all types of drain blockages using professional equipment to restore proper flow and prevent future buildup." },
  { icon: faCamera, title: "Camera Inspections", description: "Using state-of-the-art camera technology we inspect your pipes to identify blockages, cracks, and other issues without digging." },
  { icon: faFire, title: "Water Heaters", description: "We install, repair, and replace all types of water heaters to ensure you always have reliable hot water." },
  { icon: faFaucet, title: "Fixtures", description: "From faucets to toilets we install and repair all types of plumbing fixtures to keep your home running smoothly." },
  { icon: faWrench, title: "Water Repairs", description: "We quickly diagnose and repair all types of water leaks and pipe damage to prevent costly water damage." },
  { icon: faTools, title: "Drain Repairs", description: "We repair damaged and deteriorating drains using the latest techniques to restore proper drainage." },
  { icon: faGasPump, title: "Gas Repairs", description: "We safely repair and install gas lines ensuring your home's gas system is secure and up to code." },
];
