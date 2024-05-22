export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  quantity: number
  price_before_discount: number
  sold: number
  view: number
  name: string
  description: string
  category: {
    _id: string
    name: string
    _v: number
  }
  image: string
  createdAt: string
  updatedAt: string
}

export interface ProductList {
  products: Product[]
  total: number
  limit: number
  page_size: number
}

export interface ProductListConfig {
  page?: number
  limit?: number
  sort_by?: 'createdAt' | 'price' | 'sold' | 'view'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
