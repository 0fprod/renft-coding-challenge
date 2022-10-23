import { gql } from 'graphql-request'

export const lendingsQuery = gql`
  query GetNFTLendings($itemsPerPage: Int) {
    lendings(first: $itemsPerPage, offset: $itemsPerPage) {
      id
      cursor
      nftAddress
      tokenId
    }
  }
`
