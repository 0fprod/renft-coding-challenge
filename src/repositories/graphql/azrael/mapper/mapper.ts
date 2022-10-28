import { Availability, NftData } from '../../../../models/NFTData'

const getAvilability = (lendingNft: any): Availability => {
  return lendingNft === null ? 'available' : 'rented'
}

const mapOne = (lendingNft: any): NftData => {
  return {
    id: lendingNft.id,
    tokenId: lendingNft.tokenId,
    address: lendingNft.nftAddress,
    costOfRent: lendingNft.dailyRentPrice,
    collateralRequired: lendingNft.nftPrice,
    availability: getAvilability(lendingNft)
  }
}

export const map = (result: any): NftData[] => {
  return result.data.lendings.map(mapOne)
}
