import { map } from './mapper'
import { azraelCollection } from '../../../../../tests/unit/fixtures/azrael.collection'

describe('Azrael Contract Indexer mapper', () => {
  it('maps many nft lending to NFT', () => {
    const { lendings } = azraelCollection
    const [first] = lendings

    const nft = map(azraelCollection)[0]

    expect(first.nftAddress).toEqual(nft.address)
  })
})
