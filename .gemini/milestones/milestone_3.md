## 🎯 Milestone 3 : Liste des utilisateurs
**Contexte**  
Afficher les utilisateurs disponibles avec leur statut (online/offline).

**Tâches**
- Créer un composant `UserList`.
- Récupérer les users via l’API backend (`GET http://localhost:3000/users`).
- Afficher username + boule verte/rouge selon `online`.
- Ajouter une barre de recherche pour filtrer par `username`.
- Rafraîchir la liste automatiquement quand un `user_status_changed` est reçu par socket.

**Contraintes**
- Se baser sur la documentation du backend définie dans `.gemini/FRONT_END_API_DOCS.md`
- Respecter le style défini dans `.gemini/style.md`.
- Optimiser la liste avec un `useEffect` + `setInterval` (polling ou via sockets).
- Trier les users par statut (online en haut).