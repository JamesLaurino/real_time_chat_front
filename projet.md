# 📌 Projet : Application de Chat en Temps Réel


## 🎯 Objectif
Développer une application de chat **one-to-one** (et extensible au multi-utilisateurs) permettant à des utilisateurs authentifiés d’échanger des messages en temps réel, avec persistance en base de données et un frontend moderne et ergonomique.


## 🧑‍💻 Use Cases Principaux

### 🔐 Authentification
- Un utilisateur peut **s’enregistrer** (username, email, mot de passe).
- Un utilisateur existant peut **se connecter** via JWT.
- L’accès à l’application est **protégé** : il faut être connecté pour accéder au chat.

### 🟢 Gestion du statut utilisateur
- Lorsqu’un utilisateur se connecte → son statut passe **online** (boule verte).
- Lorsqu’il se déconnecte/ferme l’application → statut **offline** (boule grise).
- La liste des utilisateurs affiche **tous les users** avec leur statut.

### 💬 Conversations
- Un utilisateur peut **lancer une conversation** avec un autre (même s’il est offline).
- L’historique des conversations est **toujours disponible** (persisté en DB).
- Lorsqu’un message est envoyé :
    - Il est **persisté en DB** avant affichage.
    - Il est transmis en **temps réel** au destinataire (s’il est connecté).
- Les conversations s’ouvrent toujours sur les **derniers messages**, avec possibilité de **remonter** pour voir les anciens.

### 🔍 Recherche & UX
- L’utilisateur peut **rechercher un autre user** par son username.
- L’application est **responsive** (desktop & mobile).
- Gestion des erreurs et feedback utilisateur (toasts, loaders).


## ⚙️ Stack Technique

### Backend
- **Node.js + Express**
- **Socket.io** pour le temps réel
- **JWT** pour l’authentification
- **Sequelize (ORM)** pour la base de données
- **MySQL** (prod) et **SQLite** (test)
- **Jest** pour les tests unitaires
- **Helmet + CORS** pour la sécurité
- Déploiement : **VPS (backend)** + **Firebase (frontend)**

### Frontend
- **React (Vite)** pour la SPA
- **TailwindCSS** pour le design
- **Axios** pour les appels API
- **React Router** pour la navigation
- **Socket.io-client** pour le temps réel
- **Context API / Hooks** pour la gestion de l’état global

## 🚀 Fonctionnalités futures (extensions possibles)
- Conversations de groupe (chat rooms à plusieurs).
- Persistance du statut online/offline en DB (non seulement en mémoire).
- Notifications push (web & mobile).
- Partage de fichiers (images, documents).
- Système de rôles (admin, modérateurs).


## ✅ Résumé
L’application de chat en temps réel repose sur une architecture **séparée backend/frontend**, avec une API sécurisée, une gestion des statuts utilisateurs via Socket.io, une persistance fiable des messages et une UI moderne construite avec React + Tailwind.  
Le but est de fournir une base solide, modulaire et évolutive pour un projet de communication temps réel.
