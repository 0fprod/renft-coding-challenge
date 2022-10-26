import { useCallback, useEffect, useState } from 'react'
import { useNft } from '../../hooks/useNft.hook'
import { NFT } from '../../models/NFT'
import { Showcase } from '../../components/Showcase/Showcase'

export const ShowcaseView: React.FC<{}> = () => {
  const [nfts, setNfts] = useState<NFT[]>([]) // all state this should increase on loadMore
  const { getNFTs } = useNft()

  const fetch = useCallback(() => {
    getNFTs().then(setNfts)
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <div>
      <h1>Showcase view</h1>

      <br />
      <Showcase nfts={nfts} />
    </div>
  )
}
