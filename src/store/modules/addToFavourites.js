import addToFavouritesApi from '@/api/addToFavourites'

export const mutationTypes = {
  addToFavouritesStart: '[addToFavourites] Add To Favourites Start',
  addToFavouritesSuccess: '[addToFavourites] Add To Favourites Success',
  addToFavouritesFailure: '[addToFavourites] Add To Favourites Failure',
}

export const actionTypes = {
  addToFavourites: '[addToFavourites] Add To Favourites',
}

const mutations = {
  [mutationTypes.addToFavouritesStart]() {},
  [mutationTypes.addToFavouritesSuccess]() {},
  [mutationTypes.addToFavouritesFailure]() {},
}

const actions = {
  [actionTypes.addToFavourites](context, {slug, isFavourited}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.addToFavouritesStart)
      const responsePromise = isFavourited
        ? addToFavouritesApi.removeFromFavourites(slug)
        : addToFavouritesApi.addToFavourites(slug)
      responsePromise
        .then((article) => {
          context.commit(mutationTypes.addToFavouritesSuccess, article)
          resolve(article)
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavouritesFailure)
        })
    })
  },
}

export default {
  mutations,
  actions,
}
