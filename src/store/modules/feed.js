import feedApi from '@/api/feed'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getFeedStart: '[feed] Get Feed Start',
  getFeedSuccess: '[feed] Get Feed Success',
  getFeedFailure: '[feed] Get Feed Failure',
}

export const actionTypes = {
  getFeed: '[feed] Get Feed',
}
const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getFeedFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  },
}

const actions = {
  [actionTypes.getFeed](context, {apiUrl}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getFeedStart)
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          const data = response.data
          context.commit(mutationTypes.getFeedSuccess, data)
          resolve(data)
        })
        .catch((error) => {
          context.commit(mutationTypes.getFeedFailure, error.message)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
