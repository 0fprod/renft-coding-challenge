import { NFT } from '../../models/NFT'

interface Props {
  nft: NFT
}
export const NftCard: React.FC<Props> = ({ nft }) => {
  return (
    <div>
      <div>{nft.title}</div>
      <div>{nft.address}</div>
    </div>
  )
}
