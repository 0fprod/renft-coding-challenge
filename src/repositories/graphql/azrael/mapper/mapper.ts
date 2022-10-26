import { NftData } from '../../../../models/NFTData'

export const map = (result: any): NftData[] => {
  return result.allLendings.map((item: any) => ({
    address: item.nftAddress,
    tokenId: item.tokenId,
    id: item.id
  }))
}
