// TODO: replace with the real business number (digits only, country + area code).
const WHATSAPP_NUMBER = "584120000000";
export const WHATSAPP_DISPLAY = "+58 412-000-0000";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
