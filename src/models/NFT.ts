import { NftData } from './NFTData'
import { NFTMetadata } from './NFTMetadata'

export interface NFT extends NftData, NFTMetadata {
  fav: boolean
}
