import React from 'react'
import { createNftEndpoint } from '../repositories/api'
import { createAzraelContractIndexer } from '../repositories/graphql/azrael'
import { createNftService, NftService } from '../services/nft.service'
import { createStorageService, StorageService } from '../services/storage.service'

export interface ContextServiceValues {
  nftService: NftService
  storageService: StorageService
}

export const ServiceContext: React.Context<ContextServiceValues> = React.createContext({
  nftService: createNftService(createAzraelContractIndexer(), createNftEndpoint()),
  storageService: createStorageService()
})

export const ServicesProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const contractIndexerRepository = createAzraelContractIndexer()
  const nftMetadataRepository = createNftEndpoint()

  const nftService = createNftService(contractIndexerRepository, nftMetadataRepository)
  const storageService = createStorageService()

  return <ServiceContext.Provider value={{ nftService, storageService }}>{children}</ServiceContext.Provider>
}
