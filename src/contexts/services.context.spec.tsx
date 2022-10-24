import React from 'react'
import { render } from '@testing-library/react'
import { ServicesProvider, ServiceContext } from './services.context'

describe('Service context', () => {
  it('should the services the nft service', () => {
    const ContextConsumer: React.FC<{ availableServices: any }> = ({ availableServices }) => {
      const context = React.useContext(ServiceContext)
      availableServices.nftService = context.nftService
      return <React.Fragment />
    }
    const emptyServices: any = {}

    render(
      <ServicesProvider>
        <ContextConsumer availableServices={emptyServices} />
      </ServicesProvider>
    )

    expect(emptyServices.nftService).toBeTruthy()
  })
})
