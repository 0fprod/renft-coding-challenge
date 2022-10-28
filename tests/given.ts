import { NFT } from '../src/models/NFT'

export function givenAnNft(nft: Partial<NFT>): NFT {
  return {
    title: nft.title ?? 'irrelevant',
    name: nft.name ?? 'irrelevant',
    description: nft.description ?? 'irrelevant',
    address: nft.address ?? 'irrelevant',
    fav: false,
    imageUrl: nft.imageUrl ?? 'irrelevant',
    tokenId: '0',
    availability: 'available',
    collateralRequired: '0x00000000',
    costOfRent: '0x00000000',
    id: '1',
    paymentToken: '1',

    ...nft
  }
}
