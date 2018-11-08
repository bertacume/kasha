export const types = {
  FETCH_PICTURES: 'FETCH_PICTURES',
  FETCH_ALBUMS: 'FETCH_ALBUMS',
  UPDATE_CURRENT_ALBUM: 'UPDATE_CURRENT_ALBUM',
}

export const fetchPictures = (pictures) => ({
  type: types.FETCH_PICTURES,
  pictures
})

export const fetchAlbums = (albums) => ({
  type: types.FETCH_ALBUMS,
  albums
})

export const updateCurrentAlbum = (current_album) => ({
  type: types.UPDATE_CURRENT_ALBUM,
  current_album
})