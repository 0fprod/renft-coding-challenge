import { Nft } from '../models/NFT'
import { AzraelContractIndexer } from '../repositories/graphql/azrael'

export interface NftService {
  getLendingNfts: () => Promise<Nft[]>
}

export const createNftService = (repositories: AzraelContractIndexer): NftService => ({
  getLendingNfts: repositories.getLendingNfts
})
