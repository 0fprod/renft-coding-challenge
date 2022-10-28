import { screen } from '@testing-library/react'
import { givenAnNft } from '../../../tests/given'
import { Render } from '../../../tests/render'
import { PaymentToken } from '../../models/PaymentToken'
import { NftCard } from './NftCard'

describe('NFTCard', () => {
  it('renders', () => {
    Render(<NftCard nft={givenAnNft({ title: 'nft title' })} toggleFav={() => {}} />)
    expect(screen.getByText(/nft title/i)).toBeInTheDocument()
  })

  it('emits an event when fav is clicked', async () => {
    const fav = vi.fn()
    const { user } = Render(<NftCard nft={givenAnNft({ id: 'anId' })} toggleFav={fav} />)
    const favElement = screen.getByLabelText('fav')
    await user.click(favElement)
    expect(fav).toHaveBeenCalled()
    expect(fav).toHaveBeenCalledWith('anId')
  })

  it('applies classnames bases on availability', () => {
    Render(<NftCard nft={givenAnNft({ availability: 'rented' })} toggleFav={vi.fn} />)

    expect(screen.getByText('rented')).toHaveClass('availability rented')
  })

  it('displays the correct unit', () => {
    Render(<NftCard nft={givenAnNft({ paymentToken: PaymentToken[2] })} toggleFav={vi.fn} />)
    expect(screen.getAllByText('0 DAI')).toHaveLength(2)
  })
})
