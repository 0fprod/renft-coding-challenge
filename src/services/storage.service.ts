export interface StorageService {
  addFav: (id: string) => void
  deleteFav: (id: string) => void
  isFav: (id: string) => boolean
}

export const createStorageService = (): StorageService => {
  const addFav = (id: string): void => {
    window.localStorage.setItem(id, 'true')
  }
  const deleteFav = (id: string): void => {
    window.localStorage.setItem(id, 'false')
  }
  const isFav = (id: string): boolean => {
    const isFav = window.localStorage.getItem(id)
    if (isFav === null) return false

    return JSON.parse(isFav)
  }

  return {
    addFav,
    deleteFav,
    isFav
  }
}
