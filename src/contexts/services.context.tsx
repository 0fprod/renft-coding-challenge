import React from 'react'
import { createNftEndpoint } from '../repositories/api'
import { createAzraelContractIndexer } from '../repositories/graphql/azrael'
import { createNftService, NftService } from '../services/nft.service'

export interface ContextServiceValues {
  nftService?: NftService
}

export const ServiceContext: React.Context<ContextServiceValues> = React.createContext({})

export const ServicesProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const contractIndexerRepository = createAzraelContractIndexer()
  const nftMetadataRepository = createNftEndpoint()

  const nftService = createNftService(contractIndexerRepository, nftMetadataRepository)

  return <ServiceContext.Provider value={{ nftService }}>{children}</ServiceContext.Provider>
}
