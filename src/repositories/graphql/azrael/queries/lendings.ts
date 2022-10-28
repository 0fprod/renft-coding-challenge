export const lendingsQuery = `
  query GetLendingNfts ($first: Int, $skip: Int) {
    lendings (first: $first, skip: $skip) {
      id
      tokenId
      nftAddress
      dailyRentPrice
      nftPrice
      renting {
        rentedAt
      }
      paymentToken
    }
  }
`
