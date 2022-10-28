import { NftData } from '../../../models/NFTData'
import { map } from './mapper/mapper'
import { lendingsQuery } from './queries/lendings'
import { createClient } from 'urql'

export interface AzraelContractIndexer {
  getLendingNfts: (first: number, skip?: number) => Promise<NftData[]>
}

export const createAzraelContractIndexer = (): AzraelContractIndexer => {
  const uri: string = import.meta.env.VITE_AZRAEL_URL
  const graphqlClient = createClient({ url: uri })

  const getLendingNfts = async (first: number, skip: number = 0): Promise<NftData[]> => {
    return await graphqlClient.query(lendingsQuery, { first, skip }).toPromise().then(map)
  }

  return {
    getLendingNfts
  }
}
