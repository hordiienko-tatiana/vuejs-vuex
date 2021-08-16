import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getUserProfileStart: '[userProfile] Get User Profile Start',
  getUserProfileSuccess: '[userProfile] Get User Profile Success',
  getUserProfileFailure: '[userProfile] Get User Profile Failure',
}

export const actionTypes = {
  getUserProfile: '[userProfile] Get User Profile',
}

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getUserProfileFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  },
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then((userProfile) => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch((error) => {
          context.commit(mutationTypes.getUserProfileFailure, error.message)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
