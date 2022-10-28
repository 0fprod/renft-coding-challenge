import { NFT } from '../../models/NFT'
import './NftCard.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BigNumber, FixedNumber } from '@ethersproject/bignumber'
import { Media } from '../Media/Media'
interface Props {
  nft: NFT
  toggleFav: (id: string) => void
}
export const NftCard: React.FC<Props> = ({ nft, toggleFav }) => {
  const handleFav = (): void => {
    toggleFav(nft.id)
  }

  const parseAmount = (amount: string): string => {
    // I'm not sure how to format the price here 😅
    // return FixedNumber.fromBytes(amount).toString()
    return BigNumber.from(amount).toString()
  }

  const getAvailabilityClassNames = (): string[] => {
    const rentedOrAvailable = nft.availability === 'rented' ? 'rented' : 'available'
    return ['availability', rentedOrAvailable]
  }

  return (
    <div className="card-wrapper">
      <div className="image-wrapper">
        <Media url={nft.imageUrl} name={nft.name} />
        <span className="fav" onClick={handleFav} aria-label="fav">
          {nft.fav ? '❤️' : '💔'}
        </span>
        <span className="title">{nft.title ?? 'Untiteled'}</span>
      </div>
      <div className="costs-details">
        <label htmlFor="collateral">
          Collateral req:{' '}
          <span>
            {' '}
            {parseAmount(nft.collateralRequired)} {nft.paymentToken}
          </span>
        </label>

        <label htmlFor="rent">
          Cost of rent:
          <span>
            {' '}
            {parseAmount(nft.costOfRent)} {nft.paymentToken}
          </span>
        </label>
      </div>
      <div className="bottom-wrapper">
        <button className="details" onClick={() => alert('Not implemented')}>
          View details
        </button>
        <span className={getAvailabilityClassNames().join(' ')}>{nft.availability}</span>
      </div>
    </div>
  )
}
