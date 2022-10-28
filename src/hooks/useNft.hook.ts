import React from 'react'
import { ServiceContext } from '../contexts/services.context'
import { NFT } from '../models/NFT'
import { NftService } from '../services/nft.service'

export const useNft = (): NftService => {
  const { nftService, storageService } = React.useContext(ServiceContext)
  const { isFav } = storageService

  const getNFTsWithFavState = (first: number, skip?: number): Promise<NFT[]> => {
    return nftService.getNFTs(first, skip).then(updateStateWithFavs)
  }

  const getAvailableNFTsWithFavState = (first: number): Promise<NFT[]> => {
    return nftService.getAvailableNFTs(first).then(updateStateWithFavs)
  }

  const updateStateWithFavs = (nfts: NFT[]): NFT[] => {
    return nfts.map((nft) => {
      nft.fav = isFav(nft.id)
      return nft
    })
  }

  return {
    getNFTs: getNFTsWithFavState,
    getAvailableNFTs: getAvailableNFTsWithFavState
  }
}
