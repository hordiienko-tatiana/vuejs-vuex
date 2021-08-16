import popularTagsApi from '@/api/popularTags'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getPopularTagsStart: '[popularTags] Get Popular Tags Start',
  getPopularTagsSuccess: '[popularTags] Get Popular Tags Success',
  getPopularTagsFailure: '[popularTags] Get Popular Tags Failure',
}

export const actionTypes = {
  getPopularTags: '[popularTags] Get Popular Tags',
}

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true
    // state.data = null
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getPopularTagsFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  },
}

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getPopularTagsStart)
      popularTagsApi
        .getPopularTags()
        .then((tags) => {
          context.commit(mutationTypes.getPopularTagsSuccess, tags)
          resolve(tags)
        })
        .catch((error) => {
          context.commit(mutationTypes.getPopularTagsFailure, error.message)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
