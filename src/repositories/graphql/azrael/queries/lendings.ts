import { gql } from '@apollo/client'

export const lendingsQuery = gql`
  query GetNFTLendings {
    allLendings {
      id
      cursor
      nftAddress
      tokenId
    }
  }
`
