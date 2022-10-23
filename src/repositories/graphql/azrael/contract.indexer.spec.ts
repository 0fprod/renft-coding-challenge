import { createAzraelContractIndexer } from '.'
import { azraelCollection } from '../../../../tests/unit/fixtures/azrael.collection'

vitest.mock('graphql-request', () => ({
  gql: () => vi.fn(),
  GraphQLClient: vi.fn().mockImplementation(() => ({
    request: async () => await Promise.resolve({ ...azraelCollection })
  }))
}))

describe('Contract Indexer', () => {
  it('gets lending ', async () => {
    const { getLendingNfts } = createAzraelContractIndexer()
    const result = await getLendingNfts()
    expect(result).toHaveLength(10)
  })

  it.todo('uses pagination')
})
