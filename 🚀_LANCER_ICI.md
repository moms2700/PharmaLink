# 🚀 LANCER PHARMALINK - MODE D'EMPLOI

> **Votre site web est 100% prêt !**
> Suivez simplement les étapes ci-dessous pour le lancer.

---

## ⚡ MÉTHODE 1 : Script Automatique (Recommandé)

### Lancement en 1 Commande

Ouvrez **Terminal** et tapez :

```bash
cd /Users/akliaitoumeziane/PharmaLink
./auto-deploy.sh
```

Le script vous proposera :
1. 🧪 **Tester localement** (rapide, sans configuration)
2. 🚀 **Déployer sur Vercel** (gratuit, en ligne)
3. 📦 **Installer les dépendances** seulement

**Choisissez l'option 1** pour tester rapidement !

---

## ⚡ MÉTHODE 2 : Installation Manuelle

### Si Node.js N'est Pas Installé

1. **Téléchargez Node.js :**
   ```
   https://nodejs.org/
   ```
   → Cliquez sur "Download LTS" (bouton vert)

2. **Installez** le fichier téléchargé

3. **Vérifiez** dans Terminal :
   ```bash
   node --version
   ```

### Lancer l'Application

```bash
# 1. Aller dans le dossier
cd /Users/akliaitoumeziane/PharmaLink

# 2. Installer les dépendances
npm install

# 3. Créer la configuration
cp .env.example .env

# 4. Modifier .env (ouvrez avec un éditeur)
# Changez cette ligne :
DATABASE_URL="file:./dev.db"

# 5. Modifier prisma/schema.prisma
# Changez "postgresql" par "sqlite"

# 6. Initialiser la base de données
npx prisma db push
npx prisma generate

# 7. Charger les 40 médicaments + 10 pharmacies
npm run db:seed

# 8. LANCER LE SITE !
npm run dev
```

**Ouvrez votre navigateur :**
```
http://localhost:3000
```

🎉 **Votre site PharmaLink est en ligne !**

---

## 🌐 MÉTHODE 3 : Déploiement Gratuit sur Internet

### Déployer sur Vercel (100% Gratuit)

1. **Installez Vercel CLI :**
   ```bash
   npm install -g vercel
   ```

2. **Connectez-vous :**
   ```bash
   vercel login
   ```

3. **Déployez :**
   ```bash
   vercel --prod
   ```

**Votre site sera accessible sur :**
```
https://pharmalink-xxx.vercel.app
```

**Guide complet :** [DEPLOY_NOW.md](./DEPLOY_NOW.md)

---

## 📖 Guides Disponibles

Selon votre besoin :

| Guide | Pour Quoi | Durée |
|-------|-----------|-------|
| [🚀 DEPLOY_NOW.md](./DEPLOY_NOW.md) | Déployer en ligne maintenant | 10 min |
| [📘 INSTALLATION.md](./INSTALLATION.md) | Installation complète locale | 15 min |
| [⚡ QUICKSTART.md](./QUICKSTART.md) | Démarrage ultra-rapide | 5 min |
| [📊 PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Comprendre le projet | 10 min |
| [🎯 START_HERE.md](./START_HERE.md) | Vue d'ensemble | 2 min |

---

## 🎯 Ce Qui Fonctionne

Une fois lancé, vous aurez accès à :

### Pages
✅ **Accueil** - Hero section professionnelle
✅ **Catalogue** - 40 médicaments avec recherche
✅ **Pharmacies** - Carte interactive de 10 pharmacies
✅ **Panier** - Ajout et gestion des articles
✅ **Réservation** - Système de réservation 2h

### Fonctionnalités
✅ Recherche par nom de médicament
✅ Filtrage par catégorie
✅ Ajout au panier
✅ Calcul automatique du total
✅ Localisation des pharmacies
✅ Réservation avec confirmation
✅ Design responsive mobile

### Données
✅ 40 médicaments réels (Doliprane, Ibuprofène, etc.)
✅ 10 pharmacies à Alger avec coordonnées GPS
✅ Prix en Dinars Algériens (DA)

---

## 🐛 Problèmes Courants

### "command not found: npm"

→ Node.js n'est pas installé
→ Installez-le : https://nodejs.org/

### "command not found: vercel"

```bash
npm install -g vercel
```

### Port 3000 déjà utilisé

```bash
PORT=3001 npm run dev
```

### Erreur Prisma

```bash
npx prisma generate
```

---

## 💰 Coût Total

### Test Local : **0 DA**
Tout fonctionne sur votre Mac gratuitement

### Déploiement en Ligne : **0 DA**
- Vercel : Gratuit à vie
- Neon (base de données) : Gratuit
- Domaine .vercel.app : Gratuit
- HTTPS : Gratuit

**Total : 0 DA/mois pour toujours** 🎉

---

## 🎉 Résumé

```
OPTION A : TEST LOCAL RAPIDE
└─ Lancez : ./auto-deploy.sh
   └─ Choisissez option 1
      └─ Site accessible sur http://localhost:3000

OPTION B : DÉPLOIEMENT EN LIGNE
└─ Lancez : ./auto-deploy.sh
   └─ Choisissez option 2
      └─ Site accessible sur https://votre-site.vercel.app
```

---

## 📞 Besoin d'Aide ?

1. **Lisez** [START_HERE.md](./START_HERE.md)
2. **Consultez** [INSTALLATION.md](./INSTALLATION.md)
3. **Suivez** [DEPLOY_NOW.md](./DEPLOY_NOW.md)

---

<div align="center">

## 🏥 PharmaLink Est Prêt !

**Tous les fichiers sont créés ✓**
**Documentation complète ✓**
**Prêt pour le lancement ✓**

### 🚀 Commencez Maintenant

```bash
cd /Users/akliaitoumeziane/PharmaLink
./auto-deploy.sh
```

---

**PharmaLink** - Digitaliser l'accès au médicament en Algérie 🇩🇿

</div>
