import { Nft } from '../models/NFT'
import { NFTMetadata } from '../models/NFTMetadata'
import { NftEndpoint } from '../repositories/alchemy'
import { AzraelContractIndexer } from '../repositories/graphql/azrael'

export interface NftService {
  getLendingNfts: () => Promise<Nft[]>
  getNftMetadata: (nftAddress: string, tokenId: string) => Promise<NFTMetadata>
}

export const createNftService = (
  azralRepository: AzraelContractIndexer,
  alchemyRepository: NftEndpoint
): NftService => ({
  getLendingNfts: azralRepository.getLendingNfts,
  getNftMetadata: alchemyRepository.getNftMetadata
})
