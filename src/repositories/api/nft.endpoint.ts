import { Network, Alchemy } from 'alchemy-sdk'
import { NFTMetadata } from '../../models/NFTMetadata'
import { map } from './mapper/mapper'

export interface NftEndpoint {
  clientExposedForTestingOnly: Alchemy
  getNftMetadata: (nftAddrss: string, tokenId: string) => Promise<NFTMetadata>
}

export const createNftEndpoint = (): NftEndpoint => {
  const alchemy = new Alchemy({
    apiKey: import.meta.env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET
  })

  const getNftMetadata = (nftAddress: string, tokenId: string): Promise<NFTMetadata> => {
    return alchemy.nft.getNftMetadata(nftAddress, tokenId).then(map)
  }

  return {
    clientExposedForTestingOnly: alchemy,
    getNftMetadata
  }
}
