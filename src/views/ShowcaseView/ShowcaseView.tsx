import React, { useEffect, useState } from 'react'
import { NFT } from '../../models/NFT'
import { Showcase } from '../../components/Showcase/Showcase'
import { Filters } from '../../components/Filters/Filters'
import { useStorage } from '../../hooks/useStorage.hook'
import { useNft } from '../../hooks/useNft.hook'

const ITEMS_PER_PAGE = 1

export const ShowcaseView: React.FC<{}> = () => {
  const [allNfts, setNfts] = useState<NFT[]>([])
  const [filteredNfts, setFilteredNfts] = useState<NFT[]>([])
  const { getNFTs, getAvailableNFTs } = useNft()
  const { addFav, deleteFav } = useStorage()
  const [skip, setSkip] = useState(0)

  const fetchMore = (): void => {
    setSkip(allNfts.length === 0 ? ITEMS_PER_PAGE : allNfts.length)
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
  const filterOnlyFavourites = (viewOnlyFavs: boolean): void => {
    if (viewOnlyFavs) {
      setFilteredNfts(allNfts.filter((item) => item.fav))
    } else {
      setFilteredNfts(allNfts)
    }
  }
  const fetchAvailableOnly = (viewOnlyAvailables: boolean): void => {
    if (viewOnlyAvailables) {
      getAvailableNFTs(allNfts.length).then(setNfts)
    } else {
      getNFTs(allNfts.length).then(setNfts)
    }
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
      <h5>
        <a href="https://github.com/franjpr/renft-coding-challenge" target="_blank" rel="noreferrer">
          Github repo
        </a>
      </h5>
      <h1>Showcase view</h1>
      <button onClick={fetchMore}> Fetch More</button>
      <Filters onInput={filterByTitle} toggleAvailable={fetchAvailableOnly} toggleFavourites={filterOnlyFavourites} />
      <br />
      <Showcase nfts={filteredNfts} toggleFav={toggleFav} />
    </div>
  )
}
