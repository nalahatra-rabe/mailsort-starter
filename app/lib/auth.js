// Secret JWT partagé — en production, utiliser une variable d'environnement.
export const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-mailsort";
