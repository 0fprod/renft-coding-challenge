import { NFT } from '../../models/NFT'

interface Props {
  nft: NFT
  toggleFav: (id: string) => void
}
export const NftCard: React.FC<Props> = ({ nft, toggleFav }) => {
  const handleFav = (): void => {
    toggleFav(nft.id)
  }
  return (
    <div>
      <div>
        {nft.title} -{' '}
        <span onClick={handleFav} aria-label="fav">
          {nft.fav ? '❤️' : '💔'}
        </span>
      </div>

      <div>{nft.address}</div>
      <img src={nft.imageUrl} alt={nft.name} width={120} height={150} />
    </div>
  )
}
