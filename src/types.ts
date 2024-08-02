// types.ts

export interface Location {
  street: string
  city: string
  zip: string
}

export interface Rooms {
  bedrooms: number
  bathrooms: number
}

// types.ts

export interface House {
  id?: number
  price: number
  image?: File | null
  location: {
    street: string
    houseNumber: string
    numberAddition?: string
    zip: string
    city: string
  }
  rooms: {
    bedrooms: number
    bathrooms: number
  }
  size: number
  constructionYear: number
  hasGarage: boolean
  description: string
  madeByMe?: boolean
}
