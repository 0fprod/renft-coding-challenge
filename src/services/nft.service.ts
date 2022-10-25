import { Nft } from '../models/NFT'
import { NFTMetadata } from '../models/NFTMetadata'
import { NftEndpoint } from '../repositories/api'
import { AzraelContractIndexer } from '../repositories/graphql/azrael'

export interface NftService {
  getLendingNfts: () => Promise<Nft[]>
  getNftMetadata: (nftAddress: string, tokenId: string) => Promise<NFTMetadata>
}

export const createNftService = (
  azralRepository: AzraelContractIndexer,
  nftMetadataRepository: NftEndpoint
): NftService => ({
  getLendingNfts: azralRepository.getLendingNfts,
  getNftMetadata: nftMetadataRepository.getNftMetadata
})
