import { alchemyNftMetadataMock } from '../mocks/mock'
import { map } from './mapper'

describe('NFT Endpoint mapper', () => {
  it('maps a nft from alchemy ', () => {
    const nft = map(alchemyNftMetadataMock)

    expect(nft.address).toEqual(alchemyNftMetadataMock.contract.address)
    expect(nft.name).toEqual(alchemyNftMetadataMock.contract.name)
    expect(nft.title).toEqual(alchemyNftMetadataMock.title)
    expect(nft.description).toEqual(alchemyNftMetadataMock.description)
    expect(nft.imageUrl).toEqual(alchemyNftMetadataMock.media[0].gateway)
  })
})
