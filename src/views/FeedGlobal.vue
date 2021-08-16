<template>
  <div class="home-page">
    <mcv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler />
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
    name: 'McvFeedGlobal',
    components: {
      McvFeedSmart,
      McvPopularTags,
      McvBanner,
      McvFeedToggler,
    },
    data() {
      return {
        apiUrl: '/articles',
      }
    },
  }
</script>
