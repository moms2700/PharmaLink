# 🚀 Guide de Démarrage Rapide - PharmaLink

Ce guide vous permet de lancer PharmaLink en **5 minutes** !

## ⚡ Installation Express

### 1. Prérequis
- Node.js 18+ installé
- PostgreSQL installé et lancé

### 2. Installation en une commande

```bash
# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env
```

### 3. Configurer la base de données

Modifiez `.env` avec vos informations PostgreSQL :

```env
DATABASE_URL="postgresql://votre_user:votre_password@localhost:5432/pharmalink"
```

### 4. Initialiser et lancer

```bash
# Créer les tables et charger les données
npx prisma db push && npx prisma generate && npm run db:seed

# Lancer l'application
npm run dev
```

### 5. Ouvrir dans le navigateur

Allez sur [http://localhost:3000](http://localhost:3000)

## ✅ Vérification

Vous devriez voir :
- ✅ Page d'accueil avec Hero section
- ✅ 40 médicaments dans le catalogue
- ✅ 10 pharmacies sur la carte
- ✅ Panier fonctionnel
- ✅ Système de réservation

## 🎯 Prochaines Étapes

### Activer Google Maps (optionnel)

1. Obtenez une clé API sur [Google Cloud Console](https://console.cloud.google.com/)
2. Ajoutez-la dans `.env` :

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="votre-cle-api"
```

3. Redémarrez le serveur : `npm run dev`

### Visualiser la base de données

```bash
npx prisma studio
```

Ouvre une interface graphique sur [http://localhost:5555](http://localhost:5555)

## 🐛 Dépannage

### Erreur de connexion PostgreSQL

```bash
# Vérifiez que PostgreSQL est lancé
# Sur Mac :
brew services start postgresql@14

# Sur Linux :
sudo systemctl start postgresql

# Créez la base si elle n'existe pas
createdb pharmalink
```

### Erreur Prisma Client

```bash
npx prisma generate
```

### Port 3000 déjà utilisé

```bash
# Utilisez un autre port
PORT=3001 npm run dev
```

## 📚 Commandes Utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer le serveur de dev |
| `npm run build` | Build production |
| `npm start` | Lancer en production |
| `npm run db:seed` | Recharger les données |
| `npx prisma studio` | Interface DB |
| `npx prisma db push` | Synchroniser le schéma |

## 🎉 C'est tout !

Vous avez maintenant PharmaLink fonctionnel !

Pour plus de détails, consultez le [README.md](./README.md)
