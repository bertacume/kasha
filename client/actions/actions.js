export const types = {
  FETCH_ALBUMS: 'FETCH_ALBUMS',
  UPDATE_CURRENT_ALBUM: 'UPDATE_CURRENT_ALBUM',
  RENDER_ALBUM: 'RENDER_ALBUM'
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