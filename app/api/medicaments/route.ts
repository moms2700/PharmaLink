export const dynamic = 'force-dynamic';

type Medicament = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
};

const data: Medicament[] = [
  { id: 1, name: 'Paracétamol 500mg x16', price: 250, category: 'Douleur', imageUrl: 'https://images.unsplash.com/photo-1587017620151-3b6a957b5a58?w=400' },
  { id: 2, name: 'Ibuprofène 400mg x12', price: 350, category: 'Douleur', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400' },
  { id: 3, name: 'Préservatifs Durex Classic x12', price: 650, category: 'Contraception', imageUrl: 'https://images.unsplash.com/photo-1613769528463-0f0448a63a7b?w=400' },
  { id: 4, name: 'Vitamine D3 1000 UI x30', price: 900, category: 'Vitamines', imageUrl: 'https://images.unsplash.com/photo-1582738412016-b6c2b44b3e6b?w=400' },
];

export async function GET() {
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}
