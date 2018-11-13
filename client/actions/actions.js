import { types } from '../actions/actionTypes';


export const fontsLoaded = (fontsLoaded) => ({
  type: types.FONTS_LOADED,
  fontsLoaded
}
)
export const fetchAlbums = (albums) => ({
  type: types.FETCH_ALBUMS,
  albums
}
)
export const fetchThumbnailPics = (thumbnailPics) => ({
  type: types.FETCH_THUMBNAIL_PICS,
  thumbnailPics
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