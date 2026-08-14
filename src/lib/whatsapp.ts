// TODO: replace with the real business number (digits only, country + area code).
const WHATSAPP_NUMBER = "5491100000000";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
