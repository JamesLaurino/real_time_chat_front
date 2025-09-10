# 🎨 Design UI – Application de Chat (Material UI)

## 🌐 Structure générale de l’UI
L’interface du chat se divise en **2 zones principales** :


### 1. Zone de conversation (centre) – Messages
- **En-tête** avec le nom du contact ou du canal, statut (en ligne, hors ligne, "tape un message…").
- **Corps central** avec l’historique des messages (scrollable, responsive).
- **Messages en bulles modernes** (arrondis, couleurs différentes pour l’expéditeur et le destinataire).
- Détails : horodatage, icône de check/double-check, indicateur "vu".
- **Barre de composition (en bas)** :
    - Zone de texte multiligne.
    - Icônes pour envoyer un fichier, un emoji, une image, etc.
    - Bouton principal "Envoyer" (icône ➤).

### 2. Panneau de droite (optionnel) – Infos
- Quand un utilisateur ou canal est sélectionné : détails, membres, fichiers partagés, paramètres de notification.
- Peut être **repliable** (Drawer ou SlideOver avec MUI).


## 🎨 Style visuel (Material UI moderne)
- **Couleurs** : claire et sobre (fond gris clair ou blanc cassé), accent en dégradé bleu/violet (ou personnalisable).
- **Typographie** : Roboto (par défaut avec MUI), ou `Inter`/`Poppins` pour un look plus moderne.
- **Messages** :
    - Bulles arrondies (`borderRadius: "16px"`) avec un léger **ombre portée**.
    - Différencier l’expéditeur (fond accentué + texte blanc) et le destinataire (fond gris clair + texte noir).
- **Animations** : transitions pour l’arrivée des messages (`Slide` ou `Grow` de MUI).
- **Responsive** :
    - Mobile → Sidebar cachée dans un Drawer.
    - Zone principale = conversation + barre de saisie.

## 📐 Exemple de layout (MUI)
- **`Box` principal en `display: flex`** → sidebar à gauche (250px) + contenu central (flex-grow: 1).
- **Sidebar** : `Drawer` permanent (desktop) et `temporary` (mobile).
- **Zone de messages** : `Box` avec `overflowY: auto`.
- **Message bubble** : `Paper` ou `Card` stylisé.
- **Input** : `TextField` multiligne avec `endAdornment` pour icônes (emoji, attach, send).


## 🔥 Inspiration
Cette UI reprend la vibe de **Slack / Discord / Teams / WhatsApp Web**, en version **MUI-friendly** et épurée.  



**Contraintes**
- Se baser sur la documentation du backend définie dans `.gemini/FRONT_END_API_DOCS.md`
- Respecter le style défini dans `.gemini/style.md`.
