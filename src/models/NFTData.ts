export type Availability = 'rented' | 'available'
export interface NftData {
  address: string
  tokenId: string
  id: string
  costOfRent: string
  collateralRequired: string
  availability: Availability
}
