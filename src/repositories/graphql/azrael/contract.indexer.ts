import { GraphQLClient } from 'graphql-request'
import { Nft } from '../../../models/NFT'
import { lendingsQuery } from './queries/lendings'

export interface AzraelContractIndexer {
  getLendingNfts: () => Promise<Nft[]>
}

export const createAzraelContractIndexer = (): AzraelContractIndexer => {
  const uri: string = import.meta.env.VITE_AZRAEL_URL
  const gqlClient = new GraphQLClient(uri)
  console.log(gqlClient)

  const getLendingNfts = async (): Promise<Nft[]> => {
    try {
      return await gqlClient.request(lendingsQuery).then((r) => r.lendings)
    } catch (e) {
      console.error('Error while fetching -->', e)
      return []
    }
  }

  return {
    getLendingNfts
  }
}
