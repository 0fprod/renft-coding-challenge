import { NFT } from '../../models/NFT'
import { NftCard } from '../NftCard/NftCard'
import './Showcase.css'
interface Props {
  nfts: NFT[]
  toggleFav: (id: string) => void
}

export const Showcase: React.FC<Props> = ({ nfts = [], toggleFav }) => {
  return (
    <div>
      <h1>List of nfts</h1>
      {nfts.length === 0 && <h5>no nfts</h5>}
      <ul className="list">
        {nfts.map((nft) => (
          <li key={nft.id}>
            <NftCard nft={nft} toggleFav={toggleFav} />
          </li>
        ))}
      </ul>
    </div>
  )
}
