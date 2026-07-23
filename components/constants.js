export const CATEGORY_LABELS = {
  client: "Client",
  "client-vip": "Client VIP",
  "reclamation-client": "Réclamation",
  facture: "Facture",
  newsletter: "Newsletter",
  spam: "Spam",
  interne: "Interne",
};

export const CATEGORY_COLORS = {
  client: "bg-blue-100 text-blue-800",
  "client-vip": "bg-purple-100 text-purple-800",
  "reclamation-client": "bg-orange-100 text-orange-800",
  facture: "bg-green-100 text-green-800",
  newsletter: "bg-pink-100 text-pink-800",
  spam: "bg-red-100 text-red-800",
  interne: "bg-gray-100 text-gray-800",
};

export const VALID_CATEGORIES = [
  "client",
  "client-vip",
  "reclamation-client",
  "facture",
  "newsletter",
  "spam",
  "interne",
];

export function formatDate(iso) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
