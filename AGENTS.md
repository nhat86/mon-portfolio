<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Guide du Projet - Mon Portfolio

## Structure du Projet

```
mon-portfolio/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── chat/            # Chatbot AI endpoint
│   │   ├── contact/         # Contact form endpoint
│   │   └── tts/             # Text-to-speech endpoint
│   ├── blogs/               # Blog pages
│   ├── chat/                # Chat page avec avatar 3D
│   ├── contact/             # Contact page
│   ├── formations/          # Formations/éducation
│   ├── projects/            # Portfolio projects
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Avatar.tsx           # 3D Avatar (Three.js)
│   ├── Chat.tsx             # Chat interface
│   ├── Message.tsx          # Chat message component
│   ├── Input.tsx            # Chat input component
│   ├── BlogCard/            # Blog card component
│   ├── BlogList/            # Blog list component
│   ├── Navigation/          # Navigation menu
│   ├── Footer/              # Footer component
│   └── Techs/               # Technologies display
├── hooks/                   # Custom React hooks
│   └── useSpeech.ts         # Text-to-speech hook
├── lib/                     # Utilities & configurations
│   ├── groq.js              # Groq AI client
│   └── prompt.js            # AI system prompt
├── public/                  # Static assets
│   └── images/              # Images & 3D models
└── .env                     # Environment variables (NE PAS COMMITTER)
```

## Conventions de Nommage

### Fichiers
- **Components**: PascalCase (ex: `Avatar.tsx`, `Navigation.tsx`)
- **Hooks**: camelCase avec préfixe `use` (ex: `useSpeech.ts`)
- **Utilitaires**: camelCase (ex: `groq.js`, `prompt.js`)
- **Styles**: `[Component].module.css` pour CSS modules
- **API Routes**: `route.ts` ou `route.js` dans `app/api/[nom]/`

### Code
- **Variables/Functions**: camelCase
- **Components**: PascalCase
- **Constants**: UPPER_SNAKE_CASE (ex: `SYSTEM_PROMPT`)
- **Types/Interfaces**: PascalCase

### Imports
- Utiliser l'alias `@/` pour les imports relatifs à la racine
- Ex: `import Chat from "@/components/Chat"`
- Ex: `import groq from "@/lib/groq"`

## Frameworks et Versions

### Core
- **Next.js**: 16.2.3 (App Router)
- **React**: 19.2.4
- **React DOM**: 19.2.4
- **TypeScript**: 5.x

### Styling
- **Tailwind CSS**: 4.x
- **PostCSS**: Configuré avec Tailwind

### 3D Graphics
- **Three.js**: 0.183.2
- **@react-three/fiber**: 9.6.0
- **@react-three/drei**: 10.7.7

### AI & APIs
- **Groq SDK**: 1.1.2 (LLM: Llama 3.3 70B)
- **Resend**: 6.11.0 (Email service)

### Development
- **ESLint**: 9.x
- **@types/node**: 20.x
- **@types/react**: 19.x

## Règles de Sécurité

### Environment Variables
- **NE JAMAIS** committer le fichier `.env`
- Les API keys doivent être dans `.env` uniquement
- Variables requises:
  - `GROQ_API_KEY` - Pour le chatbot AI
  - `RESEND_API_KEY` - Pour l'envoi d'emails

### API Routes
- Toutes les routes API doivent gérer les erreurs
- Valider les inputs côté serveur
- Ne jamais exposer de données sensibles dans les réponses

### Client Components
- Marquer avec `"use client"` en haut du fichier
- Éviter d'exposer des secrets dans le code client
- Utiliser les API routes pour les opérations sensibles

## Règles d'Accessibilité

### Général
- Langue principale: Français (`lang="fr"` dans layout)
- Utiliser des balises sémantiques HTML5
- Contraste suffisant pour le texte

### Navigation
- Navigation clavier fonctionnelle
- ARIA labels pour les éléments interactifs
- Focus visible sur les éléments focusables

### Forms
- Labels associés aux inputs
- Messages d'erreur clairs
- Validation côté client et serveur

## Éléments à NE PAS Modifier

### Configuration Critique
- **next.config.ts** - Configuration Next.js (images, etc.)
- **tsconfig.json** - Configuration TypeScript (paths, strict mode)
- **tailwind.config** - Configuration Tailwind CSS
- **.gitignore** - Fichiers à ignorer par Git

### Structure Core
- **app/layout.tsx** - Root layout avec fonts et structure de base
- **lib/groq.js** - Configuration client Groq
- **lib/prompt.js** - System prompt de l'IA (peut être personnalisé mais ne pas supprimer)
- **hooks/useSpeech.ts** - Hook TTS critique pour l'avatar

### Assets
- **public/images/avatar.glb** - Modèle 3D de l'avatar
- Ne pas renommer ou déplacer les assets critiques

### Dependencies
- Ne pas downgrader les versions majeures sans test complet
- Respecter les versions React 19 et Next.js 16 (breaking changes)

## Notes Importantes

### Next.js 16 Breaking Changes
- Ce projet utilise Next.js 16 avec des changements majeurs
- Toujours consulter `node_modules/next/dist/docs/` avant de modifier
- Les APIs peuvent différer de votre training data

### Performance
- Les components 3D sont chargés dynamiquement (`dynamic import`)
- Utiliser `use client` uniquement quand nécessaire
- Optimiser les images avec Next.js Image component

### Langue
- Interface en français
- Comments en français ou anglais (cohérence par fichier)
- System prompt de l'IA en français
