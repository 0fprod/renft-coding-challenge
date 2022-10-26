export interface StorageService {
  addFav: (tokenId: string) => void
  deleteFav: (tokenId: string) => void
  isFav: (tokenId: string) => boolean
}

export const createStorageService = (): StorageService => {
  const addFav = (tokenId: string): void => {
    window.localStorage.setItem(tokenId, 'true')
  }
  const deleteFav = (tokenId: string): void => {
    window.localStorage.setItem(tokenId, 'false')
  }
  const isFav = (tokenId: string): boolean => {
    const isFav = window.localStorage.getItem(tokenId)
    if (isFav === null) return false

    return JSON.parse(isFav)
  }

  return {
    addFav,
    deleteFav,
    isFav
  }
}
