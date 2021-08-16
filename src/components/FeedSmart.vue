<template>
  <div>
    <mcv-loader v-if="isLoading">articles</mcv-loader>
    <mcv-error-message v-if="error" :message="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" alt="" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <mcv-add-to-favourites
              :is-favourited="article.favourited"
              :article-slug="article.slug"
              :favourites-count="article.favouritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <mcv-tag-list :tags="article.tagList" />
        </router-link>
      </div>
      <mcv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {stringify, parseUrl} from 'query-string'

  import McvPagination from '@/components/AppPagination'
  import McvLoader from '@/components/AppLoader'
  import McvErrorMessage from '@/components/AppErrorMessage'
  import McvTagList from '@/components/TagList'
  import McvAddToFavourites from '@/components/AddToFavourites'

  import {actionTypes} from '@/store/modules/feed'
  import {limit} from '@/helpers/variables'

  export default {
    name: 'McvFeedSmart',
    components: {
      McvPagination,
      McvLoader,
      McvErrorMessage,
      McvTagList,
      McvAddToFavourites,
    },
    props: {
      apiUrl: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.feed.isLoading,
        feed: (state) => state.feed.data,
        error: (state) => state.feed.error,
      }),
      limit() {
        return limit
      },
      currentPage() {
        return parseInt(this.$route.query.page || '1')
      },
      baseUrl() {
        return this.$route.path
      },
      offset() {
        return this.currentPage * limit - limit
      },
    },
    watch: {
      currentPage() {
        this.fetchFeed()
      },
      apiUrl() {
        this.fetchFeed()
      },
    },
    mounted() {
      this.fetchFeed()
    },
    methods: {
      fetchFeed() {
        const parsedUrl = parseUrl(this.apiUrl)
        const stringifiedParams = stringify({
          limit,
          offset: this.offset,
          ...parsedUrl.query,
        })
        const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
        this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
      },
    },
  }
</script>
