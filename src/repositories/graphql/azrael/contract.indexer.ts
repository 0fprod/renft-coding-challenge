import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'
import { NftData } from '../../../models/NFTData'
import { map } from './mapper/mapper'
import { lendingsQuery } from './queries/lendings'

export interface AzraelContractIndexer {
  getLendingNfts: (perPage: number, page?: number) => Promise<NftData[]>
}

export const createAzraelContractIndexer = (): AzraelContractIndexer => {
  const uri: string = import.meta.env.VITE_AZRAEL_URL
  const gqlClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri, fetch })
  })

  const getLendingNfts = (perPage: number, page: number = 0): Promise<NftData[]> => {
    return gqlClient.query({ query: lendingsQuery, variables: { perPage, page } }).then(map)
  }

  return {
    getLendingNfts
  }
}
