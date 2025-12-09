import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const medicament = await prisma.medicament.findUnique({
      where: { id: params.id },
    })

    if (!medicament) {
      return NextResponse.json(
        { error: 'Médicament non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(medicament)
  } catch (error) {
    console.error('Erreur API medicament:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du médicament' },
      { status: 500 }
    )
  }
}
