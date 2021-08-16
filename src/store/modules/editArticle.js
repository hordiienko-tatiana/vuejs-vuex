import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
}

export const mutationTypes = {
  getArticleStart: '[editArticle] Get Article Start',
  getArticleSuccess: '[editArticle] Get Article Success',
  getArticleFailure: '[editArticle] Get Article Failure',

  editArticleStart: '[editArticle] Edit Article Start',
  editArticleSuccess: '[editArticle] Edit Article Success',
  editArticleFailure: '[editArticle] Edit Article Failure',
}

export const actionTypes = {
  getArticle: '[editArticle] Get Article',
  editArticle: '[editArticle] Edit Article',
}

const mutations = {
  [mutationTypes.editArticleStart](state) {
    state.isSubmitting = true
  },
  [mutationTypes.editArticleSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.editArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.article = payload
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.editArticle](context, {slug, articleInput}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.editArticleStart)
      articleApi
        .editArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.editArticleSuccess, article)
          resolve(article)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.editArticleFailure,
            result.response.data.errors
          )
        })
    })
  },

  [actionTypes.getArticle](context, {slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart)
      console.log('[actionTypes.getArticle](context, {slug})', slug)
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.editArticleFailure)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
