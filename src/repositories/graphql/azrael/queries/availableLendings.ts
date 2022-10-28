export const availableLendings = `
  query GetAvailableLendings ($first: Int) {
    lendings(first: $first, where : { renting : null } ) {
      id
      tokenId
      nftAddress
      nftPrice
      dailyRentPrice
      paymentToken
      renting {
        rentedAt
      }
    }
  }
`
