# MailSort — Test technique Full-Stack Next.js

Bienvenue ! Ce test évalue votre capacité à intervenir sur une application Next.js full-stack : comprendre un code existant, diagnostiquer des comportements incorrects, et livrer des fonctionnalités propres.

**Durée indicative : 2 heures.** Ce n'est pas un concours de vitesse — un rendu partiel mais maîtrisé vaut mieux qu'un rendu complet que vous ne savez pas expliquer.

---

## Contexte

MailSort est une mini-application de tri de messages : une API Next.js expose une liste de messages classés par catégories (client, facture, spam, etc.), et permet de reclasser un message manuellement. Un dashboard doit permettre de visualiser et manipuler ces messages.

L'application est le prototype d'un produit dont l'API sera, à terme, également consommée par une application desktop externe.

## Démarrage

```bash
npm install
npm run dev
```

L'application tourne sur http://localhost:3000

**Identifiants de connexion :** `admin@mailsort.test` / `mailsort2026`

**API existante :**

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/auth/login` | Retourne un token JWT |
| GET | `/api/messages` | Liste des messages (`?category=` pour filtrer) |
| PATCH | `/api/messages/:id/category` | Reclasse un message |
| GET | `/api/messages/stats` | Compteurs par catégorie |

---

## Vos tâches

### 1. Corriger les anomalies de comportement 🐛

Cette application contient **des anomalies de comportement** : le code s'exécute sans erreur, mais certaines fonctionnalités ne font pas ce qu'elles devraient. À vous de les identifier, de les corriger, et de **documenter dans votre rendu** : le symptôme observé, la cause, et votre correction.

Conseil : lancez l'application et utilisez-la réellement.

### 2. Protéger les routes API avec le JWT 🔐

La route de login fonctionne et délivre un token, mais les routes `/api/messages*` sont actuellement accessibles sans authentification. Protégez-les : toute requête sans token valide (`Authorization: Bearer <token>`) doit recevoir une réponse 401 propre.

À vous de choisir l'implémentation (middleware, helper partagé, etc.) — vous justifierez ce choix.

### 3. Construire le dashboard 📊

Une page qui permet de :
- Se connecter (formulaire simple, avec les identifiants ci-dessus)
- Afficher la liste des messages (expéditeur, sujet, date, catégorie)
- Filtrer par catégorie
- Reclasser un message dans une autre catégorie
- Afficher les compteurs par catégorie

Pas d'exigence graphique poussée : propre et fonctionnel suffit. Les états de chargement et d'erreur doivent être gérés.

### 4. Question d'architecture (dans votre rendu, pas de code) 📝

En 10-15 lignes dans un fichier `REPONSES.md` : cette API doit demain être consommée par une application desktop installée chez des clients (donc hors navigateur, et dont on ne contrôle pas la mise à jour). Qu'est-ce que cela change et comment adapteriez-vous l'API ? (auth, CORS, versionnage… tout ce qui vous semble pertinent.)

---

## Règles du jeu

- **L'usage d'une IA (Claude, ChatGPT, Copilot…) est autorisé et assumé.** C'est un outil de travail normal en 2026.
- **En contrepartie : vous devrez expliquer et modifier votre code en visio vendredi.** Chaque choix technique devra être justifié, et des modifications vous seront demandées en direct. Un code rendu que vous ne comprenez pas jouera fortement contre vous — plus qu'un rendu incomplet que vous maîtrisez.
- Vous pouvez restructurer le code existant si vous le jugez nécessaire (en le justifiant).

## Rendu

- Un repo Git (lien) ou une archive zip, **sans `node_modules`**
- Un fichier `REPONSES.md` contenant : les anomalies trouvées (symptôme / cause / correction), vos choix techniques principaux, la réponse à la question d'architecture, et le temps réellement passé
- Deadline : jeudi 23h59

## Barème (sur 100)

| Critère | Points |
|---------|--------|
| Anomalies identifiées et corrigées | 30 |
| Protection JWT des routes | 20 |
| Dashboard fonctionnel (loading/error inclus) | 25 |
| Question d'architecture | 15 |
| Qualité générale (lisibilité, cohérence, REPONSES.md) | 10 |

L'entretien de vendredi peut faire varier significativement l'évaluation finale, dans les deux sens.

Bon courage !
