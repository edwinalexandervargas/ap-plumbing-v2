import {
  faWater,
  faCamera,
  faFire,
  faFaucet,
  faWrench,
  faToolbox,
  faGasPump,
} from "@fortawesome/free-solid-svg-icons";

// One place for every business detail — update here, the whole site updates.
export const business = {
  name: "AP Plumbing",
  owner: "Angel Perez",
  phoneDisplay: "(323) 239-7204",
  phoneHref: "tel:3232397204",
  email: "applumbingrooter@gmail.com",
  license: "1087944",
  serviceArea: "Los Angeles & San Gabriel Valley",
  serviceAreaShort: "LA & SGV",
  badges: ["Licensed & Insured", "24/7 Emergency", "Free Estimates"],
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const aboutParagraphs = [
  "Hi, I'm Angel Perez, the owner and operator of AP Plumbing. I've been passionate about plumbing since I was 18 years old, and have spent years mastering my craft to provide the best service possible to my customers.",
  "At AP Plumbing, I believe in honest, reliable, and affordable service. Whether it's a small leak or a major repair, I treat every job with the same dedication and attention to detail.",
];

// tone: color of the icon tile (brand | amber | red)
export const services = [
  {
    icon: faWater,
    tone: "brand",
    title: "Drain Cleaning",
    tag: "Clogs & Backups",
    description:
      "We clear all types of drain blockages using professional equipment to restore proper flow and prevent future buildup.",
  },
  {
    icon: faCamera,
    tone: "brand",
    title: "Camera Inspections",
    tag: "See Inside Your Pipes",
    description:
      "Using state-of-the-art camera technology we inspect your pipes to identify blockages, cracks, and other issues without digging.",
  },
  {
    icon: faFire,
    tone: "amber",
    title: "Water Heaters",
    tag: "Install, Repair & Replace",
    description:
      "We install, repair, and replace all types of water heaters to ensure you always have reliable hot water.",
  },
  {
    icon: faFaucet,
    tone: "brand",
    title: "Fixtures",
    tag: "Toilets, Faucets & Sinks",
    description:
      "From faucets to toilets we install and repair all types of plumbing fixtures to keep your home running smoothly.",
  },
  {
    icon: faWrench,
    tone: "brand",
    title: "Water Repairs",
    tag: "Leaks & Pipe Damage",
    description:
      "We quickly diagnose and repair all types of water leaks and pipe damage to prevent costly water damage.",
  },
  {
    icon: faToolbox,
    tone: "brand",
    title: "Drain Repairs",
    tag: "Damaged Drain Lines",
    description:
      "We repair damaged and deteriorating drains using the latest techniques to restore proper drainage.",
  },
  {
    icon: faGasPump,
    tone: "red",
    title: "Gas Repairs",
    tag: "Safety Critical",
    description:
      "We safely repair and install gas lines ensuring your home's gas system is secure and up to code.",
    featured: true,
  },
];
