import { NFT } from '../../models/NFT'
import './NftCard.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { BigNumber, FixedNumber } from '@ethersproject/bignumber'
import { useCallback } from 'react'
interface Props {
  nft: NFT
  toggleFav: (id: string) => void
}
export const NftCard: React.FC<Props> = ({ nft, toggleFav }) => {
  const handleFav = (): void => {
    toggleFav(nft.id)
  }

  const parsePrice = (priceInHex: string): string => {
    // I'm not sure how to format the price here
    return priceInHex
    // return BigNumber.from(priceInHex).toString()
  }

  const getAvailabilityClassNames = (): string[] => {
    const rentedOrAvailable = nft.availability === 'rented' ? 'rented' : 'available'
    return ['availability', rentedOrAvailable]
  }

  return (
    <div className="card-wrapper">
      <div className="image-wrapper">
        <img src={nft.imageUrl} alt={nft.name} width={120} height={150} />
        <span className="fav" onClick={handleFav} aria-label="fav">
          {nft.fav ? '❤️' : '💔'}
        </span>
        <span className="title">{nft.title ?? 'Untiteled'}</span>
      </div>
      <div className="costs-details">
        <label htmlFor="collateral">
          Collateral required: <span> {parsePrice(nft.collateralRequired)}</span>
        </label>

        <label htmlFor="rent">
          Cost of rent:
          <span> {parsePrice(nft.costOfRent)}</span>
        </label>
      </div>
      <hr />
      <div className="bottom-wrapper">
        <button className="details">View details</button>
        <span className={getAvailabilityClassNames().join(' ')}>{nft.availability}</span>
      </div>
    </div>
  )
}
