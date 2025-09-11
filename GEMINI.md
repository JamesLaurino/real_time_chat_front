# A. Guide de style - Front-End React Chat

## 🌐 Général
- Tu es un expert de nodeJs soucieux d'une bonne achitecture modulable et professionnelle.
- Code en **JavaScript (ES6+)** uniquement.
- Nommer les fichiers en **camelCase** sauf les composants React (PascalCase).
- Une seule responsabilité par fichier.
- Utiliser des **composants fonctionnels avec hooks**.

## 📂 Organisation
- `components/` : éléments réutilisables (ChatWindow, UserStatus, etc.).
- `pages/` : pages liées aux routes (Login, Register, Chat).
- `services/` : appels API REST + gestion Socket.io.
- `helpers/` : petites fonctions utilitaires (formatage date, storage).
- `routes/` : logique de navigation (PrivateRoute).
- `styles/` : fichiers CSS globaux.

## 🎨 Convention code
- Utiliser **Prettier** pour le formatage.
- **Hooks** : préfixés par `use` (ex: `useAuth`, `useSocket`).
- **Composants** : PascalCase (`ChatWindow.js`).
- **Helpers** : camelCase (`formatDate.js`).
- **Services** : camelCase (`socketService.js`).


## 🧩 Exemple : Composant UserStatus
```jsx
import React from "react";

function UserStatus({ username, online }) {
  return (
    <div className="flex items-center space-x-2">
      <span
        className={`w-3 h-3 rounded-full ${
          online ? "bg-green-500" : "bg-gray-400"
        }`}
      ></span>
      <span>{username}</span>
    </div>
  );
}

export default UserStatus;
````

# B. Documentation Technique pour le Frontend - API ChatOne

## 1. Introduction & Configuration Générale

Ce document décrit l'API backend pour l'application de chat "ChatOne". Il fournit les détails nécessaires pour développer un client frontend (React, Vue, etc.) qui interagit avec les services de chat.

**URL de base de l'API** : `http://localhost:3000` (ou l'URL de production fournie)

Toutes les requêtes REST retournent un objet JSON standardisé :
- **Succès** : `{ "success": true, "data": { ... } }`
- **Erreur** : `{ "success": false, "error": "Message d'erreur" }`

---

## 2. Flux d'Authentification (JWT)

L'accès à l'API est sécurisé par des JSON Web Tokens (JWT). Chaque requête authentifiée doit inclure le token dans le header `Authorization`.

### Étape 1 : Inscription (Signup)

Crée un nouvel utilisateur.

- **Endpoint** : `POST /auth/signup`
- **Headers** :
    - `Content-Type: application/json`
- **Body (JSON)** :
  ```json
  {
    "username": "votre_nom_utilisateur",
    "email": "votre_email@example.com",
    "password": "votre_mot_de_passe"
  }
  ```
- **Contraintes** :
  - Le mot de passe doit contenir au moins 6 caractères.
- **Réponse (201 Created)** :
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "votre_nom_utilisateur",
      "email": "votre_email@example.com",
      "created_at": "2025-09-09T10:00:00.000Z"
    }
  }
  ```

### Étape 2 : Connexion (Login)

Authentifie un utilisateur et retourne un token JWT.

- **Endpoint** : `POST /auth/login`
- **Body (JSON)** :
  ```json
  {
    "email": "votre_email@example.com",
    "password": "votre_mot_de_passe"
  }
  ```
- **Réponse (200 OK)** :
  ```json
  {
    "success": true,
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
  Le `data` contient le token JWT.

### Étape 3 : Utiliser le Token

Pour toutes les requêtes authentifiées (REST et Socket.io), le token doit être fourni.

- **Pour l'API REST** : Dans le header `Authorization`.
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
- **Pour Socket.io** : Dans l'objet `auth` lors de la connexion.

---

## 3. Référence de l'API REST

*Toutes les routes suivantes nécessitent une authentification JWT.*

### Utilisateurs

#### `GET /users`
Récupère la liste de tous les utilisateurs et leur statut de connexion.

- **Réponse (200 OK)** :
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "username": "Alice",
        "email": "alice@example.com",
        "created_at": "...",
        "online": true
      },
      {
        "id": 2,
        "username": "Bob",
        "email": "bob@example.com",
        "created_at": "...",
        "online": false
      }
    ]
  }
  ```

#### `GET /users/me`
Récupère les informations de l'utilisateur actuellement authentifié.

- **Réponse (200 OK)** :
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "username": "Alice",
      "email": "alice@example.com",
      "created_at": "..."
    }
  }
  ```

### Conversations et Messages

#### `GET /users/me/conversations`
Récupère la liste de toutes les conversations de l'utilisateur authentifié.

