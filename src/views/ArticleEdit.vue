<template>
  <div>
    <mcv-loader v-if="isLoading" />
    <mcv-article-form
      v-if="initialValues"
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import McvArticleForm from '@/components/ArticleForm'
  import McvLoader from '@/components/AppLoader'

  import {actionTypes} from '@/store/modules/editArticle'

  export default {
    name: 'McvArticleEdit',
    components: {
      McvArticleForm,
      McvLoader,
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.editArticle.isLoading,
        isSubmitting: (state) => state.editArticle.isSubmitting,
        validationErrors: (state) => state.editArticle.validationErrors,
        article: (state) => state.editArticle.article,
      }),
      initialValues() {
        if (!this.article) {
          return null
        }
        return {
          title: this.article.title,
          description: this.article.description,
          body: this.article.body,
          tagList: this.article.tagList,
        }
      },
    },
    mounted() {
      this.$store.dispatch(actionTypes.getArticle, {
        slug: this.$route.params.slug,
      })
    },
    methods: {
      onSubmit(articleInput) {
        const slug = this.$route.params.slug
        this.$store
          .dispatch(actionTypes.editArticle, {slug, articleInput})
          .then((article) => {
            this.$router.push({name: 'article', params: {slug: article.slug}})
          })
      },
    },
  }
</script>
