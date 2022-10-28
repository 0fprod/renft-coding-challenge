import { NftData } from '../../../models/NFTData'
import { map } from './mapper/mapper'
import { lendingsQuery, availableLendings } from './queries'
import { createClient, Client } from 'urql'

export interface AzraelContractIndexer {
  clientExposedForTestingOnly: Client
  getLendingNfts: (first: number, skip?: number) => Promise<NftData[]>
  getAvailableLendingsOnly: (first: number) => Promise<NftData[]>
}

export const createAzraelContractIndexer = (): AzraelContractIndexer => {
  const uri: string = import.meta.env.VITE_AZRAEL_URL
  const graphqlClient = createClient({ url: uri })

  const getLendingNfts = async (first: number, skip: number = 0): Promise<NftData[]> => {
    return await graphqlClient.query(lendingsQuery, { first, skip }).toPromise().then(map)
  }

  const getAvailableLendingsOnly = async (first: number): Promise<NftData[]> => {
    return await graphqlClient.query(availableLendings, { first }).toPromise().then(map)
  }

  return {
    clientExposedForTestingOnly: graphqlClient,
    getLendingNfts,
    getAvailableLendingsOnly
  }
}
