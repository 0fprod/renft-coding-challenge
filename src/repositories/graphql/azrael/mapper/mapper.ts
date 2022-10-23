import { Nft } from '../../../../models/NFT'

export const map = (lendingNfts: any): Nft[] => {
  return lendingNfts.lendings.map((item: any) => ({
    address: item.nftAddress
  }))
}
