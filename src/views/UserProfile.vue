<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" alt="" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              <!-- TODO: FOLLLOW USER BUTTON-->
              FOLLLOW USER BUTTON
              <router-link
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary"
                :to="{name: 'settings'}"
              >
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="article-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <router-link
                    :to="{
                      name: 'userProfile',
                      params: {slug: userProfile.username},
                    }"
                    class="nav-link"
                    :class="{active: routeName === 'userProfile'}"
                  >
                    My Posts
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link
                    :to="{
                      name: 'userProfileFavourites',
                      params: {slug: userProfile.username},
                    }"
                    class="nav-link"
                    :class="{active: routeName === 'userProfileFavourites'}"
                  >
                    Favourites Posts
                  </router-link>
                </li>
              </ul>
            </div>
            <mcv-feed-smart :api-url="apiUrl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  import {actionTypes as userProfileActionTypes} from '@/store/modules/userProfile'
  import {getterTypes as authGetterTypes} from '@/store/modules/auth'

  import McvFeedSmart from '@/components/FeedSmart'

  export default {
    name: 'McvUserProfile',
    components: {
      McvFeedSmart,
    },
    computed: {
      ...mapState({
        userProfile: (state) => state.article.data,
        isLoading: (state) => state.article.isLoading,
        error: (state) => state.article.error,
      }),
      ...mapGetters({
        currentUser: authGetterTypes.currentUser,
      }),
      isCurrentUserProfile() {
        if (!this.currentUser || !this.userProfile) {
          return false
        }
        return this.currentUser.username === this.userProfile.username
      },
      apiUrl() {
        const isFavourites = this.$route.path.includes('favorites')
        return isFavourites
          ? `/articles?favorited=${this.userProfileSlug}`
          : `/articles?author=${this.userProfileSlug}`
      },
      userProfileSlug() {
        return this.$route.params.slug
      },
      routeName() {
        return this.$route.name
      },
    },
    watch: {
      userProfileSlug() {
        this.fetchUserProfile()
      },
    },
    mounted() {
      this.fetchUserProfile()
    },
    methods: {
      fetchUserProfile() {
        this.$store.dispatch(userProfileActionTypes.getUserProfile, {
          slug: this.userProfileSlug,
        })
      },
    },
  }
</script>
