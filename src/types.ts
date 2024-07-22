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

export interface House {
  id: number
  image: string
  price: number
  location: Location
  rooms: Rooms
  size: number
}

export interface Apartment {
  price: number
  image?: File | null

  rooms: {
    bedrooms: number
    bathrooms: number
  }
  size: number
  location: {
    street: string
    houseNumber: string
    numberAddition?: string
    zip: string
    city: string
  }
  constructionYear: number
  hasGarage: boolean
  description: string
  madeByMe: boolean
}
