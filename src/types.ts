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
  madeByMe: boolean
}

export interface Apartment {
  streetName: string
  houseNumber: string
  numberAddition?: string
  zip: string
  city: string
  price: number
  image: File | null
  bedrooms: number
  bathrooms: number
  size: number
  constructionYear: number
  hasGarage: boolean
  description: string
}

export interface HouseData {
  price: string
  bedrooms: string
  bathrooms: string
  size: string
  streetName: string
  houseNumber: string
  numberAddition: string
  zip: string
  city: string
  constructionYear: string
  hasGarage: string
  description: string
}

export interface EditHouseState {
  isLoading: boolean
  error: string | null
}
