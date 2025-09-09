## 🎯 Milestone 4 : Conversations (UI de chat)
**Contexte**  
Le user peut ouvrir une conversation avec un autre user.
Le banckend qui doit être consommé se trouve dans le dossier : C:\Users\thoma\WebstormProjects\real_time_chat


**Tâches**
- Créer une page `ChatPage`.
- Ajouter une colonne gauche (UserList) et une zone principale (messages).
- Lorsqu’on clique sur un user → afficher la conversation.
- Charger les messages depuis l’API backend (`GET /conversations/:id/messages`).
- Scroll automatique vers les derniers messages.

**Contraintes**
- Se baser sur la documentation du backend définie dans `.gemini/FRONT_END_API_DOCS.md`
- Respecter le style défini dans `.gemini/style.md`.
- Ne pas créer de nouvelle conversation tant qu’aucun message n’est envoyé.
- Historique paginé (supporter "Load more" en haut de la conversation).