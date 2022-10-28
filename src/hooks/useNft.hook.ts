import React from 'react'
import { ServiceContext } from '../contexts/services.context'
import { NFT } from '../models/NFT'
import { NftService } from '../services/nft.service'

export const useNft = (): NftService => {
  const { nftService, storageService } = React.useContext(ServiceContext)
  const { isFav } = storageService

  const getNFTsWithFavState = (first: number, skip?: number): Promise<NFT[]> => {
    return nftService.getNFTs(first, skip).then((nfts) =>
      nfts.map((nft) => {
        nft.fav = isFav(nft.id)
        return nft
      })
    )
  }

  return {
    getNFTs: getNFTsWithFavState
  }
}
