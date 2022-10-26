import React from 'react'

interface Props {
  onInput: (value: string) => void
  toggleFavourites: (checked: boolean) => void
  toggleAvailable: (checked: boolean) => void
}

export const Filters: React.FC<Props> = ({ onInput, toggleFavourites, toggleAvailable }) => {
  const inputHandler = (evt: React.KeyboardEvent<HTMLInputElement>): void => {
    const { currentTarget } = evt
    onInput(currentTarget.value)
  }

  const favouritesHandler = (evt: React.MouseEvent<HTMLInputElement>): void => {
    const { currentTarget } = evt
    toggleFavourites(currentTarget.checked)
  }

  const availablesHandler = (evt: React.MouseEvent<HTMLInputElement>): void => {
    const { currentTarget } = evt
    toggleAvailable(currentTarget.checked)
  }

  return (
    <React.Fragment>
      <input type="search" placeholder="Filter by title" onInput={inputHandler} aria-label="filter by title" />
      <label>
        Favourites
        <input type="checkbox" onClick={favouritesHandler} aria-label="filter favourites only" />
      </label>
      <label>
        Availables
        <input type="checkbox" onClick={availablesHandler} aria-label="filter availables only" />
      </label>
    </React.Fragment>
  )
}
