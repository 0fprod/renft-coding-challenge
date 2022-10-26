import { NFT } from '../src/models/NFT'

export function givenAnNft(nft: Partial<NFT>): NFT {
  return {
    title: nft.title ?? 'irrelevant',
    name: nft.name ?? 'irrelevant',
    description: nft.description ?? 'irrelevant',
    address: nft.address ?? 'irrelevant',
    fav: false,
    imageUrl: nft.imageUrl ?? 'irrelevant',
    details: [],
    attributes: [],

    ...nft
  }
}
