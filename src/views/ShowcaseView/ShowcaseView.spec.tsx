import { act, screen } from '@testing-library/react'
import { Render } from '../../../tests/render'
import * as hook from '../../hooks/useNft.hook'
import { ShowcaseView } from './ShowcaseView'

describe('ShowcaseView', () => {
  it('renders', () => {
    Render(<ShowcaseView />)
  })

  it('fetches data on mount', async () => {
    const fetchMock = vi.fn().mockResolvedValue([])
    vi.spyOn(hook, 'useNft').mockImplementationOnce(() => ({
      getNFTs: fetchMock
    }))
    await act(() => {
      Render(<ShowcaseView />)
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('filters by title', async () => {
    vi.spyOn(hook, 'useNft').mockImplementationOnce(() => ({
      getNFTs: vi.fn().mockResolvedValue([
        {
          title: 'a title',
          tokenId: '1'
        },
        {
          title: 'another title',
          tokenId: '2'
        }
      ])
    }))
    const { user } = Render(<ShowcaseView />)
    const search = screen.getByRole('searchbox')

    await user.type(search, 'a ti')

    expect(screen.queryByText(/a title/i)).toBeInTheDocument()
    expect(screen.queryByText(/another title/i)).not.toBeInTheDocument()
  })
})
