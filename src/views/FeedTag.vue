<template>
  <div class="home-page">
    <mcv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler :tag-name="tagName" />
          <mcv-feed-smart :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <mcv-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import McvFeedSmart from '@/components/FeedSmart.vue'
  import McvPopularTags from '@/components/PopularTags.vue'
  import McvBanner from '@/components/AppBanner.vue'
  import McvFeedToggler from '@/components/FeedToggler.vue'

  export default {
    name: 'McvFeedTag',
    components: {
      McvFeedSmart,
      McvPopularTags,
      McvBanner,
      McvFeedToggler,
    },
    computed: {
      tagName() {
        return this.$route.params.slug
      },
      apiUrl() {
        return `/articles?tag=${this.tagName}`
      },
    },
  }
</script>
