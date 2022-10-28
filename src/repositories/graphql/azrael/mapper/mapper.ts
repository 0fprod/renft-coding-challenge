import { Availability, NftData } from '../../../../models/NFTData'
import { PaymentToken } from '../../../../models/PaymentToken'

const getAvilability = (lendingNft: any): Availability => {
  return lendingNft.renting === null ? 'available' : 'rented'
}

const getPaymentToken = (lendingNft: any): string => {
  return PaymentToken[lendingNft.paymentToken] ?? '-'
}

const mapOne = (lendingNft: any): NftData => {
  return {
    id: lendingNft.id,
    tokenId: lendingNft.tokenId,
    address: lendingNft.nftAddress,
    costOfRent: lendingNft.dailyRentPrice,
    collateralRequired: lendingNft.nftPrice,
    availability: getAvilability(lendingNft),
    paymentToken: getPaymentToken(lendingNft)
  }
}

export const map = (result: any): NftData[] => {
  return result.data.lendings.map(mapOne)
}
