import { gql } from '@apollo/client'

export const lendingsQuery = gql`
  query GetNFTLendings($perPage: Int, $page: Int) {
    allLendings(perPage: $perPage, page: $page) {
      id
      cursor
      nftAddress
      tokenId
    }
  }
`
