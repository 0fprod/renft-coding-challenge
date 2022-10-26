import { NFT } from '../models/NFT'
import { NftData } from '../models/NFTData'
import { NFTMetadata } from '../models/NFTMetadata'
import { NftEndpoint } from '../repositories/api'
import { AzraelContractIndexer } from '../repositories/graphql/azrael'

export interface NftService {
  getNFTs: (perPage: number, page?: number) => Promise<NFT[]>
}

export const createNftService = (
  azraelRepository: AzraelContractIndexer,
  nftMetadataRepository: NftEndpoint
): NftService => {
  const getNFTs = async (perPage: number, page: number = 0): Promise<NFT[]> => {
    const nftData = await azraelRepository.getLendingNfts(perPage, page)
    const nftMetadataPromises = nftData.map((item) => nftMetadataRepository.getNftMetadata(item.address, item.tokenId))
    const nftMetadata = await Promise.allSettled(nftMetadataPromises)
    const nfts = merge(nftData, nftMetadata)
    return nfts
  }

  const merge = (nftData: NftData[], nftMetadata: Array<PromiseSettledResult<NFTMetadata>>): NFT[] => {
    const nftList: NFT[] = []
    for (let index = 0; index < nftMetadata.length; index++) {
      const element = nftMetadata[index]
      if (element.status === 'rejected') continue

      nftList.push({
        id: nftData[index].id,
        address: nftData[index].address,
        tokenId: nftData[index].tokenId,
        description: element.value.description,
        fav: false,
        imageUrl: element.value.imageUrl,
        name: element.value.name,
        title: element.value.title,
        details: [],
        attributes: []
      })
    }
    return nftList
  }

  return {
    getNFTs
  }
}
