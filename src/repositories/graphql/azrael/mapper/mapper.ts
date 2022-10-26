import { ApolloQueryResult } from '@apollo/client'
import { NftData } from '../../../../models/NFTData'

export const map = (result: ApolloQueryResult<any>): NftData[] => {
  return result.data.allLendings.map((item: any) => ({
    address: item.nftAddress,
    tokenId: item.tokenId
  }))
}
