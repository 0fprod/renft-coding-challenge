import { ApolloQueryResult } from '@apollo/client'
import { Nft } from '../../../../models/NFT'

export const map = (result: ApolloQueryResult<any>): Nft[] => {
  return result.data.allLendings.map((item: any) => ({
    address: item.nftAddress
  }))
}
