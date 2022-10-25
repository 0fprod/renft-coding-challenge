import React from 'react'
import { ServiceContext } from '../contexts/services.context'
import { NftService } from '../services/nft.service'

export const useNft = (): NftService => {
  const { nftService } = React.useContext(ServiceContext)

  return {
    ...nftService
  }
}
