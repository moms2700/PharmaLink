#!/bin/bash

# ========================================
# Script de Déploiement Automatique
# PharmaLink - Startup Algérienne
# ========================================

echo "🏥 =============================================="
echo "   PharmaLink - Déploiement Automatique"
echo "   Site web de disponibilité des médicaments"
echo "============================================== 🏥"
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher des messages
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérifier Node.js
print_info "Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    echo ""
    echo "📦 Pour installer Node.js :"
    echo ""
    echo "Option 1 - Téléchargement direct :"
    echo "   1. Ouvrez : https://nodejs.org/"
    echo "   2. Téléchargez la version LTS"
    echo "   3. Installez le fichier .pkg"
    echo ""
    echo "Option 2 - Homebrew :"
    echo "   brew install node"
    echo ""
    echo "Puis relancez ce script : ./auto-deploy.sh"
    exit 1
fi

NODE_VERSION=$(node --version)
print_success "Node.js détecté : $NODE_VERSION"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

NPM_VERSION=$(npm --version)
print_success "npm détecté : $NPM_VERSION"
echo ""

# Vérifier si on est dans le bon dossier
if [ ! -f "package.json" ]; then
    print_error "Erreur : package.json introuvable"
    echo "Assurez-vous d'être dans le dossier PharmaLink"
    exit 1
fi

print_success "Dossier PharmaLink détecté"
echo ""

# Menu principal
echo "🎯 Que voulez-vous faire ?"
echo ""
echo "1. 🧪 Tester localement (avec SQLite - rapide)"
echo "2. 🚀 Déployer sur Vercel (gratuit)"
echo "3. 📦 Installer les dépendances seulement"
echo "4. 📖 Afficher les guides"
echo "5. ❌ Quitter"
echo ""
read -p "Votre choix (1-5) : " choice

case $choice in
    1)
        # Test local avec SQLite
        echo ""
        print_info "🧪 Configuration pour test local..."
        echo ""

        # Installer les dépendances
        print_info "Installation des dépendances (peut prendre 2-3 minutes)..."
        npm install

        if [ $? -ne 0 ]; then
            print_error "Erreur lors de l'installation des dépendances"
            exit 1
        fi
        print_success "Dépendances installées"
        echo ""

        # Configurer SQLite pour test rapide
        print_info "Configuration de la base de données SQLite..."

        # Créer .env si nécessaire
        if [ ! -f ".env" ]; then
            cp .env.example .env
            echo 'DATABASE_URL="file:./dev.db"' >> .env
            print_success "Fichier .env créé avec SQLite"
        fi

        # Modifier prisma/schema.prisma temporairement
        print_info "Configuration du schéma Prisma pour SQLite..."
        sed -i.bak 's/provider = "postgresql"/provider = "sqlite"/' prisma/schema.prisma

        # Initialiser la base
        print_info "Création de la base de données..."
        npx prisma db push --force-reset > /dev/null 2>&1
        npx prisma generate > /dev/null 2>&1

        # Charger les données
        print_info "Chargement des 40 médicaments et 10 pharmacies..."
        npm run db:seed > /dev/null 2>&1

        print_success "Base de données initialisée !"
        echo ""

        print_success "🎉 Tout est prêt !"
        echo ""
        echo "🚀 Lancement du serveur de développement..."
        echo ""
        echo "📱 Votre site sera accessible sur :"
        echo "   ${GREEN}http://localhost:3000${NC}"
        echo ""
        echo "Pour arrêter le serveur : Ctrl+C"
        echo ""

        # Lancer le serveur
        npm run dev
        ;;

    2)
        # Déploiement Vercel
        echo ""
        print_info "🚀 Déploiement sur Vercel..."
        echo ""

        # Vérifier si vercel est installé
        if ! command -v vercel &> /dev/null; then
            print_warning "Vercel CLI n'est pas installé"
            print_info "Installation de Vercel CLI..."
            npm install -g vercel
        fi

        print_success "Vercel CLI prêt"
        echo ""

        # Restaurer PostgreSQL dans schema.prisma si SQLite était configuré
        print_info "Vérification de la configuration..."
        sed -i.bak 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma

        print_info "Connexion à Vercel..."
        vercel login

        echo ""
        print_info "Déploiement en cours..."
        echo ""

        vercel --prod

        echo ""
        print_success "🎉 Déploiement terminé !"
        echo ""
        print_warning "⚠️  N'oubliez pas de :"
        echo "1. Configurer la base de données Neon : https://neon.tech"
        echo "2. Ajouter DATABASE_URL dans Vercel"
        echo "3. Exécuter le seed en production"
        echo ""
        echo "📖 Guide complet : DEPLOY_NOW.md"
        ;;

    3)
        # Installation dépendances seulement
        echo ""
        print_info "📦 Installation des dépendances..."
        npm install
        print_success "✅ Dépendances installées !"
        ;;

    4)
        # Afficher les guides
        echo ""
        echo "📖 GUIDES DISPONIBLES"
        echo "===================="
        echo ""
        echo "🚀 DEPLOY_NOW.md"
        echo "   → Déploiement rapide en 10 minutes"
        echo ""
        echo "📘 INSTALLATION.md"
        echo "   → Installation complète pas à pas"
        echo ""
        echo "⚡ QUICKSTART.md"
        echo "   → Lancement rapide en 5 minutes"
        echo ""
        echo "📊 PROJECT_SUMMARY.md"
        echo "   → Résumé complet du projet"
        echo ""
        echo "🎯 START_HERE.md"
        echo "   → Point de départ recommandé"
        echo ""
        echo "Pour ouvrir un guide :"
        echo "   open DEPLOY_NOW.md"
        ;;

    5)
        # Quitter
        print_info "Au revoir ! 👋"
        exit 0
        ;;

    *)
        print_error "Choix invalide"
        exit 1
        ;;
esac

echo ""
print_success "Script terminé avec succès !"
echo ""
