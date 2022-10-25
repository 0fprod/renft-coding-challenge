import { ApolloQueryResult } from '@apollo/client'
import { map } from './mapper'

describe('Azrael Contract Indexer mapper', () => {
  it('maps many nft lending to NFT', () => {
    const lendingNft = {
      id: '103',
      cursor: 103,
      nftAddress: '0xc3f733ca98e0dad0386979eb96fb1722a1a05e69',
      tokenId: '20581',
      lenderAddress: '0x48ddea6de8c0393a26e2590a3b724fc47abdcf22',
      maxRentDuration: '15',
      dailyRentPrice: '0x0000005a',
      nftPrice: '0x000005dc',
      paymentToken: '1',
      lentAmount: '1',
      isERC721: true,
      lentAt: '1627407065',
      collateralClaimed: true
    }

    const apolloQueryResult = givenAnApolloQueryResult({
      data: { allLendings: [lendingNft] }
    })
    const nft = map(apolloQueryResult)[0]

    expect(lendingNft.nftAddress).toEqual(nft.address)
  })
})

const givenAnApolloQueryResult = (aqr: Partial<ApolloQueryResult<any>> = {}): ApolloQueryResult<any> => {
  return {
    networkStatus: 0,
    loading: false,
    data: aqr.data
  }
}
