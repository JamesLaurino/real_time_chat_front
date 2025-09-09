# 📌 Projet Frontend : Application de Chat en Temps Réel

---

## 🎯 Objectif
Créer une interface utilisateur **moderne, réactive et ergonomique** pour l’application de chat, permettant aux utilisateurs authentifiés de communiquer en temps réel, de naviguer facilement entre les conversations et de gérer leur statut.

---

## 🧑‍💻 Use Cases Principaux

### 🔐 Authentification
- Page de **login** :
    - L’utilisateur peut se connecter ou accéder au formulaire d’inscription.
- Page d’**inscription** :
    - L’utilisateur peut créer un compte.
- L’utilisateur doit toujours être **connecté** pour accéder aux pages de chat.
- Gestion des erreurs et feedback utilisateur (login invalide, email déjà utilisé, etc.).

### 🗂 Navigation & Layout
- **Page principale** :
    - Liste des utilisateurs sur le **côté gauche** avec leur statut (boule verte/ grise).
    - Barre de recherche pour filtrer les utilisateurs par **username**.
    - Zone de chat à droite, affichant l’historique et les nouveaux messages.
- **Responsiveness** :
    - Desktop et mobile adaptés.

### 💬 Conversations
- Cliquer sur un utilisateur :
    - Ouvre la conversation existante ou prépare une nouvelle.
- Envoyer un message :
    - Crée une **nouvelle conversation** si elle n’existe pas.
    - Affiche le message immédiatement et le transmet au backend via **Socket.io**.
- Historique :
    - L’utilisateur peut **remonter** pour consulter les anciens messages.
    - L’affichage commence toujours sur les **derniers messages**.

### 🔍 Recherche & UX
- La **recherche** permet de filtrer les utilisateurs par username en temps réel.
- Affichage clair des **statuts en ligne / hors ligne**.
- Gestion des **messages entrants en temps réel** sans rafraîchissement.

---

## ⚙️ Stack Technique

- **React (Vite)** : Framework SPA performant.
- **Material UI** : Design moderne et responsive.
- **React Router** : Navigation entre pages (login, inscription, chat).
- **Fetch** : Appels API vers le backend.
- **Socket.io-client** : Communication temps réel avec le backend.
- **Context API / Hooks** : Gestion globale de l’état utilisateur et des conversations.
- **Toast notifications / loaders** : Feedback utilisateur pour actions et erreurs.

---

## 🚀 Fonctionnalités futures (frontend)
- Thème clair/sombre.
- Notifications visuelles ou sonores pour nouveaux messages.
- Gestion des conversations de groupe.
- Partage de fichiers/images directement dans le chat.
- Optimisation performance pour longues listes de messages (infinite scroll).

---

## ✅ Résumé
Le frontend fournit une interface intuitive et réactive pour l’application de chat, mettant l’accent sur la **simplicité**, la **réactivité** et le **temps réel**. Il interagit directement avec le backend via API REST pour l’authentification et Socket.io pour les messages instantanés.
