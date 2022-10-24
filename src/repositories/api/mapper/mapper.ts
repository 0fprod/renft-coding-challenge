import { NFTMetadata } from '../../../models/NFTMetadata'

export const map = (nft: any): NFTMetadata => {
  return {
    address: nft.contract.address,
    name: nft.contract.name,
    description: nft.description,
    title: nft.title,
    attributes: [],
    details: [],
    imageUrl: nft.media[0].gateway
  }
}
