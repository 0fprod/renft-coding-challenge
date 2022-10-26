import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'
import { NftData } from '../../../models/NFTData'
import { map } from './mapper/mapper'
import { lendingsQuery } from './queries/lendings'

export interface AzraelContractIndexer {
  getLendingNfts: () => Promise<NftData[]>
}

export const createAzraelContractIndexer = (): AzraelContractIndexer => {
  const uri: string = import.meta.env.VITE_AZRAEL_URL
  const gqlClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri, fetch })
  })

  const getLendingNfts = (): Promise<NftData[]> => {
    return gqlClient.query({ query: lendingsQuery }).then(map)
  }

  return {
    getLendingNfts
  }
}
