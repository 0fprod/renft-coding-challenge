import { screen } from '@testing-library/react'
import { givenAnNft } from '../../../tests/given'
import { Render } from '../../../tests/render'
import { NftCard } from './NftCard'

describe('NFTCard', () => {
  it('renders', () => {
    Render(<NftCard nft={givenAnNft({ title: 'nft title' })} />)
    expect(screen.getByText(/nft title/i)).toBeInTheDocument()
  })
})
