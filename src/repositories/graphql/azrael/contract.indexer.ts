import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { fetch } from 'cross-fetch'
import { Nft } from '../../../models/NFT'
import { map } from './mapper/mapper'
import { lendingsQuery, paginatedLendingQuery } from './queries'

export interface AzraelContractIndexer {
  getLendingNfts: () => Promise<Nft[]>
  getPaginatedLendingNfts: (itemsPerPage: number) => Promise<Nft[]>
}

export const createAzraelContractIndexer = (): AzraelContractIndexer => {
  const uri: string = import.meta.env.VITE_AZRAEL_URL
  const gqlClient = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allLendings: {
              keyArgs: false,
              merge(existing = [], incoming) {
                console.log('Mering...')
                return [...existing, ...incoming]
              }
            }
          }
        }
      }
    }),
    link: new HttpLink({ uri, fetch })
  })

  const subscription = gqlClient.watchQuery({
    query: paginatedLendingQuery,
    variables: { perPage: 2, page: 1 }
  })

  const getLendingNfts = async (): Promise<Nft[]> => {
    try {
      return await gqlClient.query({ query: lendingsQuery }).then(map)
    } catch (e) {
      console.error('Error while fetching -->', e)
      return []
    }
  }

  const getPaginatedLendingNfts = async (pageNumber: number): Promise<Nft[]> => {
    try {
      // const subscription = gqlClient.watchQuery({
      //   query: paginatedLendingQuery,
      //   variables: { perPage: 2, page: pageNumber }
      // })

      subscription.subscribe({
        next(value) {
          console.log('NxValue', value.data.allLendings.length)
        }
      })

      return await subscription
        .fetchMore({
          variables: { perPage: 2, page: pageNumber }
        })
        .then(map)

      // console.log('gg', await subscription.result())
      // return subscription.getLastResult()?.data
      // return await subscription.result().then(map)
      // // console.log('Calling fetch more agaaain', await result())
      // return await subscription.fetchMore({}).then(map)
      // console.log('w', await getCurrentResult().data)

      // return await gqlClient
      //   .query({
      //     query: paginatedLendingQuery,
      //     variables: { perPage: 5, page: pageNumber }
      //     // fetchPolicy: 'cache-only'
      //   })
      //   .then(map)
    } catch (e) {
      console.error('Error while fetching -->', e)
      return []
    }
  }

  return {
    getLendingNfts,
    getPaginatedLendingNfts
  }
}
