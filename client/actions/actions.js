export const types = {
  FETCH_PICTURES: 'FETCH_PICTURES'
}

export const fetchPictures = (pictures) => ({
  type: types.FETCH_PICTURES,
  pictures
})