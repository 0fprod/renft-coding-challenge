import { nftMetadataMock } from '../mocks/mock'
import { map } from './mapper'

describe('NFT Endpoint mapper', () => {
  it('maps a nft ', () => {
    const nft = map(nftMetadataMock)

    expect(nft.address).toEqual(nftMetadataMock.contract.address)
    expect(nft.name).toEqual(nftMetadataMock.contract.name)
    expect(nft.title).toEqual(nftMetadataMock.title)
    expect(nft.description).toEqual(nftMetadataMock.description)
    expect(nft.imageUrl).toEqual(nftMetadataMock.media[0].gateway)
  })
})
