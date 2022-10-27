import React, { useEffect, useState } from 'react'
// import { useNft } from '../../hooks/useNft.hook'
import { NFT } from '../../models/NFT'
import { Showcase } from '../../components/Showcase/Showcase'
import { Filters } from '../../components/Filters/Filters'
import { useStorage } from '../../hooks/useStorage.hook'
import { useNft } from '../../hooks/useNft.hook'

const ITEMS_PER_PAGE = 2

export const ShowcaseView: React.FC<{}> = () => {
  const [allNfts, setNfts] = useState<NFT[]>([])
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([])
  const { getNFTs } = useNft()
  const { addFav, deleteFav, isFav } = useStorage()
  const [page, setPage] = useState(0)

  const fetchMore = (): void => {
    setPage(page + 1)
  }

  const filterHandler = (term: string): void => {
    setFilteredNfts(allNfts.filter((item) => item.title.toLowerCase().includes(term.toLowerCase())))
  }

  const toggleFav = (id: string): void => {
    const index = allNfts.findIndex((i) => i.id === id)
    allNfts[index].fav = !allNfts[index].fav
    setNfts([...allNfts])
    allNfts[index].fav ? addFav(id) : deleteFav(id)
  }

  useEffect(() => {
    setFilteredNfts(allNfts)
  }, [allNfts])

  useEffect(() => {
    getNFTs(ITEMS_PER_PAGE, page).then((nfts) => {
      nfts.forEach((item) => {
        item.fav = isFav(item.id)
      })
      setNfts([...allNfts, ...nfts])
    })
  }, [page])

  return (
    <div>
      <h1>Showcase view</h1>
      <button onClick={fetchMore}> Fetch More</button>
      <Filters onInput={filterHandler} toggleAvailable={() => {}} toggleFavourites={() => {}} />
      <br />
      <Showcase nfts={filteredNfts} toggleFav={toggleFav} />
    </div>
  )
}
