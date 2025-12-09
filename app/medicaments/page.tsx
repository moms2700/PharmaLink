'use client'

import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import MedicamentCard from '@/components/MedicamentCard'

interface Medicament {
  id: string
  name: string
  dci: string
  price: number
  imageUrl: string | null
  category: string
  stock: number
  prescription: boolean
}

const categories = [
  'Tous',
  'Antalgique/Antipyrétique',
  'Anti-inflammatoire',
  'Antibiotique',
  'Système Digestif',
  'Système Respiratoire',
  'Vitamines',
  'Soins & Hygiène',
  'Cardiovasculaire',
  'Dermatologie',
]

export default function MedicamentsPage() {
  const [medicaments, setMedicaments] = useState<Medicament[]>([])
  const [filteredMedicaments, setFilteredMedicaments] = useState<Medicament[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMedicaments()
  }, [])

  useEffect(() => {
    filterMedicaments()
  }, [searchQuery, selectedCategory, showOnlyAvailable, medicaments])

  const fetchMedicaments = async () => {
    try {
      const response = await fetch('/api/medicaments')
      const data = await response.json()
      setMedicaments(data)
      setFilteredMedicaments(data)
    } catch (error) {
      console.error('Erreur lors du chargement des médicaments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterMedicaments = () => {
    let filtered = [...medicaments]

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(
        (med) =>
          med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          med.dci.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtre par catégorie
    if (selectedCategory !== 'Tous') {
      filtered = filtered.filter((med) => med.category === selectedCategory)
    }

    // Filtre disponibilité
    if (showOnlyAvailable) {
      filtered = filtered.filter((med) => med.stock > 0)
    }

    setFilteredMedicaments(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Catalogue des médicaments
          </h1>
          <p className="text-gray-600">
            Parcourez notre sélection de 40+ médicaments disponibles
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Rechercher un médicament par nom ou DCI..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col space-y-4">
            {/* Catégories */}
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Catégories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Disponibilité */}
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyAvailable}
                  onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                  className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Afficher uniquement les médicaments disponibles
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredMedicaments.length}</span>{' '}
            médicament(s) trouvé(s)
          </p>
        </div>

        {/* Grille de médicaments */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Chargement des médicaments...</p>
          </div>
        ) : filteredMedicaments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedicaments.map((medicament) => (
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
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun médicament trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('Tous')
                setShowOnlyAvailable(false)
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
