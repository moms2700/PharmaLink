# 🎯 DÉMARREZ ICI - PharmaLink

> **Site web complet pour la startup algérienne PharmaLink**
>
> ✅ Catalogue de 40 médicaments
> ✅ Carte interactive des pharmacies
> ✅ Système de panier et réservation 2h
> ✅ Design moderne et responsive

---

## ⚡ Lancement Rapide (5 minutes)

### 1️⃣ Vérifier les Prérequis

```bash
# Node.js 18+ installé ?
node --version

# PostgreSQL installé ?
psql --version
```

**Si manquant** :
- Node.js → [nodejs.org](https://nodejs.org/)
- PostgreSQL → [postgresql.org](https://www.postgresql.org/download/)

### 2️⃣ Installation

```bash
# Vous êtes déjà dans le bon dossier
cd /Users/akliaitoumeziane/PharmaLink

# Installer les dépendances
npm install
```

### 3️⃣ Configurer PostgreSQL

```bash
# Créer la base de données
createdb pharmalink

# OU via psql :
psql postgres
CREATE DATABASE pharmalink;
\q
```

### 4️⃣ Configuration

```bash
# Créer le fichier .env
cp .env.example .env
```

**Modifiez `.env`** avec vos infos PostgreSQL :

```env
DATABASE_URL="postgresql://postgres:MOT_DE_PASSE@localhost:5432/pharmalink"
```

### 5️⃣ Initialiser la Base

```bash
# Créer les tables
npx prisma db push

# Générer le client
npx prisma generate

# Charger 40 médicaments + 10 pharmacies
npm run db:seed
```

### 6️⃣ Lancer !

```bash
npm run dev
```

**Ouvrez** → [http://localhost:3000](http://localhost:3000)

---

## 🎉 Vous devriez voir :

✅ **Page d'accueil** avec Hero section
✅ **Catalogue** de 40 médicaments
✅ **Pharmacies** avec carte interactive
✅ **Panier** fonctionnel
✅ **Système de réservation** 2h

---

## 📱 Pages Disponibles

| URL | Description |
|-----|-------------|
| `/` | Page d'accueil |
| `/medicaments` | Catalogue complet (40 médicaments) |
| `/pharmacies` | Carte des pharmacies (10 à Alger) |
| `/panier` | Panier d'achat |
| `/commande` | Processus de réservation |

---

## 🔧 Commandes Utiles

```bash
# Lancer le serveur
npm run dev

# Visualiser la base de données
npx prisma studio

# Recharger les données
npm run db:seed

# Build production
npm run build
```

---

## 📚 Documentation Complète

- **[INSTALLATION.md](./INSTALLATION.md)** → Guide détaillé pas à pas
- **[README.md](./README.md)** → Documentation technique complète
- **[QUICKSTART.md](./QUICKSTART.md)** → Démarrage rapide
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** → Résumé du projet
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** → Comment contribuer

---

## 🏗️ Architecture

```
PharmaLink/
├── app/                    # Pages Next.js
│   ├── page.tsx           # Accueil
│   ├── medicaments/       # Catalogue
│   ├── pharmacies/        # Carte
│   ├── panier/           # Panier
│   └── api/              # API REST
├── components/           # Composants React
├── lib/                  # Utilitaires
├── prisma/              # Base de données
│   ├── schema.prisma    # Modèles
│   └── seed.ts          # Données initiales
└── public/              # Assets statiques
```

---

## 💊 Données Disponibles

### 40 Médicaments
- Doliprane, Paracétamol, Ibuprofène
- Aspegic, Amoxicilline, Augmentin
- Smecta, Gaviscon, Spasfon
- Et 31 autres...

### 10 Pharmacies (Alger)
- Pharmacie Centrale (Alger Centre)
- Pharmacie Ben Aknoun
- Pharmacie Hydra ⭐ (de garde)
- Et 7 autres...

---

## 🌟 Fonctionnalités Implémentées

✅ **Recherche intelligente** de médicaments
✅ **Filtrage** par catégorie et disponibilité
✅ **Géolocalisation** automatique
✅ **Panier** avec localStorage
✅ **Réservation 2h** en pharmacie
✅ **Carte interactive** des pharmacies
✅ **Design responsive** mobile
✅ **40 médicaments** + **10 pharmacies**

---

## 🔐 Google Maps (Optionnel)

Pour activer la carte interactive :

1. Obtenez une clé API : [console.cloud.google.com](https://console.cloud.google.com/)
2. Ajoutez dans `.env` :

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="votre-cle-ici"
```

3. Redémarrez : `npm run dev`

---

## 🐛 Problème ?

### PostgreSQL ne démarre pas

```bash
# Mac
brew services start postgresql@14

# Linux
sudo systemctl start postgresql
```

### Port 3000 occupé

```bash
PORT=3001 npm run dev
```

### Erreur Prisma

```bash
npx prisma generate
```

---

## 🎯 Équipe PharmaLink

- **Elyssa KESSAB** - Marketing
- **Ouslimani RAYAN** - Technique
- **Mecheri CHAHINE** - Business
- **Ouahabi RATEB** - Finance

---

## 📞 Contact

- **Email** : contact@pharmalink.dz
- **Téléphone** : +213 551 23 45 67
- **Adresse** : 12 Rue Didouche Mourad, Alger Centre

---

## 💡 Prochaines Étapes

1. ✅ **Tester** toutes les pages
2. ✅ **Activer** Google Maps
3. ✅ **Personnaliser** les données
4. ✅ **Déployer** sur Vercel

---

<div align="center">

## 🚀 Bon Développement !

**PharmaLink** - Digitaliser l'accès au médicament en Algérie 🇩🇿

[Documentation](./README.md) • [Installation](./INSTALLATION.md) • [Résumé](./PROJECT_SUMMARY.md)

</div>
