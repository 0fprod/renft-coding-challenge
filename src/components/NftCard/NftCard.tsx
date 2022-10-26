import { NFT } from '../../models/NFT'

interface Props {
  nft: NFT
}
export const NftCard: React.FC<Props> = ({ nft }) => {
  return (
    <div>
      <div>{nft.title}</div>
      <div>{nft.address}</div>
      <img src={nft.imageUrl} alt={nft.name} width={120} height={150} />
    </div>
  )
}
