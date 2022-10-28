import { NFT } from '../models/NFT'
import { NftData } from '../models/NFTData'
import { NFTMetadata } from '../models/NFTMetadata'
import { NftEndpoint } from '../repositories/api'
import { AzraelContractIndexer } from '../repositories/graphql/azrael'

export interface NftService {
  getNFTs: (first: number, skip?: number) => Promise<NFT[]>
  getAvailableNFTs: (first: number) => Promise<NFT[]>
}

export const createNftService = (
  azraelRepository: AzraelContractIndexer,
  nftMetadataRepository: NftEndpoint
): NftService => {
  const getNFTs = async (first: number, skip: number = 0): Promise<NFT[]> => {
    const nftData = await azraelRepository.getLendingNfts(first, skip)
    return await requestMetadata(nftData)
  }
  const getAvailableNFTs = async (first: number): Promise<NFT[]> => {
    const nftData = await azraelRepository.getAvailableLendingsOnly(first)
    return await requestMetadata(nftData)
  }

  const requestMetadata = async (nftData: NftData[]): Promise<NFT[]> => {
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
        availability: nftData[index].availability,
        collateralRequired: nftData[index].collateralRequired,
        costOfRent: nftData[index].costOfRent,
        paymentToken: nftData[index].paymentToken,
        fav: false,
        description: element.value.description,
        imageUrl: element.value.imageUrl,
        name: element.value.name,
        title: element.value.title
      })
    }
    return nftList
  }

  return {
    getNFTs,
    getAvailableNFTs
  }
}
