## 🎯 Milestone 4 : Conversations (UI de chat)
**Contexte**  
Le user peut ouvrir une conversation avec un autre user.
Le banckend qui doit être consommé se trouve dans le dossier : C:\Users\thoma\WebstormProjects\real_time_chat


**Tâches**
- Ne jamais toucher aux fichiers du projet : C:\Users\thoma\WebstormProjects\real_time_chat
- Créer une page `ChatPage`.
- Ajouter une colonne gauche (UserList) et une zone principale (messages).
- Lorsqu’on clique sur un user → afficher la conversation.
- Charger les messages depuis l’API backend (`GET /conversations/:id/messages`).
- Scroll automatique vers les derniers messages.

**Contraintes**
- Ne pas créer de nouvelle conversation tant qu’aucun message n’est envoyé.
- Historique paginé (supporter "Load more" en haut de la conversation).