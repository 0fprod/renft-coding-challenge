import { act } from '@testing-library/react'
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
      getLendingNfts: fetchMock,
      getNftMetadata: vi.fn().mockResolvedValue({})
    }))
    await act(() => {
      Render(<ShowcaseView />)
    })

    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
