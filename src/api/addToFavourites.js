import axios from '@/api/axios'

const getUrl = (slug) => `/articles/${slug}/favorite`

const addToFavourites = (slug) => {
  const url = getUrl(slug)
  return axios.post(url).then((response) => response.data.article)
}

const removeFromFavourites = (slug) => {
  const url = getUrl(slug)
  return axios.post(url).then((response) => response.data.article)
}

export default {
  addToFavourites,
  removeFromFavourites,
}
