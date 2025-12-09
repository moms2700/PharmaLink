// Types globaux pour PharmaLink

export interface Medicament {
  id: string
  name: string
  dci: string
  description: string
  price: number
  imageUrl: string | null
  category: string
  dosage: string | null
  form: string | null
  stock: number
  available: boolean
  prescription: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Pharmacy {
  id: string
  name: string
  address: string
  wilaya: string
  commune: string
  latitude: number
  longitude: number
  phone: string
  hours: string
  isGuard: boolean
  distance?: number
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  phone: string | null
  address: string | null
  wilaya: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  status: OrderStatus
  total: number
  pharmacyId: string | null
  reservedUntil: Date | null
  notes: string | null
  createdAt: Date
  updatedAt: Date
  items: OrderItem[]
  pharmacy?: Pharmacy
  user?: User
}

export interface OrderItem {
  id: string
  orderId: string
  medicamentId: string
  quantity: number
  price: number
  createdAt: Date
  medicament?: Medicament
}

export enum OrderStatus {
  PENDING = 'PENDING',
  RESERVED = 'RESERVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export interface CartItem {
  id: string
  name: string
  dci: string
  price: number
  quantity: number
  imageUrl?: string
}

export interface SearchFilters {
  search?: string
  category?: string
  available?: boolean
  minPrice?: number
  maxPrice?: number
}

export interface PharmacyFilters {
  wilaya?: string
  commune?: string
  isGuard?: boolean
  latitude?: number
  longitude?: number
  radius?: number
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
