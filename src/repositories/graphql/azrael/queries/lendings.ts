export const lendingsQuery = `
  query GetNFTLendings($perPage: Int, $page: Int) {
    allLendings(perPage: $perPage, page: $page) {
      id
      cursor
      nftAddress
      tokenId
    }
  }
`
