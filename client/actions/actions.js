export const types = {
  FETCH_ALBUMS: 'FETCH_ALBUMS',
  UPDATE_CURRENT_ALBUM: 'UPDATE_CURRENT_ALBUM',
  RENDER_ALBUM: 'RENDER_ALBUM',
  SET_PIC_INDEX: 'SET_PIC_INDEX',
  INCREMENT_PIC_INDEX: 'INCREMENT_PIC_INDEX'
}

export const fetchAlbums = (albums) => ({
  type: types.FETCH_ALBUMS,
  albums
})

export const updateCurrentAlbum = (current_album) => ({
  type: types.UPDATE_CURRENT_ALBUM,
  current_album
})

export const renderAlbum = (render_album) => ({
  type: types.RENDER_ALBUM,
  render_album
})

export const setPicIndex = (picIndex) => ({
  type: types.SET_PIC_INDEX,
  picIndex
})

export const incrementPicIndex = () => ({
  type: types.INCREMENT_PIC_INDEX
})