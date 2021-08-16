<template>
  <div class="sidebar">
    <p>Popular Tags</p>

    <mcv-loader v-if="isLoading">tags</mcv-loader>
    <mcv-error-message v-if="error" :message="error" />

    <div v-if="popularTags" class="tag-list">
      <router-link
        :to="{name: 'feedTag', params: {slug: popularTag}}"
        v-for="popularTag in popularTags"
        :key="popularTag"
        class="tag-default tag-pill"
      >
        {{ popularTag }}
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import McvLoader from '@/components/AppLoader'
  import McvErrorMessage from '@/components/AppErrorMessage'
  import {actionTypes} from '@/store/modules/popularTags'
  export default {
    name: 'McvPopularTags',
    components: {
      McvLoader,
      McvErrorMessage,
    },
    computed: {
      ...mapState({
        popularTags: (state) => state.popularTags.data,
        isLoading: (state) => state.popularTags.isLoading,
        error: (state) => state.popularTags.error,
      }),
    },
    mounted() {
      this.$store.dispatch(actionTypes.getPopularTags)
    },
  }
</script>
