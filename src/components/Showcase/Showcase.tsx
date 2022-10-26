import { NFT } from '../../models/NFT'
import { NftCard } from '../NftCard/NftCard'

interface Props {
  nfts: NFT[]
}

export const Showcase: React.FC<Props> = ({ nfts = [] }) => {
  return (
    <div>
      <h1>List of nfts</h1>
      {nfts.length === 0 && <h5>no nfts</h5>}
      <ul>
        {nfts.map((nft) => (
          <li key={nft.tokenId}>
            <NftCard nft={nft} />
          </li>
        ))}
      </ul>
    </div>
  )
}
