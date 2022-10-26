import React from 'react'
import { ServiceContext } from '../contexts/services.context'
import { StorageService } from '../services/storage.service'

export const useStorage = (): StorageService => {
  const { storageService } = React.useContext(ServiceContext)

  return {
    ...storageService
  }
}
