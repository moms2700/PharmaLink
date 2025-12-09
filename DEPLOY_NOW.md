# 🚀 DÉPLOIEMENT IMMÉDIAT - PharmaLink

Guide ultra-rapide pour mettre PharmaLink en ligne **gratuitement** en 10 minutes !

---

## 🎯 Plan d'Action

```
1. Installer Node.js     → 3 minutes
2. Tester localement     → 2 minutes
3. Créer compte Vercel   → 1 minute
4. Configurer DB Neon    → 2 minutes
5. Déployer             → 2 minutes
                         ──────────
                TOTAL = 10 minutes
```

---

## ⚡ ÉTAPE 1 : Installer Node.js

### Option A : Téléchargement Direct (Recommandé)

1. **Ouvrez ce lien dans Safari :**
   ```
   https://nodejs.org/
   ```

2. **Cliquez sur "Download LTS"** (bouton vert)

3. **Installez le fichier téléchargé** (double-clic)

4. **Vérifiez dans Terminal :**
   ```bash
   node --version
   ```
   → Doit afficher `v18.x.x` ou `v20.x.x`

### Option B : Homebrew (Si déjà installé)

```bash
brew install node
```

---

## ⚡ ÉTAPE 2 : Test Local

```bash
# 1. Aller dans le projet
cd /Users/akliaitoumeziane/PharmaLink

# 2. Installer les dépendances (2-3 minutes)
npm install

# 3. Créer le fichier .env
cp .env.example .env

# Pour l'instant, utilisez SQLite (sans PostgreSQL)
# Ouvrez .env et changez DATABASE_URL par :
# DATABASE_URL="file:./dev.db"
```

**Modifier `prisma/schema.prisma` :**

Ouvrez le fichier et changez :
```prisma
datasource db {
  provider = "sqlite"  // Au lieu de "postgresql"
  url      = env("DATABASE_URL")
}
```

**Puis :**
```bash
# 4. Initialiser la base locale
npx prisma db push
npx prisma generate

# 5. Charger les données
npm run db:seed

# 6. LANCER L'APPLICATION !
npm run dev
```

**Ouvrez votre navigateur :**
```
http://localhost:3000
```

✅ Vous devriez voir PharmaLink fonctionner !

---

## ⚡ ÉTAPE 3 : Déploiement Vercel (GRATUIT)

### 3.1 Créer un Compte Vercel

1. Allez sur : **https://vercel.com/signup**
2. Cliquez sur **"Continue with GitHub"**
3. Créez un compte GitHub si besoin
4. Autorisez Vercel

### 3.2 Installer Vercel CLI

```bash
npm install -g vercel
```

### 3.3 Se Connecter

```bash
vercel login
```

→ Cliquez sur le lien dans votre navigateur pour confirmer

### 3.4 Préparer pour Production

**Restaurer PostgreSQL dans `prisma/schema.prisma` :**

```prisma
datasource db {
  provider = "postgresql"  // Remettre postgresql
  url      = env("DATABASE_URL")
}
```

### 3.5 Déployer !

```bash
# Dans le dossier PharmaLink
vercel

# Répondez aux questions :
# Set up and deploy? Y
# Which scope? [Votre compte]
# Link to existing project? N
# What's your project's name? pharmalink
# In which directory is your code located? ./
# Want to override the settings? N
```

**Vercel va :**
1. ✅ Détecter Next.js automatiquement
2. ✅ Build l'application
3. ✅ Déployer sur un domaine gratuit

**Vous obtiendrez un lien :**
```
https://pharmalink-xxx.vercel.app
```

⚠️ **MAIS** il manque encore la base de données !

---

## ⚡ ÉTAPE 4 : Base de Données Gratuite (Neon)

### 4.1 Créer un Compte Neon

1. Allez sur : **https://neon.tech**
2. Cliquez sur **"Sign Up"**
3. Connectez-vous avec GitHub
4. Créez un nouveau projet "PharmaLink"

### 4.2 Obtenir la Connection String

1. Dans Neon, cliquez sur votre projet
2. Copiez la **Connection String**

Exemple :
```
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/pharmalink?sslmode=require
```

### 4.3 Ajouter dans Vercel

**Méthode 1 : Via le site web**

1. Allez sur : **https://vercel.com/dashboard**
2. Cliquez sur votre projet "pharmalink"
3. Settings → Environment Variables
4. Ajoutez :
   - **Name:** `DATABASE_URL`
   - **Value:** Votre connection string Neon
   - Cochez : Production, Preview, Development
5. Cliquez "Save"

**Méthode 2 : Via CLI**

```bash
vercel env add DATABASE_URL production
# Collez votre connection string quand demandé
```

### 4.4 Initialiser la Base en Production

```bash
# Utiliser la connection string de production
export DATABASE_URL="postgresql://user:password@..."

# Créer les tables
npx prisma db push

# Charger les 40 médicaments + 10 pharmacies
npm run db:seed
```

### 4.5 Redéployer

```bash
vercel --prod
```

---

