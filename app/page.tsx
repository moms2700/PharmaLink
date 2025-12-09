import Link from 'next/link'
import { Search, MapPin, ShoppingCart, CheckCircle2, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import MedicamentCard from '@/components/MedicamentCard'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getMedicaments() {
  try {
    const medicaments = await prisma.medicament.findMany({
      take: 8,
      where: {
        available: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return medicaments
  } catch (error) {
    console.error('Erreur lors de la récupération des médicaments:', error)
    return []
  }
}

export default async function HomePage() {
  const medicaments = await getMedicaments()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Trouvez vos médicaments en un clic
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-50">
              PharmaLink vous aide à localiser et réserver vos médicaments dans les
              pharmacies les plus proches en Algérie
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-2xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Rechercher un médicament (ex: Doliprane, Paracétamol...)"
                className="flex-1 border-0 focus-visible:ring-0 text-gray-900"
              />
              <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600">
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">40+</div>
                <div className="text-primary-100">Médicaments disponibles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">10+</div>
                <div className="text-primary-100">Pharmacies partenaires</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">2h</div>
                <div className="text-primary-100">Réservation garantie</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              En 3 étapes simples, trouvez et réservez vos médicaments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Étape 1 */}
            <div className="text-center">
              <div className="bg-primary-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <Search className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Recherchez</h3>
              <p className="text-gray-600">
                Entrez le nom du médicament que vous cherchez
              </p>
            </div>

            {/* Étape 2 */}
            <div className="text-center">
              <div className="bg-primary-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <MapPin className="w-12 h-12 text-secondary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Localisez</h3>
              <p className="text-gray-600">
                Trouvez les pharmacies les plus proches qui l'ont en stock
              </p>
            </div>

            {/* Étape 3 */}
            <div className="text-center">
              <div className="bg-primary-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <ShoppingCart className="w-12 h-12 text-secondary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Réservez</h3>
              <p className="text-gray-600">
                Réservez pendant 2h et récupérez votre médicament
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/comment-ca-marche">
              <Button size="lg" variant="outline">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Catalogue Médicaments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Médicaments disponibles
              </h2>
              <p className="text-gray-600">
                Parcourez notre catalogue de 40+ médicaments
              </p>
            </div>
            <Link href="/medicaments">
              <Button variant="outline">Voir tout</Button>
            </Link>
          </div>

          {medicaments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {medicaments.map((medicament) => (
                <MedicamentCard
                  key={medicament.id}
                  id={medicament.id}
                  name={medicament.name}
                  dci={medicament.dci}
                  price={medicament.price}
                  imageUrl={medicament.imageUrl || undefined}
                  category={medicament.category}
                  stock={medicament.stock}
                  prescription={medicament.prescription}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                Aucun médicament disponible pour le moment.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Veuillez exécuter le seed de la base de données.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Pourquoi PharmaLink */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir PharmaLink ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircle2 className="w-12 h-12 text-secondary-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Disponibilité en temps réel</h3>
              <p className="text-gray-600">
                Consultez les stocks actuels des pharmacies pour éviter les
                déplacements inutiles
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="w-12 h-12 text-secondary-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Réservation rapide</h3>
              <p className="text-gray-600">
                Réservez votre médicament pendant 2h et récupérez-le à votre
                convenance
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-secondary-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Sécurisé et fiable</h3>
              <p className="text-gray-600">
                Vos données sont protégées et nos pharmacies partenaires sont
                certifiées
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à trouver vos médicaments ?
          </h2>
          <p className="text-xl mb-8 text-primary-50">
            Rejoignez des milliers d'algériens qui utilisent PharmaLink chaque jour
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/medicaments">
              <Button size="lg" variant="secondary" className="min-w-[200px]">
                Parcourir le catalogue
              </Button>
            </Link>
            <Link href="/pharmacies">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] bg-white text-primary-500 hover:bg-gray-100"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Trouver une pharmacie
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
