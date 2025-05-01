export interface User {
  id: number
  image: string
  username: string
  firstName?: string
  lastName?: string
  age?: number
  email?: string
  phone?: string
  address?: Address
  company?: Company
}

export interface Address {
  address: string
  city: string
  coordinates: Coordinates
  country: string
  postalCode: string
  state: string
  stateCode: string
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Company {
  address: Address
  department: string
  name: string
  title: string
}
