import raw from "@/data/messages.json";

// Store en mémoire : les données sont chargées depuis le fichier JSON au démarrage.
// (Pas de base de données pour ce projet — le store est réinitialisé à chaque redémarrage.)

let messages = raw.map((m) => ({ ...m }));

export function getAllMessages() {
  return messages;
}

export function getMessageById(id) {
  return messages.find((m) => m.id === id) || null;
}

export function updateMessageCategory(id, category) {
  let updated = null;
  messages = messages.map((m) => {
    if (m.id === id) {
      updated = { ...m, category };
      return updated;
    }
    return m;
  });
  return updated;
}

export const VALID_CATEGORIES = [
  "client",
  "client-vip",
  "reclamation-client",
  "facture",
  "newsletter",
  "spam",
  "interne",
];