- **Réponse (200 OK)** :
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "user1_id": 1,
        "user2_id": 2,
        "created_at": "...",
        "other_user": {
            "id": 2,
            "username": "Bob"
        }
      }
    ]
  }
  ```

#### `GET /conversations/:conversationId/messages`
Récupère l'historique des messages pour une conversation donnée. Supporte la pagination.

- **Paramètres (Query)** :
  - `limit` (optionnel, défaut: 20) : Nombre de messages à retourner.
  - `offset` (optionnel, défaut: 0) : Nombre de messages à sauter (pour la pagination).
- **Réponse (200 OK)** :
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 101,
        "conversation_id": 1,
        "sender_id": 2,
        "content": "Bonjour Alice !",
        "created_at": "...",
        "sender": {
          "id": 2,
          "username": "Bob"
        }
      },
      {
        "id": 102,
        "conversation_id": 1,
        "sender_id": 1,
        "content": "Salut Bob !",
        "created_at": "...",
        "sender": {
          "id": 1,
          "username": "Alice"
        }
      }
    ]
  }
  ```

---

## 4. Référence de l'API Temps Réel (Socket.io)

### Connexion

Le client doit se connecter au serveur Socket.io en passant le token JWT dans l'objet `auth`.

```javascript
import { io } from "socket.io-client";

const JWT_TOKEN = "votre_token_jwt";
const socket = io("http://localhost:3000", {
  auth: {
    token: JWT_TOKEN
  }
});

socket.on('connect', () => {
  console.log('Connecté au serveur de chat !');
});

socket.on('connect_error', (err) => {
  console.error('Erreur de connexion:', err.message); // Ex: "Invalid token"
});
```

### Événements à émettre (Client → Serveur)

#### `join_conversation`
Permet de rejoindre une "room" pour recevoir les messages d'une conversation spécifique. Doit être émis après avoir sélectionné une conversation.

- **Payload** : `conversationId` (Number)
- **Exemple** :
  ```javascript
  socket.emit('join_conversation', 1);
  ```

#### `send_message`
Envoie un message dans une conversation. Le backend se charge de créer la conversation si elle n'existe pas.

- **Payload** : `Object`
  ```javascript
  {
    "conversationId": 1, // Peut être null si c'est une nouvelle conversation
    "recipientId": 2,
    "content": "Mon message ici"
  }
  ```
- **Exemple** :
  ```javascript
  socket.emit('send_message', {
    conversationId: 1,
    recipientId: 2,
    content: "Ceci est un test."
  });
  ```

### Événements à écouter (Serveur → Client)

#### `receive_message`
Se déclenche lorsqu'un nouveau message est reçu dans une conversation rejointe.

- **Payload** : `Object` (le nouveau message, voir modèle de données)
- **Exemple** :
  ```javascript
  socket.on('receive_message', (message) => {
    console.log('Nouveau message reçu:', message);
    // Mettre à jour l'UI du chat
  });
  ```

#### `user_status_changed`
Se déclenche lorsqu'un utilisateur se connecte ou se déconnecte.

- **Payload** : `Object`
  ```javascript
  {
    "userId": 2,
    "online": true // ou false
  }
  ```
- **Exemple** :
  ```javascript
  socket.on('user_status_changed', (data) => {
    console.log(`L'utilisateur ${data.userId} est maintenant ${data.online ? 'en ligne' : 'hors ligne'}`);
    // Mettre à jour l'indicateur de statut de l'utilisateur
  });
  ```

#### `message_error`
Se déclenche si l'envoi d'un message échoue côté serveur.

- **Payload** : `String` (message d'erreur)
- **Exemple** :
  ```javascript
  socket.on('message_error', (error) => {
    alert(`Erreur de message : ${error}`);
  });
  ```

---

## 5. Modèles de Données

- **User**
  ```typescript
  interface User {
    id: number;
    username: string;
    email: string;
    created_at: string;
    online?: boolean; // Uniquement sur la route GET /users
  }
  ```

- **Conversation**
  ```typescript
  interface Conversation {
    id: number;
    user1_id: number;
    user2_id: number;
    created_at: string;
    other_user: { // Ajouté par le service pour faciliter l'affichage
        id: number;
        username: string;
    }
  }
  ```

- **Message**
  ```typescript
  interface Message {
    id: number;
    conversation_id: number;
    sender_id: number;
    content: string;
    created_at: string;
    sender: { // Inclus dans les réponses pour afficher le nom de l'expéditeur
      id: number;
      username: string;
    };
  }
  ```

---

## 6. Exemple de Workflow

1.  **Login** : L'utilisateur se connecte via `POST /auth/login` et stocke le JWT.
2.  **Connexion Socket** : Le client initialise la connexion Socket.io avec le JWT.
3.  **Chargement initial** :
  - Le client appelle `GET /users/me/conversations` pour lister les chats existants.
  - Le client appelle `GET /users` pour afficher la liste des utilisateurs et leur statut.
4.  **Sélection d'un chat** :
  - L'utilisateur clique sur une conversation (ID: 1).
  - Le client appelle `GET /conversations/1/messages` pour charger l'historique.
  - Le client émet `socket.emit('join_conversation', 1)`.
5.  **Envoi d'un message** :
  - L'utilisateur tape "Bonjour !" et envoie.
  - Le client émet `socket.emit('send_message', { conversationId: 1, recipientId: 2, content: "Bonjour !" })`.
6.  **Réception d'un message** :
  - Le client (et celui du destinataire) reçoit l'événement `receive_message` avec le nouveau message et met à jour l'UI.
