import { createAzraelContractIndexer } from '.'

describe('Contract Indexer', () => {
  it('gets lending ', async () => {
    const { getLendingNfts } = createAzraelContractIndexer()
    const result = await getLendingNfts()
    expect(result).toHaveLength(100)
  })

  it.only('uses pagination', async () => {
    const { getPaginatedLendingNfts } = createAzraelContractIndexer()
    const result = await getPaginatedLendingNfts(1)
    console.log('🚀 ~ result', result[0].address)
    expect(result).toHaveLength(2)
    const a = await getPaginatedLendingNfts(2)
    console.log('🚀 ~ a', a[0].address)
    expect(a).toHaveLength(2)
    // result = [...result, getPaginatedLendingNfts(5)]
    // expect(result).toHaveLength(10)
  })
})
