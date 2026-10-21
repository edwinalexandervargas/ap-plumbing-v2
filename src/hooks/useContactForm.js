import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_efvgj0c";
const TEMPLATE_ID = "template_qsuehiq";
const PUBLIC_KEY = "SaFva8xJp92R7ij9N";

export function formatPhone(raw) {
  const v = raw.replace(/\D/g, "").slice(0, 10);
  if (v.length === 0) return "";
  if (v.length <= 3) return `(${v}`;
  if (v.length <= 6) return `(${v.slice(0, 3)}) ${v.slice(3)}`;
  return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`;
}

// Form fields must keep these names (EmailJS template uses them): user_name, user_phone, message
export function useContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");

  const onNameChange = () => setNameError("");

  const onPhoneChange = (e) => {
    e.target.value = formatPhone(e.target.value);
    setPhoneError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nameInput = formRef.current?.elements.namedItem("user_name");
    const trimmedName = nameInput?.value.trim() ?? "";
    if (!trimmedName) {
      setNameError("Enter your name.");
      nameInput?.focus();
      return;
    }
    nameInput.value = trimmedName;
    setNameError("");

    const phoneInput = formRef.current?.elements.namedItem("user_phone");
    if (phoneInput?.value.replace(/\D/g, "").length !== 10) {
      setPhoneError("Enter a 10-digit phone number.");
      phoneInput?.focus();
      return;
    }

    setPhoneError("");
    setStatus("loading");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return {
    formRef,
    status,
    nameError,
    phoneError,
    onSubmit,
    onNameChange,
    onPhoneChange,
  };
}
