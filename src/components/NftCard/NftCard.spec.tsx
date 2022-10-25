import { screen } from '@testing-library/react'
import { Render } from '../../../tests/render'
import { NFT } from '../../models/NFT'
import { NftCard } from './NftCard'

describe('NFTCard', () => {
  it('renders', () => {
    Render(<NftCard nft={givenAnNft(givenAnNft({ title: 'nft title' }))} />)
    expect(screen.getByText(/nft title/i)).toBeInTheDocument()
  })
})

function givenAnNft(nft: Partial<NFT>): NFT {
  return {
    title: nft.title ?? 'irrelevant',
    name: nft.name ?? 'irrelevant',
    description: nft.description ?? 'irrelevant',
    address: nft.address ?? 'irrelevant',
    fav: false,
    imageUrl: nft.imageUrl ?? 'irrelevant',
    details: [],
    attributes: [],

    ...nft
  }
}
