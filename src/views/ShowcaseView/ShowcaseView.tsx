import { useCallback, useEffect, useState } from 'react'
import { useNft } from '../../hooks/useNft.hook'
import { NFT } from '../../models/NFT'
import { Showcase } from '../../components/Showcase/Showcase'
import { Filters } from '../../components/Filters/Filters'
const ITEMS_PER_PAGE = 2

export const ShowcaseView: React.FC<{}> = () => {
  const [allNfts, setNfts] = useState<NFT[]>([])
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([])
  const { getNFTs } = useNft()
  const [page, setPage] = useState(0)

  const fetch = useCallback(() => {
    getNFTs(ITEMS_PER_PAGE, page).then((nfts) => {
      setNfts([...allNfts, ...nfts])
      setFilteredNfts([...allNfts, ...nfts])
    })
  }, [page])

  const fetchMore = (): void => {
    setPage(page + 1)
  }

  const filterHandler = (term: string): void => {
    setFilteredNfts(allNfts.filter((item) => item.title.toLowerCase().includes(term.toLowerCase())))
  }

  useEffect(() => {
    fetch()
  }, [page])

  return (
    <div>
      <h1>Showcase view</h1>
      <button onClick={fetchMore}> Fetch More</button>
      <Filters onInput={filterHandler} toggleAvailable={() => {}} toggleFavourites={() => {}} />
      <br />
      <Showcase nfts={filteredNfts} />
    </div>
  )
}
