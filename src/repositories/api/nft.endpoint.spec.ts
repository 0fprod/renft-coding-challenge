import { nftMetadataMock } from './mocks/mock'
import { createNftEndpoint } from './nft.endpoint'

describe('NftEndpoint', () => {
  const { getNftMetadata, clientExposedForTestingOnly } = createNftEndpoint()

  it('fetches data', async () => {
    vi.spyOn(clientExposedForTestingOnly.nft, 'getNftMetadata').mockResolvedValue(nftMetadataMock)
    const result = await getNftMetadata('aValidAddress', '1')

    expect(result.address).toEqual('aValidAddress')
    expect(result.name).toEqual('aName')
    expect(result.description).toEqual('aDescription')
    expect(result.title).toEqual('aTitle')
    expect(result.imageUrl).toEqual('anImageUrl')
  })
})
