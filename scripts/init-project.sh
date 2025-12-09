#!/bin/bash

# Script d'initialisation PharmaLink
# Ce script configure automatiquement le projet

echo "🏥 Initialisation de PharmaLink..."
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer : https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js détecté : $(node --version)"

# Vérifier PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL n'est pas détecté dans le PATH"
    echo "   Assurez-vous qu'il est installé et lancé"
else
    echo "✅ PostgreSQL détecté"
fi

echo ""
echo "📦 Installation des dépendances..."
npm install

echo ""
echo "📝 Configuration de l'environnement..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Fichier .env créé"
    echo "⚠️  IMPORTANT: Modifiez le fichier .env avec vos informations PostgreSQL"
    echo ""
    read -p "Appuyez sur Entrée après avoir modifié .env..."
else
    echo "✅ Fichier .env déjà existant"
fi

echo ""
echo "🗄️  Initialisation de la base de données..."
echo "   Création des tables..."
npx prisma db push

echo ""
echo "   Génération du client Prisma..."
npx prisma generate

echo ""
echo "🌱 Chargement des données initiales..."
echo "   - 40 médicaments"
echo "   - 10 pharmacies à Alger"
npm run db:seed

echo ""
echo "✅ Initialisation terminée !"
echo ""
echo "🚀 Pour lancer l'application :"
echo "   npm run dev"
echo ""
echo "📊 Pour visualiser la base de données :"
echo "   npx prisma studio"
echo ""
echo "🌐 L'application sera disponible sur : http://localhost:3000"
echo ""
