import { screen } from '@testing-library/react'
import { givenAnNft } from '../../../tests/given'
import { Render } from '../../../tests/render'
import { ServiceContext } from '../../contexts/services.context'
import { NftService } from '../../services/nft.service'
import { StorageService } from '../../services/storage.service'
import { ShowcaseView } from './ShowcaseView'

describe('ShowcaseView', () => {
  it('renders', () => {
    Render(wrapShowcaseViewWithContext({}))
    expect(screen.getByText(/showcase view/i)).toBeInTheDocument()
  })

  it('fetches data on mount', async () => {
    const spy = vi.fn().mockImplementation(() => {
      return Promise.resolve([])
    })

    Render(
      wrapShowcaseViewWithContext({
        getNFTs: spy
      })
    )

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('filters by title', async () => {
    const { user } = Render(
      wrapShowcaseViewWithContext({
        getNFTs: vi.fn().mockResolvedValue([
          givenAnNft({
            title: 'a title',
            id: '1'
          }),
          givenAnNft({
            title: 'another title',
            id: '2'
          })
        ])
      })
    )
    const search = screen.getByRole('searchbox')

    await user.type(search, 'a ti')

    expect(screen.getByText(/a title/i)).toBeInTheDocument()
    expect(screen.queryByText(/another title/i)).not.toBeInTheDocument()
  })

  it.skip('filters by fav', async () => {
    const mockedNfts = [
      givenAnNft({
        title: 'a title',
        id: '1',
        fav: true
      }),
      givenAnNft({
        title: 'another title',
        id: '2',
        fav: false
      })
    ]
    const { user, debug } = Render(
      wrapShowcaseViewWithContext({
        getNFTs: vi.fn().mockResolvedValue(mockedNfts),
        isFav(id) {
          return mockedNfts.find((i) => i.id === id)?.fav ?? false
        }
      })
    )

    const checkbox = screen.getByRole('checkbox', { name: 'filter availables only' })
    await user.click(checkbox)
    debug()

    expect(screen.getByText(/a title/i)).toBeInTheDocument()
    expect(screen.queryByText(/another title/i)).not.toBeInTheDocument()
  })
})

type Services = NftService & StorageService
function wrapShowcaseViewWithContext(services: Partial<Services>): any {
  return (
    <ServiceContext.Provider
      value={{
        nftService: { getNFTs: services.getNFTs ?? vi.fn().mockResolvedValue([]) },
        storageService: {
          addFav: services.addFav ?? vi.fn,
          deleteFav: services.deleteFav ?? vi.fn,
          isFav: services.isFav ?? vi.fn()
        }
      }}
    >
      <ShowcaseView />
    </ServiceContext.Provider>
  )
}
