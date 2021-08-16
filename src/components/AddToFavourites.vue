<template>
  <button
    @click="handleLike"
    class="btn btn-sm"
    :class="{
      'btn-primary': isFavouritedOptimistic,
      'btn-primary': !isFavouritedOptimistic,
    }"
  >
    <i class="ion-heart"></i>
    <span>&nbsp; {{ favouritesCountOptimistic }}</span>
  </button>
</template>

<script>
  import {actionTypes} from '@/store/modules/addToFavourites'

  export default {
    name: 'McvAddToFavourites',
    props: {
      isFavourited: {
        type: Boolean,
        required: true,
      },
      articleSlug: {
        type: String,
        required: true,
      },
      favouritesCount: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        isFavouritedOptimistic: this.isFavourited,
        favouritesCountOptimistic: this.favouritesCount,
      }
    },
    methods: {
      handleLike() {
        this.$store.dispatch(actionTypes.addToFavourites, {
          slug: this.articleSlug,
          isFavourited: this.isFavourited,
        })
        if (this.isFavouritedOptimistic) {
          this.favouritesCountOptimistic--
        } else {
          this.favouritesCountOptimistic++
        }
        this.isFavouritedOptimistic = !this.isFavouritedOptimistic
      },
    },
  }
</script>
