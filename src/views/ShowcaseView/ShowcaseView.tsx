import { useCallback, useEffect, useState } from 'react'
import { useNft } from '../../hooks/useNft.hook'
import { NFT } from '../../models/NFT'
import { Showcase } from '../../components/Showcase/Showcase'

export const ShowcaseView: React.FC<{}> = () => {
  const [nfts, setNfts] = useState<NFT[]>([]) // all state this should increase on loadMore
  const { getNFTs } = useNft()
  const [page, setPage] = useState(0)

  const fetch = useCallback(
    (page: number) => {
      getNFTs(2, page).then((incomming) => {
        setNfts([...nfts, ...incomming])
      })
    },
    [page]
  )

  useEffect(() => {
    fetch(page)
  }, [fetch])

  const fetchNextPage = (): void => {
    setPage(page + 1)
  }

  return (
    <div>
      <h1>Showcase view</h1>
      <button onClick={fetchNextPage}> Fetch More</button>
      <br />
      <Showcase nfts={nfts} />
    </div>
  )
}
