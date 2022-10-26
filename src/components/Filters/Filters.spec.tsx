import { screen } from '@testing-library/react'
import { Render } from '../../../tests/render'
import { Filters } from './Filters'

describe('Filter component', () => {
  const noop = vitest.fn()

  it('renders', () => {
    Render(<Filters onInput={noop} toggleFavourites={noop} toggleAvailable={noop} />)

    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'filter favourites only' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'filter availables only' })).toBeInTheDocument()
  })

  it('emits an event when the input text changes', async () => {
    const onInput = vitest.fn()
    const { user } = Render(<Filters onInput={onInput} toggleFavourites={noop} toggleAvailable={noop} />)
    const searchBox = screen.getByRole('searchbox')

    await user.type(searchBox, 'an nft title')

    expect(onInput).toBeCalled()
    expect(onInput).toBeCalledWith('an nft title')
  })

  it('emits an event when the "only favourites" checkbox changes', async () => {
    const onClick = vitest.fn()
    const { user } = Render(<Filters onInput={noop} toggleFavourites={onClick} toggleAvailable={noop} />)
    const checkbox = screen.getByRole('checkbox', { name: 'filter favourites only' })

    await user.click(checkbox)

    expect(onClick).toBeCalled()
    expect(onClick).toBeCalledWith(true)
  })

  it('emits an event when the "only available" checkbox changes', async () => {
    const onClick = vitest.fn()
    const { user } = Render(<Filters onInput={noop} toggleFavourites={noop} toggleAvailable={onClick} />)
    const checkbox = screen.getByRole('checkbox', { name: 'filter availables only' })

    await user.click(checkbox)

    expect(onClick).toBeCalled()
    expect(onClick).toBeCalledWith(true)
  })

  it('emits an event when the label of the checkbox is clicked', async () => {
    const onClick = vitest.fn()
    const { user } = Render(<Filters onInput={noop} toggleFavourites={noop} toggleAvailable={onClick} />)
    const label = screen.getByLabelText('Availables')

    await user.click(label)

    expect(onClick).toBeCalled()
    expect(onClick).toBeCalledWith(true)
  })
})
