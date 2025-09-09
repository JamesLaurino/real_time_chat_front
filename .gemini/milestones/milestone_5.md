## 🎯 Milestone 5 : Envoi et réception de messages
**Contexte**  
Permettre aux utilisateurs d’échanger des messages en temps réel.
Le banckend qui doit être consommé se trouve dans le dossier : C:\Users\thoma\WebstormProjects\real_time_chat

**Tâches**
- Ne jamais toucher aux fichiers du projet : C:\Users\thoma\WebstormProjects\real_time_chat
- Ajouter un champ d’input + bouton envoyer.
- Envoyer le message via socket `send_message`.
- Persister le message automatiquement via backend (retour d’API).
- Mettre à jour la conversation instantanément côté frontend.
- Si destinataire est offline → message sauvegardé seulement.

**Contraintes**
- Toujours confirmer la persistance avant d’afficher le message (éviter faux positifs).
- Scroll automatique vers le dernier message.