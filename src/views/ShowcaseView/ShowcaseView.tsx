import React, { useEffect, useState } from 'react'
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
  const { addFav, deleteFav } = useStorage()
  const [skip, setSkip] = useState(0)

  const fetchMore = (): void => {
    setSkip(allNfts.length)
  }

  const toggleFav = (id: string): void => {
    const index = allNfts.findIndex((i) => i.id === id)
    allNfts[index].fav = !allNfts[index].fav
    setNfts([...allNfts])
    allNfts[index].fav ? addFav(id) : deleteFav(id)
  }

  // Filters
  const filterByTitle = (term: string): void => {
    setFilteredNfts(allNfts.filter((item) => item.title.toLowerCase().includes(term.toLowerCase())))
  }
  const filterOnlyFavourites = (): void => {
    setFilteredNfts(allNfts.filter((item) => item.fav))
  }

  // Update filtered data
  useEffect(() => {
    setFilteredNfts(allNfts)
  }, [allNfts])

  useEffect(() => {
    getNFTs(ITEMS_PER_PAGE, skip).then((nfts) => {
      setNfts([...allNfts, ...nfts])
    })
  }, [skip])

  return (
    <div>
      <h1>Showcase view</h1>
      <button onClick={fetchMore}> Fetch More</button>
      <Filters onInput={filterByTitle} toggleAvailable={() => {}} toggleFavourites={filterOnlyFavourites} />
      <br />
      <Showcase nfts={filteredNfts} toggleFav={toggleFav} />
    </div>
  )
}
