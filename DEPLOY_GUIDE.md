# 🚀 Guide de Déploiement Gratuit - PharmaLink

Ce guide vous permet de déployer PharmaLink gratuitement sur internet en quelques minutes !

---

## ⚡ Option 1 : Déploiement avec Vercel (Recommandé)

Vercel offre un hébergement **100% gratuit** pour les projets Next.js !

### Avantages
- ✅ Gratuit à vie pour les projets personnels
- ✅ Domaine gratuit (votre-projet.vercel.app)
- ✅ HTTPS automatique
- ✅ Déploiement en 2 minutes
- ✅ Performances optimales
- ✅ Base de données PostgreSQL gratuite (via Neon)

### Étapes de Déploiement

#### 1. Installer Node.js

**Sur Mac :**
```bash
# Avec Homebrew
brew install node

# OU télécharger sur nodejs.org
open https://nodejs.org/
```

**Vérifier l'installation :**
```bash
node --version  # Doit afficher v18.x ou supérieur
npm --version   # Doit afficher 9.x ou supérieur
```

#### 2. Initialiser Git (si pas déjà fait)

```bash
cd /Users/akliaitoumeziane/PharmaLink

# Initialiser Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - PharmaLink website"
```

#### 3. Créer un Compte GitHub

1. Allez sur [github.com](https://github.com)
2. Créez un compte gratuit
3. Créez un nouveau repository "PharmaLink"

#### 4. Pousser le Code sur GitHub

```bash
# Ajouter le repository distant (remplacez YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/PharmaLink.git

# Pousser le code
git branch -M main
git push -u origin main
```

#### 5. Déployer sur Vercel

**Option A : Via le site web (Plus simple)**

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Sign Up" et connectez-vous avec GitHub
3. Cliquez sur "Add New Project"
4. Sélectionnez votre repository "PharmaLink"
5. Cliquez sur "Import"

**Configuration automatique :**
- Framework Preset: Next.js ✅ (détecté automatiquement)
- Build Command: `npm run build` ✅
- Output Directory: `.next` ✅

**Variables d'environnement à ajouter :**

Cliquez sur "Environment Variables" et ajoutez :

```
DATABASE_URL=postgresql://...  (voir étape 6)
NEXTAUTH_SECRET=votre_secret_genere
NEXTAUTH_URL=https://votre-projet.vercel.app
NEXT_PUBLIC_APP_URL=https://votre-projet.vercel.app
NEXT_PUBLIC_APP_NAME=PharmaLink
```

6. Cliquez sur "Deploy"

**Option B : Via CLI**

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions :
# - Set up and deploy? Y
# - Which scope? Votre compte
# - Link to existing project? N
# - Project name? pharmalink
# - Directory? ./
# - Override settings? N
```

#### 6. Configurer la Base de Données (Gratuit avec Neon)

**Neon offre PostgreSQL gratuit :**

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte gratuit
3. Créez une nouvelle database "pharmalink"
4. Copiez la connection string

**Exemple :**
```
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/pharmalink?sslmode=require
```

5. Dans Vercel, allez dans :
   - Settings → Environment Variables
   - Ajoutez `DATABASE_URL` avec votre connection string
   - Redéployez : Settings → Deployments → ... → Redeploy

#### 7. Initialiser la Base de Données en Production

```bash
# Mettre la DATABASE_URL de production dans .env
echo "DATABASE_URL=postgresql://..." > .env.production

# Pousser le schéma
npx prisma db push --skip-generate

# Charger les données (40 médicaments + 10 pharmacies)
npx prisma db seed
```

#### 8. Votre Site Est En Ligne ! 🎉

Votre site sera accessible sur :
```
https://pharmalink-xxx.vercel.app
```

**Fonctionnalités actives :**
- ✅ Page d'accueil
- ✅ Catalogue de 40 médicaments
- ✅ Panier d'achat
- ✅ Carte des pharmacies
- ✅ Système de réservation

---

## ⚡ Option 2 : Déploiement avec Netlify (Alternative)

Netlify offre aussi un hébergement gratuit.

### Étapes

1. Allez sur [netlify.com](https://netlify.com)
2. Créez un compte avec GitHub
3. Cliquez "Add new site" → "Import an existing project"
4. Sélectionnez votre repo GitHub "PharmaLink"
5. Configuration :
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Framework: Next.js
6. Ajoutez les variables d'environnement
7. Deploy!

**Note :** Netlify est moins optimisé que Vercel pour Next.js

---

## 🔧 Configuration Complète

### Variables d'Environnement Requises

```env
# Base de données (Neon PostgreSQL gratuit)
DATABASE_URL="postgresql://user:password@host.neon.tech/pharmalink"

# NextAuth
NEXTAUTH_SECRET="genere-avec-openssl-rand-base64-32"
NEXTAUTH_URL="https://votre-site.vercel.app"

# Application
NEXT_PUBLIC_APP_URL="https://votre-site.vercel.app"
NEXT_PUBLIC_APP_NAME="PharmaLink"

# Google Maps (optionnel)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=""
```

### Générer NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

---

## 🌍 Domaine Personnalisé (Optionnel)

### Obtenir un Domaine Gratuit

**Option 1 : Freenom (Gratuit)**
- Allez sur [freenom.com](https://freenom.com)
- Recherchez "pharmalink" + extension (.tk, .ml, .ga)
- Enregistrez gratuitement

**Option 2 : Domaine Algérien**
- [nic.dz](https://www.nic.dz) pour .dz
- Coût : ~2000 DA/an

### Connecter à Vercel

1. Dans Vercel : Settings → Domains
2. Ajoutez votre domaine
3. Configurez les DNS selon les instructions

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Gratuit)

1. Dans Vercel : Analytics
2. Activez "Web Analytics"
3. Voir les statistiques de visite

### Google Analytics (Gratuit)

Ajoutez dans `app/layout.tsx` :

```typescript
import Script from 'next/script'

// Dans le <head>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
```

---

## 🚀 Déploiement Automatique

Chaque fois que vous poussez du code sur GitHub :
```bash
git add .
git commit -m "Update features"
git push
```

→ Vercel redéploie automatiquement ! ✨

---

## 🐛 Dépannage

### Build Failed

**Erreur TypeScript :**
```bash
# Localement, vérifier
npm run build

# Corriger les erreurs
npx tsc --noEmit
```

**Erreur Prisma :**
```bash
# Regénérer le client
npx prisma generate
```

### Base de Données Non Accessible

1. Vérifiez que DATABASE_URL est correct
2. Vérifiez que la DB est accessible depuis internet
3. Neon : vérifiez que "Allow connections from anywhere" est activé

### Variables d'Environnement

Assurez-vous que toutes les variables sont ajoutées dans Vercel :
- Settings → Environment Variables
- Redéployer après ajout

---

## 💰 Coûts

### Totalement Gratuit Pour Toujours

| Service | Plan Gratuit | Limitations |
|---------|-------------|-------------|
| **Vercel** | Illimité | Parfait pour PharmaLink |
| **Neon (DB)** | 0.5 GB | Largement suffisant |
| **GitHub** | Repos illimités | Aucune limite |
| **Domaine Vercel** | Inclus | .vercel.app |

**Coût total : 0 DA / mois** 🎉

---

## 📈 Améliorations Futures

Une fois déployé, vous pouvez :

1. **Ajouter Google Maps**
   - Obtenir clé API
   - Ajouter dans variables d'environnement

2. **Ajouter des Médicaments**
   ```bash
   # Se connecter à la DB
   npx prisma studio
   # Ajouter manuellement
   ```

3. **Monitoring Avancé**
   - Sentry pour les erreurs
   - LogRocket pour les sessions

4. **SEO**
   - Ajouter sitemap.xml
   - Configurer robots.txt
   - Meta tags optimisés

---

## 🎯 Checklist de Déploiement

- [ ] Node.js installé
- [ ] Code sur GitHub
- [ ] Compte Vercel créé
- [ ] Base de données Neon créée
- [ ] Variables d'environnement configurées
- [ ] Premier déploiement réussi
- [ ] Base de données seed exécuté
- [ ] Site accessible en ligne
- [ ] Tests des fonctionnalités
- [ ] Domaine personnalisé (optionnel)

---

## 📞 Support

Si vous rencontrez des problèmes :

1. **Documentation Vercel :** [vercel.com/docs](https://vercel.com/docs)
2. **Support Vercel :** [vercel.com/support](https://vercel.com/support)
3. **Discord Vercel :** [discord.gg/vercel](https://discord.gg/vercel)

---

## 🎉 Résultat Final

Après le déploiement, vous aurez :

✅ **Site web en ligne 24/7**
✅ **URL publique** (pharmalink-xxx.vercel.app)
✅ **HTTPS sécurisé** automatique
✅ **40 médicaments** disponibles
✅ **10 pharmacies** avec carte
✅ **Panier & réservation** fonctionnels
✅ **Performance optimale** (CDN global)
✅ **Gratuit à 100%** !

---

## 🚀 Commandes Rapides

```bash
# Installation locale
cd /Users/akliaitoumeziane/PharmaLink
npm install

# Test local
npm run dev
# → http://localhost:3000

# Build de production
npm run build
npm start

# Déploiement Vercel
vercel --prod

# Mise à jour DB production
npx prisma db push
npx prisma db seed
```

---

<div align="center">

## 🌟 Votre Site PharmaLink Sera Bientôt En Ligne !

**Durée totale : ~15 minutes**

[Vercel](https://vercel.com) • [Neon](https://neon.tech) • [GitHub](https://github.com)

</div>
