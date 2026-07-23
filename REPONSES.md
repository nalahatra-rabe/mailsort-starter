# MailSort — Réponses

**Début :** Jeudi 18h54
**Fin :** Jeudi 20h40
**Durée :** ~1 h 45

---

## Anomalies identifiées et corrigées

### 1. Filtrage par catégorie partiel (GET /api/messages)

**Symptôme** : `GET /api/messages?category=client` retournait aussi les messages des catégories `client-vip` et `reclamation-client`.

**Cause** : La méthode `String.includes()` était utilisée pour filtrer (`m.category.includes(category)`). Un appel avec `?category=client` matche toute chaîne contenant "client" comme sous-chaîne.

**Correction** : Remplacé par `m.category === category` pour une égalité stricte.

**Fichier** : `app/api/messages/route.js:13`

### 2. Statistiques non synchronisées avec le store (GET /api/messages/stats)

**Symptôme** : Après avoir reclassé un message via PATCH, les compteurs de `/api/messages/stats` restaient inchangés.

**Cause** : La route stats importait directement `raw` depuis `@/data/messages.json` et lisait les données figées du fichier, ignorant les modifications en mémoire.

**Correction** : La route utilise désormais `getAllMessages()` depuis le store, qui reflète l'état courant.

**Fichier** : `app/api/messages/stats/route.js`

---

## Choix techniques principaux

### Vitest pour les tests

Rapide, compatible nativement avec ES modules et Next.js, API identique à Jest (courbe d'apprentissage nulle). Vitest s'appuie sur Vite et gère les alias `@/` sans configuration supplémentaire.

### Tailwind CSS pour le styling

Génération de CSS à la volée, bundle maîtrisé (purge des classes inutilisées au build), flexible et rapide pour l'itération UI. Pas de fichier CSS global à maintenir.

### Middleware Next.js pour la protection JWT

Next.js 15 propose un middleware natif (Edge Runtime) qui s'exécute avant chaque requête correspondant au `matcher`. C'est la solution la plus idiomatique : pas de overhead controller, pas de duplicate code, une seule vérification centralisée. Si le projet était sur Next.js 16, on aurait pu envisager un proxy, mais le middleware natif est le meilleur choix ici.

### Client Components pour le dashboard

Le dashboard est hautement interactif (clics, dropdown, état de chargement, re-fetch). En faire un Client Component permet de gérer les cycles de vie React (useState, useEffect) proprement, sans rechargement serveur à chaque interaction.

---

## Architecture : adaptation à une application desktop

L'API doit demain être consommée par une application installée chez des clients (hors navigateur, mises à jour non contrôlées). Voici les adaptations nécessaires :

### Authentification

Le JWT court (2h) pose problème pour une app desktop (pas de refresh automatique). Solution : passer à des refresh tokens avec rotation, stockés de manière sécurisée (OS keychain). L'API exposerait `POST /auth/refresh` pour échanger un refresh token contre un nouveau JWT sans reconnexion.

### Versionnage

L'app desktop n'est pas mise à jour automatiquement. L'API doit être versionnée (ex: `/api/v1/messages`) pour éviter de casser les clients existants lors d'évolutions. Un header `Accept-Version` ou un mécanisme de content negotiation peut compléter.

### CORS / Rate Limiting

Une app desktop n'a pas la même origine navigateur — CORS n'est pas un problème technique. En revanche, il faut prévoir un rate limiting par token/client pour éviter les abus (ex: 100 req/min par token).

### Cache / Offline

L'app desktop peut avoir besoin d'un mode dégradé. L'API peut exposer des headers `ETag`/`Last-Modified` pour permettre un cache local efficace. Un endpoint `GET /messages/changes?since=` (polling ou webhook) permettrait la synchronisation sans rechargement complet.

### Documentation

Sans navigateur pour explorer l'API, une documentation OpenAPI exhaustive est indispensable (générée automatiquement depuis le code via `next-swagger-doc` ou équivalent).

---

## Structure du projet

```
├── app/
│   ├── api/
│   │   ├── auth/login/route.js
│   │   └── messages/
│   │       ├── route.js
│   │       ├── [id]/category/route.js
│   │       └── stats/route.js
│   ├── dashboard/page.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js                     ← page de login
├── components/
│   ├── CategoryDropdown.js
│   ├── constants.js
│   ├── DashboardHeader.js
│   ├── MessageItem.js
│   ├── MessageList.js
│   ├── StatCard.js
│   └── StatsGrid.js
├── hooks/
│   └── useDashboard.js
├── lib/
│   ├── auth.js
│   └── store.js
├── data/
│   └── messages.json
├── middleware.js
├── tests/
│   └── middleware.test.js
└── .env
```
