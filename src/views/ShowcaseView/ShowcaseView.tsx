import { useCallback, useEffect, useState } from 'react'
import { useNft } from '../../hooks/useNft.hook'
import { NFT } from '../../models/NFT'
import { Showcase } from '../../components/Showcase/Showcase'
import { NftData } from '../../models/NFTData'

export const ShowcaseView: React.FC<{}> = () => {
  const [nfts, setNfts] = useState<NftData[]>([]) // all state this should increase on loadMore
  const { getLendingNfts } = useNft()

  const fetch = useCallback(() => {
    getLendingNfts().then((r) => {
      setNfts(r)
    })
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <div>
      <h1>Showcase view</h1>

      <br />
      <Showcase nfts={nfts as NFT[]} />
    </div>
  )
}