## ⚡ ÉTAPE 5 : Variables d'Environnement Complètes

Dans Vercel, ajoutez aussi :

```env
NEXTAUTH_SECRET="genere-un-secret-aleatoire-ici"
NEXTAUTH_URL="https://votre-projet.vercel.app"
NEXT_PUBLIC_APP_URL="https://votre-projet.vercel.app"
NEXT_PUBLIC_APP_NAME="PharmaLink"
```

**Générer NEXTAUTH_SECRET :**
```bash
openssl rand -base64 32
```

---

## 🎉 VOTRE SITE EST EN LIGNE !

Votre site PharmaLink est maintenant accessible sur :
```
https://pharmalink-xxx.vercel.app
```

**Fonctionnalités actives :**
✅ Page d'accueil
✅ 40 médicaments
✅ 10 pharmacies
✅ Panier d'achat
✅ Réservation 2h
✅ Carte interactive

---

## 📊 Tableau Récapitulatif

| Étape | Service | Coût | Temps |
|-------|---------|------|-------|
| Node.js | nodejs.org | Gratuit | 3 min |
| Test Local | Votre Mac | Gratuit | 2 min |
| Hébergement | Vercel | **Gratuit** | 2 min |
| Base de Données | Neon | **Gratuit** | 2 min |
| Domaine | .vercel.app | **Gratuit** | Inclus |
| HTTPS/SSL | Vercel | **Gratuit** | Auto |
| **TOTAL** | | **0 DA** | **10 min** |

---

## 🔧 Commandes Utiles Post-Déploiement

```bash
# Voir les déploiements
vercel ls

# Voir les logs
vercel logs

# Ouvrir le site
vercel open

# Redéployer
vercel --prod

# Voir les variables d'environnement
vercel env ls
```

---

## 🌟 Améliorations Rapides

### 1. Domaine Personnalisé

Dans Vercel :
- Settings → Domains
- Add Domain
- Suivez les instructions DNS

### 2. Google Maps

1. Obtenez une clé API : https://console.cloud.google.com/
2. Dans Vercel : Settings → Environment Variables
3. Ajoutez `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
4. Redéployez

### 3. Analytics

Dans Vercel :
- Analytics → Enable
- Voir les statistiques de visite

---

## 🐛 Problèmes Courants

### Build Failed

**Erreur :** "Type error"
```bash
# Localement, vérifier
npm run build

# Si erreurs TypeScript
npx tsc --noEmit
```

**Solution :** Corrigez les erreurs et redéployez

### Database Connection Failed

1. Vérifiez `DATABASE_URL` dans Vercel
2. Vérifiez que Neon database est active
3. Testez la connection :
   ```bash
   npx prisma db push
   ```

### Site Ne Charge Pas

1. Vérifiez les logs : `vercel logs`
2. Vérifiez les variables d'environnement
3. Redéployez : `vercel --prod`

---

## 📱 Partager Votre Site

Votre site est maintenant public ! Partagez-le :

```
🏥 PharmaLink - Trouvez vos médicaments en Algérie
https://pharmalink-xxx.vercel.app

✅ 40 médicaments disponibles
✅ 10 pharmacies à Alger
✅ Réservation en 2 clics
```

---

## 🚀 Mises à Jour Futures

Pour mettre à jour le site :

```bash
# 1. Faites vos modifications dans le code

# 2. Testez localement
npm run dev

# 3. Redéployez
vercel --prod
```

**OU avec Git :**

```bash
# Si vous avez configuré GitHub
git add .
git commit -m "Update features"
git push

# Vercel redéploie automatiquement !
```

---

## 💰 Coûts à Long Terme

| Resource | Gratuit Jusqu'à | Dépassement |
|----------|----------------|-------------|
| Vercel | Illimité | Toujours gratuit pour projets perso |
| Neon DB | 0.5 GB | Largement suffisant pour PharmaLink |
| Bandwidth | 100 GB/mois | Suffisant pour milliers de visiteurs |
| Build | Illimité | |

**Résultat : 0 DA/mois pour toujours** 🎉

---

## 🎯 Checklist Finale

- [ ] Node.js installé et vérifié
- [ ] Application testée localement
- [ ] Compte Vercel créé
- [ ] Premier déploiement réussi
- [ ] Base Neon créée
- [ ] DATABASE_URL configurée
- [ ] Base de données initialisée (seed)
- [ ] Site accessible en ligne
- [ ] Toutes les pages fonctionnent
- [ ] Panier fonctionne
- [ ] Réservation fonctionne

---

## 📞 Besoin d'Aide ?

- **Vercel Docs :** https://vercel.com/docs
- **Neon Docs :** https://neon.tech/docs
- **Next.js Docs :** https://nextjs.org/docs

---

<div align="center">

## 🎊 Félicitations !

**Votre startup PharmaLink est maintenant en ligne !**

Partagez le lien avec vos clients et investisseurs 🚀

[Vercel Dashboard](https://vercel.com/dashboard) • [Voir le Site](https://your-site.vercel.app)

</div>
