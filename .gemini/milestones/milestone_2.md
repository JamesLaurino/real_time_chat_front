## 🎯 Milestone 2 : Authentification (Login & Register)

**Contexte**  
L’utilisateur doit pouvoir s’inscrire et se connecter pour accéder au chat.

**Tâches**
- Créer une page **Login** et une page **Register**.
- Ajouter un formulaire avec validation basique (email, password).
- Appeler l’API backend (`http://localhost:3000/auth/signup`, `http://localhost:3000/auth/login`) avec `fetch`.
- Sauvegarder le JWT dans `localStorage`.
- Créer un **AuthContext** pour partager l’état de connexion (user + token).
- Protéger les routes (si pas connecté → redirect vers `/login`).

**Contraintes**
- Se baser sur la documentation du backend définie dans `.gemini/FRONT_END_API_DOCS.md`
- Respecter le style défini dans `.gemini/style.md`.
- Ne jamais stocker le mot de passe côté frontend.
- Rediriger vers `/chat` après login réussi.
