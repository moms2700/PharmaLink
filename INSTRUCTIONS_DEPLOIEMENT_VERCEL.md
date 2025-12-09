# 🚀 Instructions de Déploiement sur Vercel

## ✅ Corrections Appliquées

Tous les problèmes de build ont été résolus:
- ✅ Configuration ESLint corrigée
- ✅ TypeScript paths configurés
- ✅ Routes API optimisées
- ✅ Build local réussi

## 🌐 Méthode 1: Déploiement via Dashboard Vercel (RECOMMANDÉ)

### Étape 1: Créer un compte Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Sign Up" et connectez-vous avec GitHub

### Étape 2: Importer le projet
1. Dans le dashboard Vercel, cliquez sur **"Add New Project"**
2. Sélectionnez **"Import Git Repository"**
3. Cherchez et sélectionnez le repo `moms2700/PharmaLink`
4. Cliquez sur **"Import"**

### Étape 3: Configuration
Vercel détectera automatiquement Next.js. Avant de déployer:

**Variables d'environnement REQUISES:**
- `DATABASE_URL`: URL de votre base de données

  **Options pour la base de données:**
  - **Neon** (PostgreSQL gratuit): https://neon.tech
  - **Supabase** (PostgreSQL gratuit): https://supabase.com
  - **PlanetScale** (MySQL gratuit): https://planetscale.com

  Exemple: `postgresql://user:password@host/database?sslmode=require`

### Étape 4: Déployer
1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes
3. Votre site sera disponible sur `https://pharmalink-xxx.vercel.app`

## 💻 Méthode 2: Déploiement via CLI (Alternative)

### Étape 1: Se connecter à Vercel
```bash
npx vercel login
```
Suivez les instructions dans le navigateur pour vous connecter.

### Étape 2: Déployer
```bash
npx vercel
```

Répondez aux questions:
- **Set up and deploy?** → Yes
- **Which scope?** → Sélectionnez votre compte
- **Link to existing project?** → No
- **Project name?** → pharmalink (ou votre choix)
- **Directory?** → . (laisser vide)
- **Override settings?** → No

### Étape 3: Ajouter la DATABASE_URL
```bash
npx vercel env add DATABASE_URL
```

Entrez votre URL de base de données quand demandé.

### Étape 4: Déploiement en production
```bash
npx vercel --prod
```

## 🗄️ Configuration de la Base de Données

### Option 1: Neon (Recommandé)
1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte gratuit
3. Créez une nouvelle base de données
4. Copiez la connection string
5. Ajoutez-la comme `DATABASE_URL` dans Vercel

### Option 2: Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un projet
3. Dans Settings → Database, copiez la connection string (mode "Session")
4. Ajoutez-la comme `DATABASE_URL` dans Vercel

## 🔄 Déploiements Futurs

Une fois configuré, chaque `git push` déclenchera automatiquement un nouveau déploiement sur Vercel!

## ⚠️ Après le Premier Déploiement

Exécutez les migrations Prisma:
```bash
npx vercel env pull .env.production
npx prisma generate
npx prisma db push
```

## 📝 Vérifications Post-Déploiement

- [ ] Le site se charge correctement
- [ ] La base de données est connectée
- [ ] Les API routes fonctionnent (`/api/pharmacies`, `/api/medicaments`)
- [ ] Les images s'affichent correctement

## 🆘 Problèmes Courants

### Build échoue sur Vercel
- Vérifiez que `DATABASE_URL` est bien définie
- Consultez les logs de build dans le dashboard Vercel

### Erreur de base de données
- Vérifiez que la connection string est correcte
- Assurez-vous que la base de données accepte les connexions externes
- Vérifiez que SSL est activé si requis

### Erreur 500 sur les API routes
- Vérifiez les logs dans Vercel Dashboard → Deployment → Logs
- Assurez-vous que Prisma est bien généré

## 📧 Support

Si vous rencontrez des problèmes:
1. Consultez les logs dans le dashboard Vercel
2. Vérifiez la documentation: [vercel.com/docs](https://vercel.com/docs)
3. GitHub Issues du projet

---

**Note**: Le fichier `vercel.json` a déjà été créé avec la configuration optimale. Vous n'avez rien à modifier!
