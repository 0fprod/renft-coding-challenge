import { createAzraelContractIndexer } from '.'

describe('Contract Indexer', () => {
  it('gets lending ', async () => {
    const { getLendingNfts } = createAzraelContractIndexer()
    const result = await getLendingNfts(5)
    expect(result).toHaveLength(5)
  })

  it('uses pagination', async () => {
    const { getLendingNfts } = createAzraelContractIndexer()
    const [first] = await getLendingNfts(1)
    const [second] = await getLendingNfts(1, 1)

    expect(first.address).not.toEqual(second.address)
    expect(first.id).not.toEqual(second.id)
  })
})
