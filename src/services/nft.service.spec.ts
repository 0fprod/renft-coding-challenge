import { createNftService } from './nft.service'
import { createNftEndpoint } from '../repositories/api/nft.endpoint'
import { createAzraelContractIndexer } from '../repositories/graphql/azrael/contract.indexer'
describe('NFT Service', () => {
  it('merges nft data from repositories', async () => {
    // Arrange
    const azraelRepository = createAzraelContractIndexer()
    const alchemyRepository = createNftEndpoint()
    vi.spyOn(azraelRepository, 'getLendingNfts').mockResolvedValue([
      {
        address: '0xAddress',
        tokenId: '1',
        id: 'anId'
      },
      {
        address: '0xAddress',
        tokenId: '2',
        id: 'anotherId'
      }
    ])
    const alchemySpy = vi.spyOn(alchemyRepository, 'getNftMetadata').mockResolvedValue({
      address: '0xAddress',
      name: 'aName',
      description: 'aDescription',
      imageUrl: 'anImageUrl',
      title: 'aTitle',
      attributes: [],
      details: []
    })
    const service = createNftService(azraelRepository, alchemyRepository)
    // Act
    const [nft] = await service.getNFTs(2)
    // Assert
    expect(alchemySpy).toHaveBeenCalledTimes(2)
    expect(nft.address).toEqual('0xAddress')
    expect(nft.name).toEqual('aName')
    expect(nft.title).toBe('aTitle')
    expect(nft.imageUrl).toEqual('anImageUrl')
    expect(nft.tokenId).toEqual('1')
    expect(nft.id).toEqual('anId')
  })
})
