import { gql } from '@apollo/client'

export const paginatedLendingQuery = gql`
  query PaginatedLendings($perPage: Int, $page: Int) {
    allLendings(perPage: $perPage, page: $page) {
      id
      cursor
      nftAddress
      tokenId
    }
  }
`
