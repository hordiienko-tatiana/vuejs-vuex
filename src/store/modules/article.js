import articleApi from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getArticleStart: '[article] Get Article Start',
  getArticleSuccess: '[article] Get Article Success',
  getArticleFailure: '[article] Get Article Failure',

  deleteArticleStart: '[article] Delete Article Start',
  deleteArticleSuccess: '[article] Delete Article Success',
  deleteArticleFailure: '[article] Delete Article Failure',
}

export const actionTypes = {
  getArticle: '[article] Get Article',
  deleteArticle: '[article] delete Article',
}

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  },

  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure](state, payload) {
    state.error = payload
  },
}

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart, slug)
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch((error) => {
          context.commit(mutationTypes.getArticleFailure, error.message)
        })
    })
  },
  [actionTypes.deleteArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.deleteArticleStart, slug)
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleSuccess)
          resolve()
        })
        .catch((error) => {
          context.commit(mutationTypes.deleteArticleFailure, error.message)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
