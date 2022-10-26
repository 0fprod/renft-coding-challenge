import { NftData } from '../../../models/NFTData'
import { map } from './mapper/mapper'
import { lendingsQuery } from './queries/lendings'
import GraphQLjs from 'graphql.js'

export interface AzraelContractIndexer {
  getLendingNfts: (perPage: number, page?: number) => Promise<NftData[]>
}

export const createAzraelContractIndexer = (): AzraelContractIndexer => {
  const uri: string = import.meta.env.VITE_AZRAEL_URL
  const graphqlClient = GraphQLjs(uri)

  const getLendingNfts = async (perPage: number, page: number = 0): Promise<NftData[]> => {
    const lazyQuery = graphqlClient(lendingsQuery)
    return lazyQuery({ perPage, page }).then(map)
  }

  return {
    getLendingNfts
  }
}
