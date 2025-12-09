import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-secondary-400">
              PharmaLink
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Votre solution digitale pour trouver et réserver vos médicaments
              en Algérie. Accès rapide, fiable et sécurisé.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary-400 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary-400 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary-400 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/medicaments"
                  className="text-gray-400 hover:text-white transition"
                >
                  Catalogue médicaments
                </Link>
              </li>
              <li>
                <Link
                  href="/pharmacies"
                  className="text-gray-400 hover:text-white transition"
                >
                  Trouver une pharmacie
                </Link>
              </li>
              <li>
                <Link
                  href="/comment-ca-marche"
                  className="text-gray-400 hover:text-white transition"
                >
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/a-propos"
                  className="text-gray-400 hover:text-white transition"
                >
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-gray-400 hover:text-white transition"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-gray-400 hover:text-white transition"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/cgu"
                  className="text-gray-400 hover:text-white transition"
                >
                  CGU
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-secondary-400 flex-shrink-0 mt-0.5" />
                <span>
                  12 Rue Didouche Mourad
                  <br />
                  Alger Centre, Algérie
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                <a href="tel:+213551234567" className="hover:text-white transition">
                  +213 551 23 45 67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                <a
                  href="mailto:contact@pharmalink.dz"
                  className="hover:text-white transition"
                >
                  contact@pharmalink.dz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer médical */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center mb-4">
            ⚠️ <strong>Avertissement:</strong> Les informations fournies par
            PharmaLink sont à titre informatif uniquement. Consultez toujours un
            professionnel de santé avant de prendre un médicament. Lisez la
            notice avant utilisation.
          </p>
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} PharmaLink Algérie. Tous droits réservés.
            <br />
            Développé avec ❤️ pour améliorer l'accès aux médicaments en Algérie.
          </p>
        </div>
      </div>
    </footer>
  )
}
