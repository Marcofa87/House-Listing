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
