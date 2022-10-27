import { act, screen } from '@testing-library/react'
import { Render } from '../../../tests/render'
import { ServiceContext } from '../../contexts/services.context'
import { ShowcaseView } from './ShowcaseView'

describe('ShowcaseView', () => {
  it('renders', () => {
    Render(<ShowcaseView />)
    expect(screen.getByText(/showcase view/i)).toBeInTheDocument()
  })

  it('fetches data on mount', async () => {
    const spy = vi.fn().mockImplementation(() => {
      return Promise.resolve([])
    })

    await act(() => {
      Render(
        <ServiceContext.Provider
          value={{
            nftService: { getNFTs: spy },
            storageService: {
              addFav: vi.fn(),
              deleteFav: vi.fn(),
              isFav: vi.fn()
            }
          }}
        >
          <ShowcaseView />
        </ServiceContext.Provider>
      )
    })

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('filters by title', async () => {
    const { user } = Render(
      <ServiceContext.Provider
        value={{
          nftService: {
            getNFTs: vi.fn().mockResolvedValue([
              {
                title: 'a title',
                id: '1'
              },
              {
                title: 'another title',
                id: '2'
              }
            ])
          },
          storageService: {
            addFav: vi.fn(),
            deleteFav: vi.fn(),
            isFav: vi.fn()
          }
        }}
      >
        <ShowcaseView />
      </ServiceContext.Provider>
    )
    const search = screen.getByRole('searchbox')

    await user.type(search, 'a ti')

    expect(screen.queryByText(/a title/i)).toBeInTheDocument()
    expect(screen.queryByText(/another title/i)).not.toBeInTheDocument()
  })
})
