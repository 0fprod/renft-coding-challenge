import { screen } from '@testing-library/react'
import { givenAnNft } from '../../../tests/given'
import { Render } from '../../../tests/render'
import { Showcase } from './Showcase'

describe('Showcase', () => {
  it('renders one nft', () => {
    Render(<Showcase nfts={[givenAnNft({ title: 'a title' })]} />)
    expect(screen.getByText(/a title/i)).toBeInTheDocument()
  })

  it('renders many nft', () => {
    const collection = [givenAnNft({ title: 'a title' }), givenAnNft({ title: 'another title' })]
    Render(<Showcase nfts={collection} />)
    expect(screen.getByText(/a title/i)).toBeInTheDocument()
    expect(screen.getByText(/another title/i)).toBeInTheDocument()
  })
  it('renders a message when there are no nfts', () => {
    Render(<Showcase nfts={[]} />)
    expect(screen.queryByText(/no nfts/)).toBeInTheDocument()
  })
})
