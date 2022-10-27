import { screen } from '@testing-library/react'
import { givenAnNft } from '../../../tests/given'
import { Render } from '../../../tests/render'
import { Showcase } from './Showcase'

describe('Showcase', () => {
  it('renders one nft', () => {
    Render(<Showcase nfts={[givenAnNft({ title: 'a title', id: '1' })]} toggleFav={vi.fn()} />)
    expect(screen.getByText(/a title/i)).toBeInTheDocument()
  })

  it('renders many nft', () => {
    const collection = [givenAnNft({ title: 'a title', id: '1' }), givenAnNft({ title: 'another title', id: '2' })]
    Render(<Showcase nfts={collection} toggleFav={vi.fn()} />)
    expect(screen.getByText(/a title/i)).toBeInTheDocument()
    expect(screen.getByText(/another title/i)).toBeInTheDocument()
  })

  it('renders a message when there are no nfts', () => {
    Render(<Showcase nfts={[]} toggleFav={vi.fn()} />)
    expect(screen.queryByText(/no nfts/)).toBeInTheDocument()
  })

  it('emits an event when an nft is favourited', async () => {
    const spy = vi.fn()
    const { user } = Render(<Showcase nfts={[givenAnNft({ title: 'a title', id: '1' })]} toggleFav={spy} />)
    await user.click(screen.getByLabelText('fav'))
    expect(spy).toBeCalled()
  })
})
