
# Guide de style - Front-End React Chat

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