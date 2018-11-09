export const types = {
  FETCH_ALBUMS: 'FETCH_ALBUMS',
  UPDATE_CURRENT_ALBUM: 'UPDATE_CURRENT_ALBUM',
  UPDATE_DEVELOPING_ALBUM: 'UPDATE_DEVELOPING_ALBUM',
  SET_DEVELOPING_AVIABLE: 'DEVELOPING_AVIABLE',
  RENDER_ALBUM: 'RENDER_ALBUM',
  SET_PIC_INDEX: 'SET_PIC_INDEX',
  INCREMENT_PIC_INDEX: 'INCREMENT_PIC_INDEX',
  SET_EXPIRATION_DATE: 'SET_EXPIRATION_DATE',
}

export const fetchAlbums = (albums) => ({
  type: types.FETCH_ALBUMS,
  albums
})

export const updateCurrentAlbum = (currentAlbum) => ({
  type: types.UPDATE_CURRENT_ALBUM,
  currentAlbum
})

export const updateDevelopingAlbum = (developingAlbum) => ({
  type: types.UPDATE_DEVELOPING_ALBUM,
  developingAlbum
})

export const setDevelopingAviable = (developingAviable) => ({
  type: types.SET_DEVELOPING_AVIABLE,
  developingAviable
})

export const renderAlbum = (renderAlbum) => ({
  type: types.RENDER_ALBUM,
  renderAlbum
})

export const setPicIndex = (picIndex) => ({
  type: types.SET_PIC_INDEX,
  picIndex
})

export const incrementPicIndex = () => ({
  type: types.INCREMENT_PIC_INDEX
})

export const setExpirationDate = (expirationDate) => ({
  type: types.SET_EXPIRATION_DATE,
  expirationDate
})