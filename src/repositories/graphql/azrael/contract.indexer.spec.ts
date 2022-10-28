import { createAzraelContractIndexer } from '.'
import { FirstPaginatedLendingsMock, LendingsMock, SecondPaginatedLendingsMock } from './mocks/mock'

describe('Contract Indexer', () => {
  it('gets lending ', async () => {
    const { getLendingNfts, clientExposedForTestingOnly } = createAzraelContractIndexer()
    // @ts-expect-error
    vi.spyOn(clientExposedForTestingOnly, 'query').mockImplementation(() => ({
      toPromise: vi.fn().mockResolvedValue(LendingsMock) as any
    }))
    const result = await getLendingNfts(2)
    expect(result).toHaveLength(2)
  })

  it('uses pagination', async () => {
    const { getLendingNfts, clientExposedForTestingOnly } = createAzraelContractIndexer()
    // @ts-expect-error
    vi.spyOn(clientExposedForTestingOnly, 'query').mockImplementation(() => ({
      toPromise: vi.fn().mockResolvedValue(FirstPaginatedLendingsMock) as any
    }))
    const [first] = await getLendingNfts(1)
    // @ts-expect-error
    vi.spyOn(clientExposedForTestingOnly, 'query').mockImplementation(() => ({
      toPromise: vi.fn().mockResolvedValue(SecondPaginatedLendingsMock) as any
    }))
    const [second] = await getLendingNfts(1, 1)

    expect(first.address).not.toEqual(second.address)
    expect(first.id).not.toEqual(second.id)
  })
})
