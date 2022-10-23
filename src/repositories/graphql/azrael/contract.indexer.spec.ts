import { createAzraelContractIndexer } from '.'

describe('Contract Indexer', () => {
  it('gets lending ', async () => {
    const { getLendingNfts } = createAzraelContractIndexer()
    const result = await getLendingNfts()
    expect(result).toHaveLength(100)
  })

  it.todo('uses pagination')
})
